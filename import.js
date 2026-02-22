const admin = require('firebase-admin');
const serviceAccount = require("./serviceAccountKey.json");


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const libros = [
  {
    "googleId": "7nU_DwAAQBAJ",
    "title": "El nombre del viento",
    "authors": [
      "Patrick Rothfuss"
    ],
    "publishedDate": "2009-05-20",
    "shortDescription": "La fascinante historia de Kvothe: músico, mendigo y héroe legendario.",
    "description": "Kvothe, un personaje legendario que ha desaparecido de la vida pública, cuenta su verdadera historia a un cronista. Desde su infancia en una tropa de artistas itinerantes hasta su paso por la Universidad de magia, descubrimos la verdad tras el mito en un mundo rico en detalles y música.",
    "isbn": "9788401337208",
    "genre": "Fantasía",
    "tags": [
      "Magia",
      "Música",
      "Universidad",
      "Épica"
    ],
    "pageCount": 880,
    "language": "es",
    "image": "http://books.google.com/books/content?id=7nU_DwAAQBAJ&printsec=frontcover&img=1&zoom=1",
    "appRating": 4.8,
    "appReviewsCount": 45,
    "featured": true
  },
  {
    "googleId": "3V98DwAAQBAJ",
    "title": "El camino de los reyes",
    "authors": [
      "Brandon Sanderson"
    ],
    "publishedDate": "2015-08-27",
    "shortDescription": "Cuatro héroes enfrentan el destino de un mundo azotado por tormentas eternas.",
    "description": "En el mundo de Roshar, la guerra es constante y las tormentas moldean la civilización. Un esclavo que busca redención, un caballero que duda de su cordura y una joven erudita cruzan sus destinos en el inicio de la saga más ambiciosa de la fantasía moderna.",
    "isbn": "9788466657549",
    "genre": "Fantasía Épica",
    "tags": [
      "Armaduras",
      "Guerra",
      "Tormentas",
      "Saga"
    ],
    "pageCount": 1200,
    "language": "es",
    "image": "http://books.google.com/books/content?id=3V98DwAAQBAJ&printsec=frontcover&img=1&zoom=1",
    "appRating": 4.9,
    "appReviewsCount": 82,
    "featured": true
  },
  {
    "googleId": "L_08DwAAQBAJ",
    "title": "Reina Roja",
    "authors": [
      "Juan Gómez-Jurado"
    ],
    "publishedDate": "2018-11-08",
    "shortDescription": "Antonia Scott: la mujer más inteligente y peligrosa del mundo.",
    "description": "Antonia Scott no es policía ni criminalista, pero ha resuelto docenas de crímenes. Vive encerrada en su piso de Madrid hasta que un inspector de policía viene a buscarla para resolver un asesinato que amenaza a las élites europeas.",
    "isbn": "9788466664417",
    "genre": "Thriller",
    "tags": [
      "Crimen",
      "Madrid",
      "Inteligencia",
      "Misterio"
    ],
    "pageCount": 568,
    "language": "es",
    "image": "http://books.google.com/books/content?id=L_08DwAAQBAJ&printsec=frontcover&img=1&zoom=1",
    "appRating": 4.3,
    "appReviewsCount": 120,
    "featured": false
  },
  {
    "googleId": "5NOMDwAAQBAJ",
    "title": "El problema de los tres cuerpos",
    "authors": [
      "Cixin Liu"
    ],
    "publishedDate": "2016-09-01",
    "shortDescription": "Una señal al espacio exterior pone en jaque el futuro de la humanidad.",
    "description": "Durante la Revolución Cultural China, un proyecto militar secreto envía señales al espacio. Décadas después, una civilización alienígena al borde del colapso planea invadir la Tierra, dividiendo a la humanidad entre quienes quieren recibirlos y quienes quieren luchar.",
    "isbn": "9788466659734",
    "genre": "Ciencia Ficción",
    "tags": [
      "Alienígenas",
      "Física",
      "China",
      "Primer Contacto"
    ],
    "pageCount": 416,
    "language": "es",
    "image": "http://books.google.com/books/content?id=5NOMDwAAQBAJ&printsec=frontcover&img=1&zoom=1",
    "appRating": 4.5,
    "appReviewsCount": 56,
    "featured": true
  },
  {
    "googleId": "yH92DwAAQBAJ",
    "title": "Mistborn: El imperio final",
    "authors": [
      "Brandon Sanderson"
    ],
    "publishedDate": "2016-11-17",
    "shortDescription": "¿Qué pasa si el héroe de la profecía fracasa y el villano gana?",
    "description": "Durante mil años han caído las cenizas y nada florece. Durante mil años los skaa han sido esclavos. En un mundo dominado por un Dios inmortal, una joven huérfana descubre que tiene el poder de quemar metales para realizar proezas increíbles.",
    "isbn": "9788466658898",
    "genre": "Fantasía",
    "tags": [
      "Alquimia",
      "Rebelión",
      "Metales",
      "Mundo Distópico"
    ],
    "pageCount": 688,
    "language": "es",
    "image": "http://books.google.com/books/content?id=yH92DwAAQBAJ&printsec=frontcover&img=1&zoom=1",
    "appRating": 4.7,
    "appReviewsCount": 64,
    "featured": false
  },
  {
    "googleId": "8DQ6EAAAQBAJ",
    "title": "Circe",
    "authors": [
      "Madeline Miller"
    ],
    "publishedDate": "2019-02-21",
    "shortDescription": "La historia jamás contada de la hechicera más famosa de la mitología.",
    "description": "Desterrada a la isla de Eea por el dios Zeus, Circe perfecciona su arte de la brujería mientras se cruza con figuras míticas como el Minotauro, Dédalo y el astuto Odiseo. Una épica sobre el poder femenino y la libertad.",
    "isbn": "9788491814146",
    "genre": "Mitología",
    "tags": [
      "Grecia",
      "Brujería",
      "Dioses",
      "Empoderamiento"
    ],
    "pageCount": 448,
    "language": "es",
    "image": "http://books.google.com/books/content?id=8DQ6EAAAQBAJ&printsec=frontcover&img=1&zoom=1",
    "appRating": 4.6,
    "appReviewsCount": 38,
    "featured": false
  },
  {
    "googleId": "31-vDwAAQBAJ",
    "title": "Sapiens",
    "authors": [
      "Yuval Noah Harari"
    ],
    "publishedDate": "2014-09-04",
    "shortDescription": "De animales a dioses: una breve historia de la humanidad.",
    "description": "Harari explora cómo nuestra especie logró dominar el planeta. Desde la revolución cognitiva hasta la científica, el libro analiza cómo los mitos, el dinero y la jerarquía han moldeado nuestra sociedad actual y nuestro futuro tecnológico.",
    "isbn": "9788499926223",
    "genre": "No Ficción",
    "tags": [
      "Historia",
      "Evolución",
      "Cultura",
      "Ensayo"
    ],
    "pageCount": 496,
    "language": "es",
    "image": "http://books.google.com/books/content?id=31-vDwAAQBAJ&printsec=frontcover&img=1&zoom=1",
    "appRating": 4.8,
    "appReviewsCount": 210,
    "featured": true
  },
  {
    "googleId": "XfS8DwAAQBAJ",
    "title": "Cien años de soledad",
    "authors": [
      "Gabriel García Márquez"
    ],
    "publishedDate": "2017-06-15",
    "shortDescription": "La gloria y la tragedia de la familia Buendía en el mítico pueblo de Macondo.",
    "description": "Una obra maestra de la literatura universal que narra la historia de siete generaciones de la familia Buendía. Entre guerras civiles, milagros y amores prohibidos, Macondo se convierte en el reflejo de la soledad y el destino de todo un continente.",
    "isbn": "9788439733355",
    "genre": "Realismo Mágico",
    "tags": [
      "Clásico",
      "Macondo",
      "Generaciones",
      "Literatura Latina"
    ],
    "pageCount": 496,
    "language": "es",
    "image": "http://books.google.com/books/content?id=XfS8DwAAQBAJ&printsec=frontcover&img=1&zoom=1",
    "appRating": 4.9,
    "appReviewsCount": 95,
    "featured": true
  },
  {
    "googleId": "P3NIDwAAQBAJ",
    "title": "Juego de tronos",
    "authors": [
      "George R. R. Martin"
    ],
    "publishedDate": "2012-07-13",
    "shortDescription": "En el juego de tronos, o ganas o mueres.",
    "description": "Tras la muerte de la Mano del Rey, Ned Stark es llamado a la capital para servir a su amigo Robert Baratheon. Mientras tanto, fuerzas oscuras se agitan tras el Muro y una reina en el exilio planea reclamar lo que es suyo.",
    "isbn": "9788496208964",
    "genre": "Fantasía",
    "tags": [
      "Intriga",
      "Dragones",
      "Nobleza",
      "Violencia"
    ],
    "pageCount": 800,
    "language": "es",
    "image": "http://books.google.com/books/content?id=P3NIDwAAQBAJ&printsec=frontcover&img=1&zoom=1",
    "appRating": 4.9,
    "appReviewsCount": 77,
    "featured": true
  },
  {
    "googleId": "6_ZpDwAAQBAJ",
    "title": "Antes de que los cuelguen",
    "authors": [
      "Joe Abercrombie"
    ],
    "publishedDate": "2018-02-15",
    "shortDescription": "Segunda entrega de La Primera Ley: donde la moral es un lujo.",
    "description": "El inquisidor Glokta debe defender una ciudad de un asedio imposible con traidores en cada esquina. Mientras tanto, un grupo de héroes renegados emprende un viaje al fin del mundo para recuperar un arma legendaria que podría salvarlos a todos.",
    "isbn": "9788491810438",
    "genre": "Fantasía",
    "tags": [
      "Grimdark",
      "Antihéroes",
      "Humor Negro",
      "Batallas"
    ],
    "pageCount": 608,
    "language": "es",
    "image": "http://books.google.com/books/content?id=6_ZpDwAAQBAJ&printsec=frontcover&img=1&zoom=1",
    "appRating": 4.5,
    "appReviewsCount": 24,
    "featured": false
  },
  {
    "googleId": "9U0hEAAAQBAJ",
    "title": "American Gods",
    "authors": [
      "Neil Gaiman"
    ],
    "publishedDate": "2021-05-13",
    "shortDescription": "Una guerra se gesta entre los dioses antiguos y las nuevas deidades modernas.",
    "description": "Sombra acaba de salir de la cárcel y acepta trabajar para un misterioso hombre llamado Miércoles. Juntos recorren EE.UU. reclutando viejos dioses de la mitología para una batalla final contra los nuevos dioses de la tecnología y los medios.",
    "isbn": "9788417305543",
    "genre": "Fantasía Urbana",
    "tags": [
      "Mitología Moderna",
      "Road Trip",
      "Viaje",
      "Misterio"
    ],
    "pageCount": 560,
    "language": "es",
    "image": "http://books.google.com/books/content?id=9U0hEAAAQBAJ&printsec=frontcover&img=1&zoom=1",
    "appRating": 4.4,
    "appReviewsCount": 31,
    "featured": false
  },
  {
    "googleId": "FaKZEAAAQBAJ",
    "title": "The Witcher: The Lesser Evil",
    "authors": [
      "Andrzej Sapkowski"
    ],
    "publishedDate": "2023-12-05",
    "shortDescription": "Geralt de Rivia se enfrenta a un dilema moral: elegir el mal menor.",
    "description": "En la ciudad de Blaviken, Geralt se ve atrapado entre un mago vengativo y una princesa fugitiva con un destino oscuro. Un relato que explora la ambigüedad moral y que le dio a Geralt el apodo del 'Carnicero de Blaviken'.",
    "isbn": "9781506727226",
    "genre": "Cómic",
    "tags": [
      "Monstruos",
      "Geralt",
      "Espadas",
      "Dilema"
    ],
    "pageCount": 60,
    "language": "en",
    "image": "http://books.google.com/books/content?id=FaKZEAAAQBAJ&printsec=frontcover&img=1&zoom=1",
    "appRating": 4.2,
    "appReviewsCount": 15,
    "featured": false
  },
  {
    "googleId": "Df6WDgAAQBAJ",
    "title": "Fantasy Firsts",
    "authors": [
      "Brandon Sanderson"
    ],
    "publishedDate": "2017-06-13",
    "shortDescription": "Los inicios de los mundos más épicos de Sanderson en un solo volumen.",
    "description": "Una colección imprescindible para cualquier fan de la fantasía que incluye los primeros capítulos de Mistborn, El Archivo de las Tormentas y otras obras del Cosmere, permitiendo una visión general de su increíble universo expandido.",
    "isbn": "9780765399557",
    "genre": "Fantasía",
    "tags": [
      "Cosmere",
      "Antología",
      "Mundos",
      "Épica"
    ],
    "pageCount": 2738,
    "language": "en",
    "image": "http://books.google.com/books/content?id=Df6WDgAAQBAJ&printsec=frontcover&img=1&zoom=1",
    "appRating": 4.5,
    "appReviewsCount": 9,
    "featured": false
  },
  {
    "googleId": "iO5_AwAAQBAJ",
    "title": "El temor de un hombre sabio",
    "authors": [
      "Patrick Rothfuss"
    ],
    "publishedDate": "2011-11-03",
    "shortDescription": "Kvothe viaja al extranjero y se enfrenta a los secretos de los guerreros Adem.",
    "description": "En esta continuación de El Nombre del Viento, Kvothe deja la Universidad por un tiempo para servir a un noble poderoso, aprender artes marciales con los mercenarios Adem y sobrevivir a un encuentro con la peligrosa Felurian en el reino de los Fae.",
    "isbn": "9788401339639",
    "genre": "Fantasía",
    "tags": [
      "Viaje",
      "Aprendizaje",
      "Aventura",
      "Misterio"
    ],
    "pageCount": 1192,
    "language": "es",
    "image": "http://books.google.com/books/content?id=iO5_AwAAQBAJ&printsec=frontcover&img=1&zoom=1",
    "appRating": 4.8,
    "appReviewsCount": 54,
    "featured": false
  },
  {
    "googleId": "K_ZpDwAAQBAJ",
    "title": "La voz de las espadas",
    "authors": [
      "Joe Abercrombie"
    ],
    "publishedDate": "2018-02-15",
    "shortDescription": "Donde los bárbaros y los torturadores son los protagonistas.",
    "description": "La Unión está en guerra. Logen Nuevededos es un bárbaro con mala suerte. Glokta es un torturador lisiado. Jezal es un noble egoísta. Sus vidas están a punto de cruzarse de la forma más violenta posible bajo la sombra de un mago misterioso.",
    "isbn": "9788491810421",
    "genre": "Fantasía",
    "tags": [
      "Acción",
      "Violencia",
      "Política",
      "Personajes Gris"
    ],
    "pageCount": 528,
    "language": "es",
    "image": "http://books.google.com/books/content?id=K_ZpDwAAQBAJ&printsec=frontcover&img=1&zoom=1",
    "appRating": 4.2,
    "appReviewsCount": 19,
    "featured": false
  },
  {
    "googleId": "hR08DwAAQBAJ",
    "title": "Loba Negra",
    "authors": [
      "Juan Gómez-Jurado"
    ],
    "publishedDate": "2019-10-24",
    "shortDescription": "Antonia Scott se enfrenta a un enemigo que no le tiene miedo a nada.",
    "description": "Antonia Scott ha vuelto. En la Costa del Sol, una mujer rusa ha desaparecido. No es cualquier mujer, es la Loba Negra, y Antonia deberá descubrir sus secretos antes de que Madrid y Málaga se llenen de cadáveres.",
    "isbn": "9788466666497",
    "genre": "Thriller",
    "tags": [
      "Mafia",
      "Suspenso",
      "Investigación",
      "España"
    ],
    "pageCount": 552,
    "language": "es",
    "image": "http://books.google.com/books/content?id=hR08DwAAQBAJ&printsec=frontcover&img=1&zoom=1",
    "appRating": 4.4,
    "appReviewsCount": 42,
    "featured": false
  },
  {
    "googleId": "m_ZpDwAAQBAJ",
    "title": "El último argumento de los reyes",
    "authors": [
      "Joe Abercrombie"
    ],
    "publishedDate": "2018-02-15",
    "shortDescription": "El final sangriento y magistral de la trilogía La Primera Ley.",
    "description": "La guerra total ha llegado. El Rey de los Hombres del Norte cruza la frontera, y la Unión se tambalea. Mientras los secretos del pasado salen a la luz, nuestros protagonistas descubrirán que nadie es realmente un héroe.",
    "isbn": "9788491810445",
    "genre": "Fantasía",
    "tags": [
      "Final de Saga",
      "Guerra Épica",
      "Realismo",
      "Traición"
    ],
    "pageCount": 704,
    "language": "es",
    "image": "http://books.google.com/books/content?id=m_ZpDwAAQBAJ&printsec=frontcover&img=1&zoom=1",
    "appRating": 4.7,
    "appReviewsCount": 29,
    "featured": false
  },
  {
    "googleId": "1NOMDwAAQBAJ",
    "title": "El bosque oscuro",
    "authors": [
      "Cixin Liu"
    ],
    "publishedDate": "2017-06-01",
    "shortDescription": "La Tierra tiene 400 años para prepararse para la invasión definitiva.",
    "description": "En esta secuela, la humanidad se enfrenta a una flota alienígena que llegará en cuatro siglos. Con espías sofisticados vigilando cada avance tecnológico, la única defensa son los 'Vallis', individuos con planes secretos ocultos en sus propias mentes.",
    "isbn": "9788466659741",
    "genre": "Ciencia Ficción",
    "tags": [
      "Estrategia",
      "Espacio",
      "Mente",
      "Supervivencia"
    ],
    "pageCount": 576,
    "language": "es",
    "image": "http://books.google.com/books/content?id=1NOMDwAAQBAJ&printsec=frontcover&img=1&zoom=1",
    "appRating": 4.6,
    "appReviewsCount": 33,
    "featured": false
  },
  {
    "googleId": "Q_ZpDwAAQBAJ",
    "title": "1984",
    "authors": [
      "George Orwell"
    ],
    "publishedDate": "2013-01-01",
    "shortDescription": "Vigilancia, control mental y la lucha por la verdad en un mundo totalitario.",
    "description": "Winston Smith vive en una sociedad donde el Gran Hermano lo vigila todo y el pensamiento libre es un crimen. Una distopía escalofriante sobre el poder, la manipulación del lenguaje y la resistencia individual.",
    "isbn": "9788466331999",
    "genre": "Distopía",
    "tags": [
      "Vigilancia",
      "Política",
      "Libertad",
      "Clásico"
    ],
    "pageCount": 352,
    "language": "es",
    "image": "http://books.google.com/books/content?id=Q_ZpDwAAQBAJ&printsec=frontcover&img=1&zoom=1",
    "appRating": 4.9,
    "appReviewsCount": 156,
    "featured": true
  },
  {
    "googleId": "S_ZpDwAAQBAJ",
    "title": "Crónicas Marcianas",
    "authors": [
      "Ray Bradbury"
    ],
    "publishedDate": "2012-05-01",
    "shortDescription": "La colonización de Marte vista a través de relatos poéticos y melancólicos.",
    "description": "A través de una serie de relatos entrelazados, Bradbury narra la llegada del hombre a Marte, el fin de la civilización marciana y el reflejo de los miedos y esperanzas de la humanidad en el planeta rojo.",
    "isbn": "9788445076620",
    "genre": "Ciencia Ficción",
    "tags": [
      "Marte",
      "Poético",
      "Relatos",
      "Antología"
    ],
    "pageCount": 288,
    "language": "es",
    "image": "http://books.google.com/books/content?id=S_ZpDwAAQBAJ&printsec=frontcover&img=1&zoom=1",
    "appRating": 4.5,
    "appReviewsCount": 48,
    "featured": false
  },
  {
    "googleId": "L9XCDwAAQBAJ",
    "title": "Legión",
    "authors": [
      "Brandon Sanderson"
    ],
    "publishedDate": "2014-06-05",
    "shortDescription": "Stephen Leeds es un genio, pero sus múltiples personalidades son las que hacen el trabajo.",
    "description": "Stephen Leeds posee una mente capaz de aprender cualquier habilidad en horas, pero para gestionar ese conocimiento, su mente crea 'aspectos': personas imaginarias que solo él ve y que son expertas en áreas específicas. Un thriller psicológico y tecnológico único.",
    "isbn": "9788466655514",
    "genre": "Ciencia Ficción",
    "tags": [
      "Misterio",
      "Psicología",
      "Genio",
      "Cosmere"
    ],
    "pageCount": 352,
    "language": "es",
    "image": "placeholder_cloudinary_url",
    "appRating": 4.4,
    "appReviewsCount": 28,
    "featured": false
  },
  {
    "googleId": "V_y0DwAAQBAJ",
    "title": "Neuromante",
    "authors": [
      "William Gibson"
    ],
    "publishedDate": "1984-07-01",
    "shortDescription": "La novela definitiva que definió el género Cyberpunk.",
    "description": "Case era el mejor vaquero del ciberespacio hasta que dañaron su sistema nervioso. Ahora, un misterioso empleador le ofrece una cura a cambio de participar en un hackeo suicida contra una inteligencia artificial ultrapoderosa.",
    "isbn": "9788445074039",
    "genre": "Ciencia Ficción",
    "tags": [
      "Cyberpunk",
      "Hacking",
      "IA",
      "Futuro"
    ],
    "pageCount": 320,
    "language": "es",
    "image": "placeholder_cloudinary_url",
    "appRating": 4.5,
    "appReviewsCount": 67,
    "featured": true
  },
  {
    "googleId": "7JmIDwAAQBAJ",
    "title": "La música del silencio",
    "authors": [
      "Patrick Rothfuss"
    ],
    "publishedDate": "2014-10-28",
    "shortDescription": "Un vistazo lírico a la vida de Auri en la Subrealidad.",
    "description": "Mientras Kvothe estudia en la Universidad, Auri vive en los túneles olvidados bajo sus pies. Este relato nos permite conocer el mundo a través de los ojos de uno de los personajes más enigmáticos de la Crónica del Asesino de Reyes.",
    "isbn": "9788401343575",
    "genre": "Fantasía",
    "tags": [
      "Lírico",
      "Auri",
      "Misterio",
      "Spin-off"
    ],
    "pageCount": 160,
    "language": "es",
    "image": "placeholder_cloudinary_url",
    "appRating": 4.1,
    "appReviewsCount": 33,
    "featured": false
  },
  {
    "googleId": "5V7_AwAAQBAJ",
    "title": "Palabras radiantes",
    "authors": [
      "Brandon Sanderson"
    ],
    "publishedDate": "2015-11-19",
    "shortDescription": "La esperada continuación de El camino de los reyes.",
    "description": "Kaladin debe proteger al rey mientras domina sus nuevos poderes de Corredor del Viento. Shallan busca la ciudad perdida de Urithiru para salvar Roshar, mientras los Caballeros Radiantes comienzan a resurgir para enfrentar la Desolación.",
    "isbn": "9788466657556",
    "genre": "Fantasía Épica",
    "tags": [
      "Magia",
      "Guerra",
      "Épica",
      "Saga"
    ],
    "pageCount": 1248,
    "language": "es",
    "image": "placeholder_cloudinary_url",
    "appRating": 4.9,
    "appReviewsCount": 91,
    "featured": true
  },
  {
    "googleId": "uK7pDwAAQBAJ",
    "title": "Las caras del ser",
    "authors": [
      "Varios Autores"
    ],
    "publishedDate": "2020-01-10",
    "shortDescription": "Un viaje a través de la filosofía y la introspección humana.",
    "description": "Una recopilación de ensayos que analizan cómo percibimos nuestra identidad en la era digital y cómo las diferentes 'máscaras' sociales afectan nuestra salud mental y nuestras relaciones.",
    "isbn": "9788494953606",
    "genre": "Filosofía",
    "tags": [
      "Ensayo",
      "Psicología",
      "Sociedad",
      "Mente"
    ],
    "pageCount": 240,
    "language": "es",
    "image": "placeholder_cloudinary_url",
    "appRating": 4.0,
    "appReviewsCount": 12,
    "featured": false
  },
  {
    "googleId": "9-16DwAAQBAJ",
    "title": "Fuego y Sangre",
    "authors": [
      "George R. R. Martin"
    ],
    "publishedDate": "2018-11-20",
    "shortDescription": "La historia de los Targaryen, 300 años antes de Juego de Tronos.",
    "description": "Desde Aegon el Conquistador hasta la Danza de los Dragones. Una crónica detallada escrita por un archimaestre sobre la dinastía que gobernó Poniente mediante el fuego de sus dragones.",
    "isbn": "9788401022166",
    "genre": "Fantasía",
    "tags": [
      "Dragones",
      "Historia",
      "Targaryen",
      "Poniente"
    ],
    "pageCount": 880,
    "language": "es",
    "image": "placeholder_cloudinary_url",
    "appRating": 4.6,
    "appReviewsCount": 55,
    "featured": false
  },
  {
    "googleId": "q8fCDwAAQBAJ",
    "title": "El resplandor",
    "authors": [
      "Stephen King"
    ],
    "publishedDate": "1977-01-28",
    "shortDescription": "Un hotel aislado, una familia y un descenso a la locura.",
    "description": "Jack Torrance acepta el puesto de cuidador de invierno en el hotel Overlook. Pero cuando la nieve los aísla, las fuerzas siniestras del lugar comienzan a acechar a su hijo Danny, quien posee un don especial llamado 'el resplandor'.",
    "isbn": "9788497593748",
    "genre": "Terror",
    "tags": [
      "Locura",
      "Sobrenatural",
      "Clásico",
      "King"
    ],
    "pageCount": 688,
    "language": "es",
    "image": "placeholder_cloudinary_url",
    "appRating": 4.8,
    "appReviewsCount": 140,
    "featured": true
  },
  {
    "googleId": "yXk_DwAAQBAJ",
    "title": "Rey Blanco",
    "authors": [
      "Juan Gómez-Jurado"
    ],
    "publishedDate": "2020-11-05",
    "shortDescription": "El impactante final de la trilogía de Antonia Scott.",
    "description": "Antonia Scott ha recibido un mensaje que no puede ignorar. Si no juega al juego del Rey Blanco, perderá lo que más quiere. La conclusión épica del fenómeno literario que empezó con Reina Roja.",
    "isbn": "9788466668545",
    "genre": "Thriller",
    "tags": [
      "Final",
      "Intriga",
      "Antonia Scott",
      "Madrid"
    ],
    "pageCount": 528,
    "language": "es",
    "image": "placeholder_cloudinary_url",
    "appRating": 4.7,
    "appReviewsCount": 89,
    "featured": true
  },
  {
    "googleId": "4X3yDwAAQBAJ",
    "title": "Dune",
    "authors": [
      "Frank Herbert"
    ],
    "publishedDate": "1965-08-01",
    "shortDescription": "Quien controla la especia, controla el universo.",
    "description": "En el desértico planeta Arrakis, el joven Paul Atreides se ve envuelto en una lucha por el poder, la religión y el control del recurso más valioso del universo: la especia melange.",
    "isbn": "9788497596824",
    "genre": "Ciencia Ficción",
    "tags": [
      "Desierto",
      "Imperio",
      "Mesías",
      "Ecosistema"
    ],
    "pageCount": 704,
    "language": "es",
    "image": "placeholder_cloudinary_url",
    "appRating": 4.9,
    "appReviewsCount": 230,
    "featured": true
  },
  {
    "googleId": "8-K0DwAAQBAJ",
    "title": "El silmarillion",
    "authors": [
      "J.R.R. Tolkien"
    ],
    "publishedDate": "1977-09-15",
    "shortDescription": "La creación de la Tierra Media y las leyendas de los Días Antiguos.",
    "description": "Un relato de la Primera Edad del Mundo, cuando Morgoth habitaba en la Tierra Media y los Elfos le hicieron la guerra para recuperar los Silmarils, las tres joyas que contenían la luz pura de Valinor.",
    "isbn": "9788445071397",
    "genre": "Fantasía",
    "tags": [
      "Mitología",
      "Tolkien",
      "Elfos",
      "Creación"
    ],
    "pageCount": 448,
    "language": "es",
    "image": "placeholder_cloudinary_url",
    "appRating": 4.5,
    "appReviewsCount": 110,
    "featured": false
  },
  {
    "googleId": "v8KBDwAAQBAJ",
    "title": "Drácula",
    "authors": [
      "Bram Stoker"
    ],
    "publishedDate": "1897-05-26",
    "shortDescription": "El conde transilvano que definió el mito del vampiro.",
    "description": "Jonathan Harker viaja a los Cárpatos para ayudar al Conde Drácula con unos bienes raíces en Londres, sin sospechar que está desatando un mal antiguo que se alimentará de la sangre de los vivos.",
    "isbn": "9788491052142",
    "genre": "Terror",
    "tags": [
      "Vampiros",
      "Gótico",
      "Clásico",
      "Londres"
    ],
    "pageCount": 464,
    "language": "es",
    "image": "placeholder_cloudinary_url",
    "appRating": 4.7,
    "appReviewsCount": 85,
    "featured": false
  },
  {
    "googleId": "3Y_yDwAAQBAJ",
    "title": "El psicoanalista",
    "authors": [
      "John Katzenbach"
    ],
    "publishedDate": "2002-02-01",
    "shortDescription": "Feliz cumpleaños, doctor. Bienvenido al primer día de su muerte.",
    "description": "El doctor Starks recibe un mensaje anónimo de alguien que se hace llamar Rumplestiltskin. Tiene quince días para descubrir quién es el autor de la carta o deberá suicidarse para salvar a su familia.",
    "isbn": "9788466610056",
    "genre": "Thriller",
    "tags": [
      "Psicología",
      "Venganza",
      "Misterio",
      "Best-seller"
    ],
    "pageCount": 528,
    "language": "es",
    "image": "placeholder_cloudinary_url",
    "appRating": 4.6,
    "appReviewsCount": 74,
    "featured": false
  },
  {
    "googleId": "9Zk0DwAAQBAJ",
    "title": "Fundación",
    "authors": [
      "Isaac Asimov"
    ],
    "publishedDate": "1951-06-01",
    "shortDescription": "La psicohistoria: la ciencia para salvar la civilización galáctica.",
    "description": "Hari Seldon predice la caída del Imperio Galáctico y crea la Fundación, un refugio de conocimiento destinado a reducir milenios de barbarie a solo mil años.",
    "isbn": "9788497599245",
    "genre": "Ciencia Ficción",
    "tags": [
      "Imperio",
      "Matemáticas",
      "Galaxia",
      "Saga"
    ],
    "pageCount": 256,
    "language": "es",
    "image": "placeholder_cloudinary_url",
    "appRating": 4.8,
    "appReviewsCount": 92,
    "featured": true
  },
  {
    "googleId": "hXk_DwAAQBAJ",
    "title": "Un mundo feliz",
    "authors": [
      "Aldous Huxley"
    ],
    "publishedDate": "1932-01-01",
    "shortDescription": "Una distopía donde la felicidad es obligatoria y el dolor ha sido erradicado.",
    "description": "En una sociedad futura, los seres humanos son producidos en serie y condicionados genéticamente. El soma es la droga que mantiene a todos contentos, pero Bernard Marx siente que algo falta en este paraíso artificial.",
    "isbn": "9788497594257",
    "genre": "Distopía",
    "tags": [
      "Control",
      "Futuro",
      "Clásico",
      "Genética"
    ],
    "pageCount": 256,
    "language": "es",
    "image": "placeholder_cloudinary_url",
    "appRating": 4.6,
    "appReviewsCount": 115,
    "featured": false
  },
  {
    "googleId": "iXk_DwAAQBAJ",
    "title": "El alquimista",
    "authors": [
      "Paulo Coelho"
    ],
    "publishedDate": "1988-01-01",
    "shortDescription": "Sigue tu leyenda personal hasta las pirámides de Egipto.",
    "description": "Santiago es un joven pastor andaluz que viaja desde su tierra natal hacia el desierto egipcio en busca de un tesoro oculto. Una fábula sobre los sueños y el lenguaje del mundo.",
    "isbn": "9788408045076",
    "genre": "Ficción Espiritual",
    "tags": [
      "Sueños",
      "Viaje",
      "Autoayuda",
      "Fábula"
    ],
    "pageCount": 192,
    "language": "es",
    "image": "placeholder_cloudinary_url",
    "appRating": 4.3,
    "appReviewsCount": 300,
    "featured": false
  },
  {
    "googleId": "kXk_DwAAQBAJ",
    "title": "Los pilares de la Tierra",
    "authors": [
      "Ken Follett"
    ],
    "publishedDate": "1989-09-01",
    "shortDescription": "La construcción de una catedral gótica en la Inglaterra medieval.",
    "description": "Una saga épica que narra la vida de constructores, monjes y nobles cuyas vidas se entrelazan durante décadas mientras se levanta una catedral que desafía al tiempo y a la corrupción.",
    "isbn": "9788401328510",
    "genre": "Novela Histórica",
    "tags": [
      "Edad Media",
      "Arquitectura",
      "Saga",
      "Intriga"
    ],
    "pageCount": 1040,
    "language": "es",
    "image": "placeholder_cloudinary_url",
    "appRating": 4.9,
    "appReviewsCount": 180,
    "featured": true
  },
  {
    "googleId": "mXk_DwAAQBAJ",
    "title": "El retrato de Dorian Gray",
    "authors": [
      "Oscar Wilde"
    ],
    "publishedDate": "1890-06-20",
    "shortDescription": "La eterna juventud tiene un precio oscuro en un lienzo.",
    "description": "Dorian Gray desea que su retrato envejezca por él. Mientras él se sumerge en una vida de vicio y placer sin que su rostro cambie, el cuadro muestra la verdadera fealdad de su alma.",
    "isbn": "9788466332156",
    "genre": "Clásico",
    "tags": [
      "Belleza",
      "Moralidad",
      "Londres",
      "Arte"
    ],
    "pageCount": 288,
    "language": "es",
    "image": "placeholder_cloudinary_url",
    "appRating": 4.7,
    "appReviewsCount": 65,
    "featured": false
  },
  {
    "googleId": "oXk_DwAAQBAJ",
    "title": "Crónica de una muerte anunciada",
    "authors": [
      "Gabriel García Márquez"
    ],
    "publishedDate": "1981-01-01",
    "shortDescription": "Todo el pueblo sabía que lo iban a matar, pero nadie lo impidió.",
    "description": "Una magistral reconstrucción de un asesinato por honor en un pueblo caribeño. Una historia donde el destino y la responsabilidad colectiva son los verdaderos protagonistas.",
    "isbn": "9788439733478",
    "genre": "Realismo Mágico",
    "tags": [
      "Crimen",
      "Honor",
      "Clásico",
      "García Márquez"
    ],
    "pageCount": 160,
    "language": "es",
    "image": "placeholder_cloudinary_url",
    "appRating": 4.8,
    "appReviewsCount": 120,
    "featured": false
  },
  {
    "googleId": "pXk_DwAAQBAJ",
    "title": "El código Da Vinci",
    "authors": [
      "Dan Brown"
    ],
    "publishedDate": "2003-03-18",
    "shortDescription": "Un asesinato en el Louvre revela un secreto guardado por siglos.",
    "description": "El experto en simbología Robert Langdon sigue una serie de pistas ocultas en las obras de Leonardo da Vinci para desvelar un misterio religioso que podría cambiar la historia del cristianismo.",
    "isbn": "9788408047964",
    "genre": "Thriller",
    "tags": [
      "Simbología",
      "Iglesia",
      "Misterio",
      "París"
    ],
    "pageCount": 560,
    "language": "es",
    "image": "placeholder_cloudinary_url",
    "appRating": 4.2,
    "appReviewsCount": 450,
    "featured": false
  },
  {
    "googleId": "qXk_DwAAQBAJ",
    "title": "La sombra del viento",
    "authors": [
      "Carlos Ruiz Zafón"
    ],
    "publishedDate": "2001-05-01",
    "shortDescription": "Un libro maldito cambia la vida de un joven en la Barcelona de posguerra.",
    "description": "Daniel Sempere es llevado por su padre al Cementerio de los Libros Olvidados. Allí elige un libro que lo arrastrará a una intriga de amores secretos y venganzas en una ciudad llena de misterio.",
    "isbn": "9788408043645",
    "genre": "Misterio",
    "tags": [
      "Barcelona",
      "Libros",
      "Gótico",
      "Suspense"
    ],
    "pageCount": 576,
    "language": "es",
    "image": "placeholder_cloudinary_url",
    "appRating": 4.9,
    "appReviewsCount": 210,
    "featured": true
  },
  {
    "googleId": "rXk_DwAAQBAJ",
    "title": "El amor en los tiempos del cólera",
    "authors": [
      "Gabriel García Márquez"
    ],
    "publishedDate": "1985-01-01",
    "shortDescription": "Una historia de amor que espera más de cincuenta años para realizarse.",
    "description": "Florentino Ariza ha esperado medio siglo para repetirle su juramento de amor eterno a Fermina Daza. Una exploración profunda de los diferentes tipos de amor y el paso del tiempo.",
    "isbn": "9788439733447",
    "genre": "Novela",
    "tags": [
      "Amor",
      "Tiempo",
      "Clásico",
      "Lirismo"
    ],
    "pageCount": 496,
    "language": "es",
    "image": "placeholder_cloudinary_url",
    "appRating": 4.7,
    "appReviewsCount": 88,
    "featured": false
  },
  {
    "googleId": "sXk_DwAAQBAJ",
    "title": "El Hobbit",
    "authors": [
      "J.R.R. Tolkien"
    ],
    "publishedDate": "1937-09-21",
    "shortDescription": "Un viaje inesperado hacia la Montaña Solitaria.",
    "description": "Bilbo Bolsón vive una vida tranquila hasta que el mago Gandalf y un grupo de enanos lo arrastran a una aventura para recuperar un tesoro custodiado por el dragón Smaug.",
    "isbn": "9788445071410",
    "genre": "Fantasía",
    "tags": [
      "Aventura",
      "Dragones",
      "Tolkien",
      "Anillo"
    ],
    "pageCount": 310,
    "language": "es",
    "image": "placeholder_cloudinary_url",
    "appRating": 4.9,
    "appReviewsCount": 160,
    "featured": true
  },
  {
    "googleId": "tXk_DwAAQBAJ",
    "title": "Crimen y castigo",
    "authors": [
      "Fiódor Dostoyevski"
    ],
    "publishedDate": "1866-01-01",
    "shortDescription": "El dilema moral de un hombre que cree estar por encima de la ley.",
    "description": "Raskólnikov planea y ejecuta el asesinato de una anciana usurera para demostrar su teoría sobre los hombres superiores, solo para verse consumido por la culpa y la persecución psicológica.",
    "isbn": "9788491052111",
    "genre": "Clásico",
    "tags": [
      "Psicología",
      "Culpa",
      "Rusia",
      "Filosofía"
    ],
    "pageCount": 704,
    "language": "es",
    "image": "placeholder_cloudinary_url",
    "appRating": 4.9,
    "appReviewsCount": 130,
    "featured": false
  },
  {
    "googleId": "uXk_DwAAQBAJ",
    "title": "Fahrenheit 451",
    "authors": [
      "Ray Bradbury"
    ],
    "publishedDate": "1953-10-19",
    "shortDescription": "Los bomberos no apagan fuegos, queman libros.",
    "description": "Montag es un bombero cuya misión es quemar libros, hasta que conoce a una joven que le hace cuestionar la censura y el vacío existencial de su sociedad tecnológica.",
    "isbn": "9788497594523",
    "genre": "Distopía",
    "tags": [
      "Censura",
      "Libros",
      "Futuro",
      "Clásico"
    ],
    "pageCount": 192,
    "language": "es",
    "image": "placeholder_cloudinary_url",
    "appRating": 4.7,
    "appReviewsCount": 94,
    "featured": false
  },
  {
    "googleId": "vXk_DwAAQBAJ",
    "title": "La milla verde",
    "authors": [
      "Stephen King"
    ],
    "publishedDate": "1996-03-28",
    "shortDescription": "Milagros sobrenaturales en el corredor de la muerte.",
    "description": "Paul Edgecombe, guarda en el bloque de ejecución, conoce a John Coffey, un gigante acusado de un crimen atroz que posee un poder de curación inexplicable.",
    "isbn": "9788497593250",
    "genre": "Drama",
    "tags": [
      "Cárcel",
      "Sobrenatural",
      "Emotivo",
      "King"
    ],
    "pageCount": 448,
    "language": "es",
    "image": "placeholder_cloudinary_url",
    "appRating": 4.8,
    "appReviewsCount": 76,
    "featured": false
  },
  {
    "googleId": "wXk_DwAAQBAJ",
    "title": "El nombre de la rosa",
    "authors": [
      "Umberto Eco"
    ],
    "publishedDate": "1980-01-01",
    "shortDescription": "Misteriosos crímenes en una abadía benedictina del siglo XIV.",
    "description": "Fray Guillermo de Baskerville investiga una serie de muertes relacionadas con una biblioteca secreta, enfrentándose a la Inquisición y al oscurantismo medieval.",
    "isbn": "9788466333337",
    "genre": "Misterio Histórico",
    "tags": [
      "Edad Media",
      "Filosofía",
      "Crimen",
      "Biblioteca"
    ],
    "pageCount": 624,
    "language": "es",
    "image": "placeholder_cloudinary_url",
    "appRating": 4.7,
    "appReviewsCount": 105,
    "featured": true
  },
  {
    "googleId": "xXk_DwAAQBAJ",
    "title": "Tokio Blues",
    "authors": [
      "Haruki Murakami"
    ],
    "publishedDate": "1987-09-04",
    "shortDescription": "Una melancólica historia de juventud, amor y pérdida.",
    "description": "Toru Watanabe recuerda su pasado en los años 60 en Tokio, marcado por el suicidio de su mejor amigo y su relación con dos mujeres de personalidades opuestas.",
    "isbn": "9788483835050",
    "genre": "Ficción Contemporánea",
    "tags": [
      "Melancolía",
      "Japón",
      "Juventud",
      "Murakami"
    ],
    "pageCount": 384,
    "language": "es",
    "image": "placeholder_cloudinary_url",
    "appRating": 4.5,
    "appReviewsCount": 140,
    "featured": false
  },
  {
    "googleId": "yXk_DwAAQBAJ",
    "title": "Ensayo sobre la ceguera",
    "authors": [
      "José Saramago"
    ],
    "publishedDate": "1995-01-01",
    "shortDescription": "Una epidemia de ceguera blanca revela lo peor y mejor de la humanidad.",
    "description": "Cuando una ciudad es golpeada por una ceguera repentina, el orden social se desmorona. Un grupo de supervivientes intenta mantener la dignidad en un mundo que se ha vuelto brutal.",
    "isbn": "9788420442433",
    "genre": "Ficción Filosófica",
    "tags": [
      "Sociedad",
      "Epidemia",
      "Supervivencia",
      "Saramago"
    ],
    "pageCount": 384,
    "language": "es",
    "image": "placeholder_cloudinary_url",
    "appRating": 4.8,
    "appReviewsCount": 160,
    "featured": true
  },
  {
    "googleId": "zXk_DwAAQBAJ",
    "title": "Atomic Habits",
    "authors": [
      "James Clear"
    ],
    "publishedDate": "2018-10-16",
    "shortDescription": "Pequeños cambios, resultados extraordinarios.",
    "description": "Un método probado para desarrollar buenos hábitos y romper los malos mediante la comprensión de la ciencia del comportamiento y los sistemas de mejora diaria.",
    "isbn": "9781847941831",
    "genre": "Autoayuda",
    "tags": [
      "Productividad",
      "Hábitos",
      "Crecimiento",
      "Sistemas"
    ],
    "pageCount": 320,
    "language": "en",
    "image": "placeholder_cloudinary_url",
    "appRating": 4.9,
    "appReviewsCount": 500,
    "featured": true
  },
  {
    "googleId": "aYk_DwAAQBAJ",
    "title": "Elantris",
    "authors": [
      "Brandon Sanderson"
    ],
    "publishedDate": "2005-04-21",
    "shortDescription": "Una ciudad de dioses convertida en una prisión de muertos vivientes.",
    "description": "Elantris era la ciudad de la gloria, pero una extraña maldición convirtió a sus habitantes en seres decrépitos. Un príncipe caído debe descubrir el secreto de la magia perdida para salvar a su pueblo.",
    "isbn": "9788466658843",
    "genre": "Fantasía",
    "tags": [
      "Magia",
      "Política",
      "Maldición",
      "Cosmere"
    ],
    "pageCount": 656,
    "language": "es",
    "image": "placeholder_cloudinary_url",
    "appRating": 4.5,
    "appReviewsCount": 42,
    "featured": false
  }
]

async function importarDatos() {
  const coleccion = 'libros';
  
  console.log("Iniciando importación...");

  for (const libro of libros) {
    try {

      const id = libro.id || null;
      if (id) {
        await db.collection(coleccion).doc(id).set(libro);
      } else {
        await db.collection(coleccion).add(libro);
      }
      console.log(`Libro guardado: ${libro.title}`);
    } catch (error) {
      console.error(`Error al importar ${libro.title}:`, error);
    }
  }

  console.log("✨ Proceso finalizado.");
  process.exit();
}

importarDatos();s