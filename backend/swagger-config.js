import swaggerJSDoc from "swagger-jsdoc";

// Swagger definition
const swaggerDefinition = {
  openapi: "3.0.0", 
  info: {
    title: "Cocktail API",
    version: "1.0.0",
    description: "API documentation for the Cocktail Website",
    contact: {
      name: "Henni Mansour",
      email: "hennimansour.yousrayasmine@example.com",
    },
  },
  servers: [
    {
      url: "http://localhost:8080/api", 
      description: "Development Server",
    },
],
components: {
  securitySchemes: {
    BearerAuth: {
      type: "http",
      scheme: "bearer",
      bearerFormat: "JWT", // specify the format of the token
    },
  },
},
security: [
  {
    BearerAuth: [], // apply security scheme globally
  },
],
};

// Options for swagger-jsdoc
const options = {
    swaggerDefinition,
    apis: ["./src/routes/*.js", "./src/controllers/*.js"],
  };
  

// Generate Swagger specification
const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
