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

**User Register Page:**

<img src="https://github.com/snehashakyas/profile-management/assets/65065868/eb178cec-cc53-4f54-9576-aa439244dff6" width="700" />

**User Login Page:**

<img src="https://github.com/snehashakyas/profile-management/assets/65065868/ba5af7f3-ee8f-49cd-90e8-267c48a2fb96" width="700" />

**Patient Dashboard with No Patients:**

<img src="https://github.com/snehashakyas/profile-management/assets/65065868/08cf2019-dd60-4a67-a048-25620be60692" width="700" />

**Patient Dashboard with Patients:**

Patients that are marked as "special attention" will appear at the top of the website in alphabetical order.

<img src="https://github.com/snehashakyas/profile-management/assets/65065868/815344c0-f933-4837-9f10-72bd9d21597c" width="700" />

**Adding Patient in Patient Dashboard:**

This pop-up appears when the "Add Patient" button is pressed. All fields are required.

<img src="https://github.com/snehashakyas/profile-management/assets/65065868/c77eb778-9e46-40e7-af9a-36d49595b920" width="700" />

**Deleting Patient in Patient Dashboard:**

This confirmation pop-up appears when the "DELETE" button for a patient is pressed.

<img src="https://github.com/snehashakyas/profile-management/assets/65065868/f0db184b-f349-4167-b3b9-b1c5b8f08397" width="700" />

**Editing Patient in Patient Dashboard:**

This pop-up appears when the "EDIT" button for a patient is pressed. Any field can be editted to update the patient's information.

<img src="https://github.com/snehashakyas/profile-management/assets/65065868/a881da39-0aa3-45e8-889c-f2f595c3163b" width="700" />


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
