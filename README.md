# Web Server without Express

A minimalistic web server built using the native `http` module in Node.js. This project aims to demonstrate how to create a web server without relying on popular frameworks like Express.

## 🌟 Features

- 🔧 Native `http` based server.
- 🚀 Custom routing mechanism.
- 🧪 Testing setup with Jest and Supertest.
- 📦 Minimal dependencies.
- 📝 JSON file as a simple DB.

## 🚀 Getting Started

### 📋 Prerequisites

- Node.js and npm installed. [Download here](https://nodejs.org/).

### 🛠️ Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/maciejbaba/js-web-server.git
    ```
2. **Install dependencies:**
    ```bash
    npm install
    ```
3. **Start the server:**
    ```bash
    npm start
    ```
    Your server should be running on [http://localhost:3000](http://localhost:3000), or on the port specified in the environment variable `PORT`.


### 🧪 Testing

1. **Run tests:**
    ```bash
    npm test
    ```
    This will run all the tests in the `tests` directory.

### 📦 Built With

- [Node.js](https://nodejs.org/) - JavaScript runtime environment.
- [Jest](https://jestjs.io/) - JavaScript testing framework.
- [Supertest](https://www.npmjs.com/package/supertest) - HTTP testing library.

### 📝 Usage

The server exposes the following endpoints:

- `GET /` - Returns a welcome message.
- `GET /users` - Returns a list of users.
- `GET /users/:id` - Returns a single user.
- `POST /users` - Creates a new user.
- `PUT /users/:id` - Updates a user.
- `DELETE /users/:id` - Deletes a user.

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [Node.js Documentation](https://nodejs.org/en/docs/)
- [Jest Documentation](https://jestjs.io/docs/en/getting-started)
- [Supertest Documentation](https://www.npmjs.com/package/supertest)
