# TaskHub 🚀 - Todo Board App

> Backend: [todo-app-backend](https://github.com/education-tech-stack/todo-list-backend)

TaskHub is a robust todo board application designed to streamline task management with a user-friendly interface. Built on a tech stack featuring Node.js, Express, Redux, React.js, Sequelize ORM, TypeScript, and PostgreSQL, TaskHub offers a seamless experience for organizing and prioritizing tasks.

![Screenshot 2023-12-28 001935](https://github.com/education-tech-stack/todo-list-backend/assets/48860013/1b923666-3a96-4349-874a-3b3fbd7a4aef)
![Screenshot 2023-12-31 013923](https://github.com/education-tech-stack/todo-list-backend/assets/48860013/efbda9d7-3e66-4699-90d8-bcf9418f80ec)
![Screenshot 2023-12-31 013900](https://github.com/education-tech-stack/todo-list-backend/assets/48860013/7946062b-1bbb-402c-a774-9dfa61c03423)

## Features 🌟

### Login and Signup 🔐
Users can securely authenticate themselves through a JWT-based authentication system. TaskHub provides a hassle-free signup process, ensuring data integrity and user privacy.

### User-wise Board Screen 🖥️
Upon login, users are greeted with a personalized board screen, displaying their tasks and columns. This tailored experience enhances efficiency and user satisfaction.

### Add Column ➕
Easily customize your task board by adding new columns to categorize tasks. This feature allows users to tailor their workflow to suit their specific needs.

### Add Tasks 📝
TaskHub simplifies task creation with a straightforward interface. Users can swiftly add tasks to their designated columns, minimizing time spent on administrative tasks.

### Edit Tasks ✏️
Effortlessly update task details with the edit feature. Users can modify task names, descriptions, and other information to keep their tasks accurate and up-to-date.

### Delete Tasks 🗑️
Remove unnecessary tasks with the delete feature. TaskHub allows users to declutter their board by easily removing tasks that are completed or no longer relevant.

### Reorder Tasks 🔄
Effortlessly reorder tasks within columns to prioritize work. TaskHub's intuitive drag-and-drop functionality makes task management a breeze.

### Change Task Column 🔄
Adapt to evolving priorities by moving tasks between columns. This flexibility ensures that TaskHub remains a dynamic tool for users with ever-changing task lists.

## Tech Stack ⚙️

### Frontend
- [Vite](https://vitejs.dev/)
- [React.js](https://reactjs.org/)
- [Husky](https://typicode.github.io/husky/#/)
- [React Router](https://reactrouter.com/)
- [ESLint](https://eslint.org/)
- [Chakra UI](https://chakra-ui.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)

### Backend
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [JWT Authentication](https://jwt.io/)
- [Sequelize ORM](https://sequelize.org/)
- [PostgreSQL Database](https://www.postgresql.org/)

## Getting Started 🚀
To get started with TaskHub, follow these steps:
1. Clone the frontend repository `git clone https://github.com/education-tech-stack/todo-list-frontend`.
2. Clone the backend repository `git clone https://github.com/education-tech-stack/todo-list-backend`.
3. Set up Postgres by using docker-compose or any method that you prefer. Just get the Postgres URL.
4. Backend:
   * `cd todo-list-backend` get into the directory.
   * Install dependencies using `yarn`.
   * Create a file `.env` and add two variables named `SECRET_KEY` and `SEQUELIZE_DATABASE`. Add any string as it's used for JWT generation and the Postgresql URL that you have respectively.
   * Optional: If you want some seed data run `yarn seed`.
   * Run dev as `yarn dev`.
5. Frontend:
   * `cd todo-list-frontend` get into the directory.
   * Install dependencies using `yarn`.
   * Create a file `.env` and add a variable named `VITE_SERVER`. Add backend URL string as `http://localhost:8000/api`. Change the port as per your requirement.
   * Run dev as `yarn dev`.

## Other Commands 🛠️
Check `package.json` for other commands.

## Commit Commands 📦
This project uses [commitlint](https://github.com/conventional-changelog/commitlint) to ensure that commit messages are [conventional-changelog](https://github.com/conventional-changelog/commitlint/tree/master/@commitlint/config-conventional) compliants.

To help you build more efficient commit messages, you can use the [commitizen](https://github.com/commitizen/cz-cli) package by running this command :
```bash
yarn cz
```

## License 📄

TaskHub is licensed under the [MIT License](LICENSE). Feel free to use, modify, and distribute it according to the terms of the license.
