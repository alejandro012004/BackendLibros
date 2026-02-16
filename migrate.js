require('dotenv').config();
const admin = require('firebase-admin');
const cloudinary = require('cloudinary').v2;

const serviceAccount = require('./serviceAccountKey.json'); 
if (!admin.apps.length) admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
const db = admin.firestore();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const portadasReales = {
    "antes de que los cuelguen": "https://covers.openlibrary.org/b/isbn/9788491810438-L.jpg",
    "la voz de las espadas": "https://covers.openlibrary.org/b/isbn/9788491810421-L.jpg",
    "el último argumento de los reyes": "https://covers.openlibrary.org/b/isbn/9788491810445-L.jpg",
    "el bosque oscuro": "https://covers.openlibrary.org/b/isbn/9788466659741-L.jpg",
    "1984": "https://covers.openlibrary.org/b/isbn/9788466331999-L.jpg",
    "american gods": "https://covers.openlibrary.org/b/isbn/9788417305543-L.jpg",
    "crónicas marcianas": "https://covers.openlibrary.org/b/isbn/9788445076620-L.jpg"
};

const corregirRestantes = async () => {
    const snapshot = await db.collection('books').get();
    console.log(`Buscando los 6 libros restantes...`);

    for (const doc of snapshot.docs) {
        const libro = doc.data();
        const tituloNormalizado = libro.title.toLowerCase().trim();

        if (portadasReales[tituloNormalizado]) {
            console.log(`Corrigiendo: ${libro.title}`);
            try {
                const res = await cloudinary.uploader.upload(portadasReales[tituloNormalizado], {
                    folder: 'biblioteca_completa',
                    overwrite: true
                });
                await db.collection('books').doc(doc.id).update({ image: res.secure_url });
                console.log(`✅ ${libro.title} OK.`);
            } catch (e) {
                console.error(`❌ Error en ${libro.title}: ${e.message}`);
            }
        } else {
            // Este log es para saber por qué no detecta los que faltan
            if (libro.image && libro.image.includes('google.com') || libro.image.includes('not_available')) {
                console.log(`⚠️ Pendiente pero no reconocido: "${tituloNormalizado}"`);
            }
        }
    }
};

corregirRestantes().then(() => {
    console.log("Fin del ajuste.");
    process.exit(0);
});