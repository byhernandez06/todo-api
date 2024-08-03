import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
import authRoutes from './routes/authRoutes';
import todoRoutes from './routes/todoRoutes';

dotenv.config();

// Create Express app
const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize Sequelize
const sequelize = new Sequelize({
    dialect: 'mysql',
    username: process.env.DB_USER!,
    password: process.env.DB_PASSWORD!,
    database: process.env.DB_DATABASE!,
    host: process.env.DB_HOST!,
    logging: false,
});

// Connect to the database
sequelize.authenticate()
    .then(() => console.log('Connected To Database'))
    .catch((error: Error) => console.error('Error connecting to Database:', error));

// Use auth routes
app.use('/auth', authRoutes);
app.use('/api', todoRoutes);

export { app, sequelize };







// import express, { Application } from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import { Sequelize } from 'sequelize';
// import authRoutes from './routes/authRoutes';
// import todoRoutes from './routes/todoRoutes';

// dotenv.config();

// // Create Express app
// const app: Application = express();

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Initialize Sequelize
// const sequelize = new Sequelize({
//     dialect: 'mysql',
//     username: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_DATABASE,
//     host: process.env.DB_HOST,
//     logging: false,
// });

// // Connect to the database
// sequelize.authenticate()
//     .then(() => console.log('Connected To Database'))
//     .catch((error: Error) => console.error('Error connecting to Database:', error));

// // Use auth routes
// app.use('/auth', authRoutes);

// app.use('/api', todoRoutes); 

// // Start the server
// const PORT: number = 3000;
// app.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}`);
// });
