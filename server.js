const express = require('express');
require('./config/database');
const userRouter = require('./routes/userRouter');
const categoryRouter = require('./routes/categoryRouter');
const roomRouter = require('./routes/roomRouter');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const PORT = 3000;
const app = express();

app.use(express.json());

// Swagger configuration
const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API Documentation",
            version: "1.0.0",
            description: "API documentation for the project",
        },
        servers: [
            {
              url: 'https://capitalshop-3its.onrender.com',
              description: 'Production server',
            },
            {
              url: 'http://localhost:3000',
              description: 'Development server',
            },
          ],
    },
    apis: ['./routes/*.js'], 
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(userRouter);
app.use(categoryRouter);
app.use(roomRouter);

app.listen(PORT, () => {
    console.log(`Server is listening on PORT: ${PORT}`);
});
