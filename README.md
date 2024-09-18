# ClearTerms

<!--toc:start-->

- [ClearTerms](#clearterms)
  - [Project Description](#project-description)
  - [Technologies](#technologies)
  - [Getting Started](#getting-started) - [Prerequisites](#prerequisites) - [Installation](#installation) - [Running the Application](#running-the-application) - [Serving the Application](#serving-the-application)
  <!--toc:end-->

## Project Description

ClearTerms is designed to simplify and summarize the licenses and terms of service from various web services. This project makes it easier for users to understand complex legal documents at a glance.

## Technologies

- **Backend**: NestJS
- **Frontend**: Angular
- **Database**: SQLite managed by Prisma

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (latest LTS version recommended)
- npm or yarn
- Angular CLI: `npm install -g @angular/cli`
- NestJS CLI: `npm install -g @nestjs/cli`
- Concurrently: `npm install -g concurrently`

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Mathyan/clear-terms.git
   cd ClearTerms
   ```

2. **Install project dependencies**
   This will install both frontend and backend dependencies in their respective directories.

   ```bash
   npm run install
   ```

3. **Set up the Environment Variables**
   Copy the `.env.template` file to `.env` and fill in the required environment variables.

4. **Set up the Database**
   To initialize the database, run the following command:

   ```bash
   npx prisma migrate dev --name init
   ```

### Running the Application

1. **Start the Backend and Frontend concurrently**
   From the root of your project directory, run the following command to start both the frontend and backend servers:

   ```bash
   npm run start:debug
   ```

   This command uses `concurrently` to run both servers. Both servers are accessed trough NestJS.

2. **Access the Application**
   Open your browser and navigate to `http://localhost:3000/` to access the application.
   Backend is too accessible at `http://localhost:3000/api`.

### Serving the Application

1. **Building and starting the Application**
   To build the application, run the following command:

   ```bash
   npm run start
   ```

   The build artifacts will be stored in the `dist/` directory.

2. **Access the Application**
   Application is served at `http://localhost:3000/` for further proxing.
