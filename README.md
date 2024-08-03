# Byron Hernandez Test Api

## Description
This API provides a platform to manage tasks and users, developed using Node.js, TypeScript and Sequelize with a MySQL database. It provides endpoints for user authentication and task management, allowing operations such as registration, login, creation, update and deletion of tasks. The API is designed to be simple to configure and use, providing a solid foundation for task management applications.

## Installation
To install and configure the project, follow these steps:

1. **Clone the repository:** 

   ```bash
   git clone https://github.com/byhernandez06/todo-api.git
   cd todo-api
   ```

2. **Install dependencies**

    ```bash
    npm install
    ```

3. **Configure environment variables**

Copy the example configuration file and edit it with your data:

    ```bash
    cp .env.example .env
    ```

4. **Create the database in Mysql**.

Go to Mysql and create the database with the name you prefer, just remember to go to the .env and add it in the DB_NAME variable.


5. **Configure config.json**.

Configure src/config/config.json in development enviroment with the credentials for your DB connection, and remember to add it to .gitignore, in my case I'm going to upload it because they are just test credentials and in case you need to see something from the file.

    ```bash
    "username": "root",
    "password": "pass123456",
    "database": "byronh_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
    ```


6. **Run migrations and seeders**.

These lines will create the tables and a user for you to start, however in the app you can create the user without problem. 

    ```bash
    cd src
    sequelize init
    npx sequelize-cli db:migrate
    npx sequelize-cli db:seed:all
    cd ..
    ```

7. **Start the application**.

Make sure you are in the root of the project

    ```bash
    npm start
    ```

## Usage

The repository has a collection that you can see through Postman, it is quite clear, you will see the methods with their respective urls, body and other information. Do a correct login and the get the token, add it in all requests, go to Authorization/Bearer token, and add it there.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)