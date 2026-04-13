import initSqlJs from "sql.js";
import sqlWasmUrl from "sql.js/dist/sql-wasm-browser.wasm?url";

/** 
 * @type {import("sql.js").Database | null}
 */
let db = null;

/**
 * @param {string} url
 */
export async function loadDatabase(url) {
  const SQL = await initSqlJs({
    locateFile: (file) => (file.endsWith(".wasm") ? sqlWasmUrl : file),
  });

  const res = await fetch(url, {
    cache: import.meta.env.DEV ? "no-store" : "default",
  });
  const buffer = await res.arrayBuffer();

  db = new SQL.Database(new Uint8Array(buffer));
  return db;
}

export function getAllProjects() {
  if (!db) throw new Error("DB not loaded");

  const stmt = db.prepare(`SELECT * FROM projects ORDER BY repo`);
  const rows = []
  while (stmt.step()) rows.push(stmt.getAsObject());
  stmt.free();
  return rows;
}