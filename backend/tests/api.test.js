// integration test: (request, response)
// const request = require("supertest")
// const baseURL = "http://localhost:3002"

// // Patient
// describe("GET /api/patient", () => {
//     const newPatient = {
//         fullName: "Bob Marley",
//         email: "bob.marley@gmail.com",
//         contact: "1234567890",
//         dob: "2002-02-02",
//         profilePic: "/images/1689828132904.png",
//         isStarred: true
//     }
//     beforeAll(async () => {
//       // set up the newPatient
//       await request(baseURL).post("/api/patient").send(newPatient);
//     })
//     afterAll(async () => {
//       await request(baseURL).delete(`/patient/${newPatient.id}`)
//     })
//     it("should return 200", async () => {
//       const response = await request(baseURL).get("/api/patient");
//       expect(response.statusCode).toBe(200);
//       expect(response.body.error).toBe(null);
//     });
//     it("should return todos", async () => {
//       const response = await request(baseURL).get("/api/patient");
//       expect(response.body.data.length >= 1).toBe(true);
//     });
//   });