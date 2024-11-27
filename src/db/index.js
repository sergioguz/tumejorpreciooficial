import * as SQLite from 'expo-sqlite';


const db = SQLite.openDatabaseSync("tumejorprecio.db")

//console.log(db)

// Crear la tabla "sessions"
export const createSessionsTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS sessions (
      userId TEXT PRIMARY KEY NOT NULL,
      email TEXT NOT NULL,
      token TEXT NOT NULL
    );
  `;
  try {
    const result = await db.runAsync(query); // Cambiado a `runAsync` para obtener un resultado.
    //console.log('Tabla "sessions" creada o verificada exitosamente.', result);
    return result; // Devuelve el resultado para mantener consistencia.
  } catch (error) {
    console.error('Error al crear la tabla "sessions":', error);
    return null; // Devuelve null en caso de error.
  }
};

// Insertar una nueva sesión
export const insertSession = async ({ email, userId, token }) => {
  //console.log('Datos enviados a insertar la sesión:', { email, userId, token }); // Verifica los valores
  
  const query = `
    INSERT INTO sessions (email, userId, token)
    VALUES (?, ?, ?);
  `;
  try {
    const result = await db.runAsync(query, [email, userId, token]);
    //console.log('Sesión insertada exitosamente.', result.changes, 'cambios realizados');
  } catch (error) {
    console.error('Error al insertar la sesión:', error);
  }
};

// Obtener todas las sesiones
export const fetchSession = async () => {
  const query = 'SELECT * FROM sessions;';
  try {
    const result = await db.getAllAsync(query);
    //console.log('Sesiones obtenidas:', result);
    return result;
  } catch (error) {
    console.error('Error al obtener las sesiones:', error);
    return [];
  }
};

// Eliminar todas las sesiones
export const clearSessions = async () => {
  const query = 'DELETE FROM sessions;';
  try {
    const result = await db.runAsync(query);
    //console.log('Todas las sesiones eliminadas exitosamente.', result.changes, 'cambios realizados');
  } catch (error) {
    console.error('Error al eliminar las sesiones:', error);
  }
};


export const resetSessionsTable = async () => {
  try {
    await db.runAsync('DROP TABLE IF EXISTS sessions;'); // Eliminar la tabla si existe
    await createSessionsTable(); // Volver a crear la tabla con la estructura correcta
    //console.log('Tabla "sessions" eliminada y recreada con éxito.');
  } catch (error) {
    console.error('Error al reiniciar la tabla "sessions":', error);
  }
};

