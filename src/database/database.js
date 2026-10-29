export async function initializeDatabase(db) {
    await db.execAsync(`
    PRAGMA journal_mode = WAL;

    CREATE TABLE IF NOT EXISTS local_cache (
      cache_scope TEXT NOT NULL,
      record_type TEXT NOT NULL,
      record_id TEXT NOT NULL,
      data_json TEXT NOT NULL,
      cached_at TEXT NOT NULL,
      PRIMARY KEY (cache_scope, record_type, record_id)
    );

    CREATE INDEX IF NOT EXISTS idx_local_cache_type
    ON local_cache (cache_scope, record_type);
  `);
}

/*

What does this table store? (SQlite)
Column	Purpose
cache_scope	Separates records by patient account; use public for public doctor listings.
record_type	Identifies a record as a doctor or appointment.
record_id	The original record ID from Supabase.
data_json	The saved record as JSON text.
cached_at	When the record was last saved locally.

This is only the database setup. It does not yet save or display your API data.


*/