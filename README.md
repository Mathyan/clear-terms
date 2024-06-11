# ClearTerms

<!--toc:start-->

- [ClearTerms](#clearterms)
  - [Project Description](#project-description)
  - [Technologies](#technologies)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Running the Application](#running-the-application)
  - [Access the Application](#access-the-application)
  <!--toc:end-->

## Project Description

ClearTerms is designed to simplify and summarize the licenses and terms of service from various web services. This project makes it easier for users to understand complex legal documents at a glance.

## Technologies

- **Backend**: NestJS
- **Frontend**: Angular

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

### Running the Application

1. **Start the Backend and Frontend concurrently**
   From the root of your project directory, run the following command to start both the frontend and backend servers:

   ```bash
   npm run start
   ```

   This command uses `concurrently` to run both servers. The frontend will be available at `http://localhost:4200` and the backend at `http://localhost:3000`.

## Access the Application

Visit `http://localhost:4200` in your web browser to interact with the ClearTerms application.
