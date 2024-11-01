# 🎲 Casino Roulette Simulator 🎲

![Github last commit](https://img.shields.io/github/last-commit/terkinas/baigiamasis-darbas) <br />
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Next.js](https://img.shields.io/badge/next.js-%23000000.svg?style=for-the-badge&logo=next.js&logoColor=white) ![Prisma](https://img.shields.io/badge/prisma-1B222D?style=for-the-badge&logo=prisma&logoColor=white)

Casino Roulette Simulator is a web-based application that allows users to simulate roulette games, place bets, and experience the thrill of casino gaming in an online environment. The platform is built with a Next.js frontend and a Node.js/Express backend, using PostgreSQL with Prisma ORM for data management.

## Table of Contents
1. [Installation](#installation)
2. [Usage](#usage)
3. [Technologies](#technologies)
4. [Project Structure](#project-structure)
5. [License](#license)

## Installation

To set up the project locally, follow the instructions below:

### Prerequisites

- **Node.js** and **npm**
- **PostgreSQL** server running locally or accessible via network.

### Backend Setup

1. **Clone the repository**:

    ```bash
    git clone https://github.com/terkinas/roulette-simulator
    cd roulette-simulator
    ```

2. **Navigate to the backend folder**:

    ```bash
    cd backend
    ```

3. **Install dependencies**:

    ```bash
    npm install
    ```

4. **Configure PostgreSQL connection**:

    Create a `.env` file in the `backend` directory and set up environment variables:

    ```plaintext
    DATABASE_URL="postgresql://yourUsername:yourPassword@localhost:5432/yourDatabaseName"
    ```

    ### Environment Variables

    To configure the project correctly, you need to create `.env` files in both the `/frontend` and `/backend` directories with the following variables:

    #### Frontend `.env`

    The frontend application requires these environment variables:

    ```plaintext
    SERVER_URL=http://192.168.0.20:8000/api
    SERVER_SOCKET_URL=http://192.168.0.20:8000
    NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_recaptcha_site_key
    NEXT_PUBLIC_RECAPTCHA_SECRET_KEY=your_recaptcha_secret_key
    ```

    - `SERVER_URL`: URL for API requests from the frontend.
    - `SERVER_SOCKET_URL`: URL for socket connections.
    - `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`: Public site key for Google reCAPTCHA.
    - `NEXT_PUBLIC_RECAPTCHA_SECRET_KEY`: Secret key for Google reCAPTCHA.

    #### Backend `.env`

    The backend application requires these environment variables:

    ```plaintext
    SERVER_SECRET=secret
    NODE_ENV=dev
    PORT=8000

    # ORIGIN_DOMAIN=http://localhost:3000
    ORIGIN_DOMAIN=http://192.168.0.20:3000

    DATABASE_URL="postgresql://postgres:password$@localhost:5432/casino2?schema=public"
    ```

    - `SERVER_SECRET`: Secret key used for server authentication or sessions.
    - `NODE_ENV`: Environment mode, typically `dev` for development.
    - `PORT`: Port where the backend server will run.
    - `ORIGIN_DOMAIN`: Allowed origin for CORS, typically the frontend URL.
    - `DATABASE_URL`: Connection string for the PostgreSQL database.


5. **Run database migrations** (using Prisma):

    ```bash
    npx prisma migrate dev
    ```

6. **Start the backend server**:

    ```bash
    npm start
    ```

   The backend server should now be running at `http://localhost:8000`.

### Frontend Setup

1. **Open a new terminal** and navigate to the frontend folder:

    ```bash
    cd ../frontend
    ```

2. **Install dependencies**:

    ```bash
    npm install
    ```

3. **Start the frontend development server**:

    ```bash
    npm run dev
    ```

   The frontend application will now be accessible at `http://localhost:3000`.

----------

## Usage

- **Users**: Can simulate a roulette game, place bets, and view winnings or losses in real-time.
- **Betting System**: The simulator includes a simple betting system where users can place virtual bets on different roulette outcomes.

----------

## Technologies

The project is built using:

- **Frontend**: Next.js, React.js, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express.js, Prisma ORM
- **Database**: PostgreSQL

----------

## Project Structure

- **/frontend**: Contains the Next.js application for the client-side interface.
- **/backend**: Holds the Node.js server, Express routes, and Prisma setup for database interactions.

----------

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
