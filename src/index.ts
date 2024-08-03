import { app, sequelize } from './app';

const PORT: number = Number(process.env.PORT) || 3000;

const startServer = async () => {
  try {
    // Sync models with the database
    await sequelize.sync(); // Use `{ force: false }` in production to avoid data loss

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Unable to start the server:', error);
    process.exit(1); // Exit with failure code
  }
};

startServer();





// import { Sequelize } from 'sequelize';
// import sequelize from './database'; // Asegúrate de que la ruta sea correcta
// import User from './models/User'; // Asegúrate de que la ruta sea correcta
// import Todo from './models/Todo'; // Asegúrate de que la ruta sea correcta

// (async () => {
//   try {
//     // Autenticación con la base de datos
//     await sequelize.authenticate();
//     console.log('Connection has been established successfully.');

//     // Sincroniza los modelos con la base de datos
//     await sequelize.sync({ force: true }); // Esto eliminará y recreará las tablas. Usa `{ force: false }` para evitar eliminar datos existentes.
//     console.log('Database synchronized.');

//     // Ejemplo: Crear un usuario y un todo
//     const user = await User.create({
//       fullName: 'John Doe',
//       email: 'john.doe@example.com',
//       password: 'password123',
//     });

//     console.log('User created:', user.toJSON());

//     const todo = await Todo.create({
//       title: 'Sample Todo',
//       description: 'This is a sample todo item.',
//       completed: false,
//       userId: user.id,
//     });

//     console.log('Todo created:', todo.toJSON());
//   } catch (error) {
//     console.error('Unable to connect to the database or perform operations:', error);
//   }
// })();
