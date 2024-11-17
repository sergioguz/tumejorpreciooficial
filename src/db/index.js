import * as SQLite from 'expo-sqlite';

// Función para abrir la base de datos de forma asíncrona
const openDatabase = async () => {
  return await SQLite.openDatabaseAsync('tumejorprecio.db');
};

// Crear tabla
export const createSessionsTable = async () => {
  try {
    const db = await openDatabase();
    const query = `
      CREATE TABLE IF NOT EXISTS sessions (
        localId TEXT PRIMARY KEY NOT NULL,
        email TEXT NOT NULL,
        token TEXT NOT NULL
      );
    `;
    const statement = await db.prepareAsync(query);
    await statement.runAsync();
    await statement.finalizeAsync();
    return true;
  } catch (error) {
    console.error('Error al crear la tabla:', error);
    throw error;
  }
};

// Insertar sesión
export const insertSession = async ({ email, localId, token }) => {
  try {
    const db = await openDatabase();
    const query = `
      INSERT INTO sessions (email, localId, token)
      VALUES (?, ?, ?);
    `;
    const statement = await db.prepareAsync(query);
    await statement.runAsync([email, localId, token]);
    await statement.finalizeAsync();
    return true;
  } catch (error) {
    console.error('Error al insertar la sesión:', error);
    throw error;
  }
};

// Obtener sesiones
export const fetchSession = async () => {
  try {
    const db = await openDatabase();
    const query = `
      SELECT * FROM sessions;
    `;
    const statement = await db.prepareAsync(query);
    const resultSet = await statement.allAsync();
    await statement.finalizeAsync();
    return resultSet;
  } catch (error) {
    console.error('Error al obtener las sesiones:', error);
    throw error;
  }
};

// Limpiar sesiones (eliminar todos los datos)
export const clearSessions = async () => {
  try {
    const db = await openDatabase();
    const query = `
      DELETE FROM sessions;
    `;
    const statement = await db.prepareAsync(query);
    await statement.runAsync();
    await statement.finalizeAsync();
    return true;
  } catch (error) {
    console.error('Error al limpiar las sesiones:', error);
    throw error;
  }
};









// //import * as SQLite from 'expo-sqlite/legacy';

// import * as SQLite from 'expo-sqlite';


// //const db = SQLite.openDatabase("tumejorprecio.db")

// const db = SQLite.openDatabaseSync("tumejorprecio.db")

// // export const createSessionsTable = () => {
// //     const promise = new Promise((resolved,rejected)=>{
// //         const query = 'CREATE TABLE IF NOT EXISTS sessions (localId TEXT PRIMARY KEY NOT NULL, email TEXT NOT NULL, token TEXT NOT NULL  ) '
// //         console.log("Database object:", db);
// //         db.transaction(tx=>tx.executeSql(query,[],(_,result)=>resolved(result),(_,result)=>rejected(result)))
// //     })

// //     return promise
// // }

// export const createSessionsTable = () => {
//     const promise = new Promise((resolve, reject) => {
//         const query = `
//             CREATE TABLE IF NOT EXISTS sessions (
//                 localId TEXT PRIMARY KEY NOT NULL,
//                 email TEXT NOT NULL,
//                 token TEXT NOT NULL
//             );
//         `;

//         db.nativeDatabase.executeSql(
//             query,
//             [],
//             (_, result) => resolve(result),
//             (_, error) => reject(error)
//         );
//     });
//     return promise;
// };


// export const insertSession = ({email, localId, token}) => {
//     const promise = new Promise((resolved,rejected)=>{
//         const query = 'INSERT INTO sessions (email, localId, token) VALUES (?,?,?)'
//         db.transaction(tx=>tx.executeSql(query,[email,localId, token],(_,result)=>resolved(result),(_,result)=>rejected(result)))
//     })
//     return promise
// }

// export const fetchSession = () => {
//     const promise = new Promise((resolved,rejected)=>{
//         const query = 'SELECT * FROM sessions'
//         db.transaction(tx=>tx.executeSql(query,[],(_,result)=>resolved(result.rows._array),(_,result)=>rejected(result)))
//     })
//     return promise
// }

// //FUNCION PELIGROSA:
// export const clearSessions= () => {
//     const promise = new Promise((resolved,rejected)=>{
//         const query = "DELETE FROM sessions" 
//         db.transaction(tx=>{tx.executeSql(query,[],(_, result)=>resolved(result),(_,error)=>rejected(error))})
//     })
//     return promise
// }