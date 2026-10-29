
import { openDatabaseAsync } from "expo-sqlite";

let databasePromise;

export function getDatabase() {
    if (!databasePromise) {
        databasePromise = openDatabaseAsync("doctor-appointment.db");
    }

    return databasePromise;
}
