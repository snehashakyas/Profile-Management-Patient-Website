# Patient Profile Management Application

This project is a simple Patient Profile Mangement application. A user is able to create their own user account, and then add, edit, delete and view medical patients with their account only. Users can also mark patients as "special attention patients", which will appear at the top of the website in alphabetical order. Different users cannot access other users' patient data as proper access control is enforced.

This application has two parts:
1. Client side, which is the frontend where patient data is visualized and interacted with.
2. Server side, which is the backend where patient data is processed. The server is exposed via RESTful APIs.

In this document, you will find:
* Frontend application screenshots
* Techstack information
* Setup Process
* Test coverage and API documentation

## Frontend Application Screenshots

** Register **
![image](https://github.com/snehashakyas/profile-management/assets/65065868/02535a96-8866-4b32-b339-24e0d3331a0c)




## Techstack Information
* RESTful API
* JSON Web Tokens (JWT) are used to enforce a token-based authentication mechanism for users to login and logout of their accounts
database
* React is used to create the client side of the project
* Node.js is used to create the server side of thie project

## Setup Process
# Installation

1. You will need nodejs and npm to run the application.So make sure you have them installed.If not installed please install them and then run the application
2. To use the client just browse to the client folder and run:

   ```
   npm install
   ```
   This installs all the required dependencies
3. Once, all the dependencies are installed you can run:

   ```
   npm start
   ```
   This would start the client
4. Now lets run the server.In the root folder first run the following command.

   ```
   npm install
   ```
   This would install all the dependencies required for the server
5. Populate the .env in the root folder as per the .env.example
6. Then run the following command to start the server.

   ```
   npm start
   ```

## Test Coverage and API Documentation

postman
