import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase("test.db");

db.transaction(tx => {
    tx.executeSql(
        "CREATE TABLE IF NOT EXISTS test (id INTEGER PRIMARY KEY NOT NULL, value TEXT);",
        [],
        () => console.log("Table created successfully!"),
        (_, error) => console.error("Error creating table:", error)
    );
});
