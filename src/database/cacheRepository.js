
/*
Understoood!!!
Yeh function aasan lafzon mein ek "Local Database Backup" ka kam kar raha hai.
Jab aap internet se koi data (records) mangwate hain, to yeh function us poore data
 ko aapke phone ya computer ki local storage (SQLite database) mein save kar deta hai. 
 Iska sabse bada faida yeh hota hai ki agar internet band bhi ho jaye, to aapki app offline
  chalte waqt is local database se data utha kar user ko dikha sake.
*/


// This func are save our data in local Db
export const saveCachedRecords = async (db, scope, recordType, records) => {
    // Agar records array nahi hai YA records khali (empty) hai, to yahin ruk jao
    if (!Array.isArray(records) || records.length === 0) return;


    const cachedAt = new Date().toISOString();
    //  Transaction Block (Amanat/Safety Box)
    await db.withTransactionAsync(async () => {
        for (const record of records) {
            await db.runAsync(
                `INSERT OR REPLACE INTO local_cache
          (cache_scope, record_type, record_id, data_json, cached_at)
         VALUES (?, ?, ?, ?, ?)`,
                scope,
                recordType,
                String(record.id),
                JSON.stringify(record),
                cachedAt
            );
        }
    })
}



// Lets get Our data form local db
export const getCachedRecords = async (db, scope, recordType) => {
    // Database se Data Nikalna 
    const rows = await db.getAllAsync(
        `SELECT data_json
     FROM local_cache
     WHERE cache_scope = ?
       AND record_type = ?
     ORDER BY cached_at DESC`,
        scope,
        recordType
    );
    // Return data 
    return rows.map((row) => JSON.parse(row.data_json));
}


// Clear cachedData from saveddata
export const clearCachedRecords = async (db, scope) => {
    await db.runAsync(
        "DELETE FROM local_cache WHERE cache_scope = ?",
        scope
    )
}