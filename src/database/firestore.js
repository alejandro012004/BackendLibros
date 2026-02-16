const admin = require('firebase-admin');
const serviceAccount = require('../../serviceAccountKey.json');

// Conexión con las credenciales de Firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Exportamos la base de datos para usarla en otros archivos
module.exports = db;