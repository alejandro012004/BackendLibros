const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Libros Completa",
      version: "1.0.0",
      description: "Documentación de todos los endpoints de la aplicación",
    },
    servers: [{ url: "http://localhost:3000/api/v1" }],
    components: {
      securitySchemes: {
        bearerAuth: { type: "http", scheme: "bearer", bearerFormat: "JWT" },
      },
      schemas: {
        Libro: {
          type: "object",
          properties: {
            googleId: { type: "string" },
            title: { type: "string" },
            authors: { type: "array", items: { type: "string" } },
            publishedDate: { type: "string" },
            isbn: { type: "string" },
            genre: { type: "string" },
            pageCount: { type: "integer" },
            language: { type: "string" },
          },
        },
        Usuario: {
          type: "object",
          properties: {
            nombre: { type: "string" },
            email: { type: "string" },
            password: { type: "string" },
          },
        },
        Review: {
          type: "object",
          properties: {
            rating: { type: "integer", minimum: 1, maximum: 5 },
            comment: { type: "string" },
          },
        },
      },
    },
    paths: {
      "/auth/registrar": {
        post: { tags: ["Auth"], summary: "Registro de usuario", requestBody: { content: { "application/json": { schema: { $ref: "#/components/schemas/Usuario" } } } }, responses: { 201: { description: "Creado" } } }
      },
      "/auth/login": {
        post: { tags: ["Auth"], summary: "Login", requestBody: { content: { "application/json": { schema: { type: "object", properties: { email: { type: "string" }, password: { type: "string" } } } } } }, responses: { 200: { description: "OK" } } }
      },
      "/auth/usuarios/{email}": {
        patch: { tags: ["Auth"], summary: "Actualizar usuario (Admin)", security: [{ bearerAuth: [] }], parameters: [{ name: "email", in: "path", required: true, schema: { type: "string" } }], responses: { 200: { description: "Actualizado" } } },
        delete: { tags: ["Auth"], summary: "Eliminar usuario (Admin)", security: [{ bearerAuth: [] }], parameters: [{ name: "email", in: "path", required: true, schema: { type: "string" } }], responses: { 200: { description: "Eliminado" } } }
      },
      "/libros": {
        get: { tags: ["Libros"], summary: "Listar todos los libros", responses: { 200: { description: "OK" } } },
        post: { tags: ["Libros"], summary: "Crear nuevo libro (Admin)", security: [{ bearerAuth: [] }], requestBody: { content: { "application/json": { schema: { $ref: "#/components/schemas/Libro" } } } }, responses: { 201: { description: "Creado" } } }
      },
      "/libros/populares": {
        get: { tags: ["Libros"], summary: "Libros más populares", responses: { 200: { description: "OK" } } }
      },
      "/libros/recientes": {
        get: { tags: ["Libros"], summary: "Libros añadidos recientemente", responses: { 200: { description: "OK" } } }
      },
      "/libros/mis-favoritos": {
        get: { tags: ["Libros"], summary: "Ver mis favoritos", security: [{ bearerAuth: [] }], responses: { 200: { description: "OK" } } }
      },
      "/libros/favoritos": {
        post: { tags: ["Libros"], summary: "Añadir/Quitar favorito", security: [{ bearerAuth: [] }], requestBody: { content: { "application/json": { schema: { type: "object", properties: { libroId: { type: "string" } } } } } }, responses: { 200: { description: "Actualizado" } } }
      },
      "/libros/{libroId}": {
        get: { tags: ["Libros"], summary: "Obtener un libro por ID", parameters: [{ name: "libroId", in: "path", required: true, schema: { type: "string" } }], responses: { 200: { description: "OK" } } },
        patch: { tags: ["Libros"], summary: "Editar libro (Admin)", security: [{ bearerAuth: [] }], parameters: [{ name: "libroId", in: "path", required: true, schema: { type: "string" } }], responses: { 200: { description: "Editado" } } },
        delete: { tags: ["Libros"], summary: "Borrar libro (Admin)", security: [{ bearerAuth: [] }], parameters: [{ name: "libroId", in: "path", required: true, schema: { type: "string" } }], responses: { 204: { description: "Borrado" } } }
      },
      "/libros/genero/{genero}": {
        get: { tags: ["Libros"], summary: "Filtrar por género", parameters: [{ name: "genero", in: "path", required: true, schema: { type: "string" } }], responses: { 200: { description: "OK" } } }
      },
      "/libros/buscar/{titulo}": {
        get: { tags: ["Libros"], summary: "Buscar por título", parameters: [{ name: "titulo", in: "path", required: true, schema: { type: "string" } }], responses: { 200: { description: "OK" } } }
      },
      "/libros/{libroId}/reviews": {
        get: { tags: ["Reviews"], summary: "Obtener reseñas", parameters: [{ name: "libroId", in: "path", required: true, schema: { type: "string" } }], responses: { 200: { description: "OK" } } },
        post: { tags: ["Reviews"], summary: "Dejar una reseña", security: [{ bearerAuth: [] }], parameters: [{ name: "libroId", in: "path", required: true, schema: { type: "string" } }], requestBody: { content: { "application/json": { schema: { $ref: "#/components/schemas/Review" } } } }, responses: { 201: { description: "Publicada" } } }
      }
    }
  },
  apis: [] 
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app, port) => {
  app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = { swaggerDocs };