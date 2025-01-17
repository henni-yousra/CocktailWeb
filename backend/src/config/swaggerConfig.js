import swaggerJSDoc from 'swagger-jsdoc';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'Ici vous trouverez la documentation de l\'API',
    },
    servers: [
      {
        url: 'http://localhost:8080/api', 
      },
    ],
  },
  apis: ['../routes/*.js'], 
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export default swaggerSpec;
