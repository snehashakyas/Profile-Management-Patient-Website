const { getPatient, addPatient } = require("../controllers/patientController");
const { generateToken } = require("../controllers/userController");
const Patient = require("../models/patientModel");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const logger = require("../logger/logger");

// TEST FOR PATIENTSCONTROLLER.JS

// GET PATIENTS TEST
describe("getPatient test", () => {
  mockRes = {
    // mock res object
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  // function to mock patient model (to return sample patients for user)
  jest.mock("../models/patientModel", () => ({
    find: jest.fn(),
  }));

  beforeEach(() => {
    findStub = jest.spyOn(Patient, "find"); //spying on patient model
  });

  afterEach(() => {
    jest.clearAllMocks(); // reset mock functions
  });

  // sample patients data
  const samplePatients = [
    {
      fullName: "Bob Marley",
      email: "bob.marley@gmail.com",
      contact: "1234567890",
      dob: "2002-02-02",
      //   profilePic: "/images/1689828132904.png",
      isStarred: true,
    },
  ];

  it("Expected status 200: Should retrieve patients for a specific user.", async () => {
    findStub.mockResolvedValue(samplePatients); // mocking to return sample patients
    const mockReq = { user: { id: "100" } }; // mocking user ID
    await getPatient(mockReq, mockRes); // call controller function
    expect(findStub).toHaveBeenCalledWith({ user: "100" }); // verifying that findStub is called with correct user
    expect(mockRes.status).toHaveBeenCalledWith(200); // status code 200 = request fulfilled
    expect(mockRes.json).toHaveBeenCalledWith(samplePatients);
  });

  it("Expected status 401: Should give 401 Unauthorized if user ID is null.", async () => {
    const mockReq = { user: { id: null } }; // mock invalid iD, set the req.user.id to a sample user id
    await getPatient(mockReq, mockRes);
    expect(findStub).not.toHaveBeenCalled(); //veryifying that findStub was not called
    expect(mockRes.status).toHaveBeenCalledWith(401); // status code 401 = unauthorized
    expect(mockRes.json).toHaveBeenCalledWith({ error: "Unauthorized" });
  });
});

//ADD PATIENTS TEST
describe("addPatient test", () => {
  let createStub;
  let mockReq;
  let mockRes;

  beforeEach(() => {
    createStub = jest.spyOn(Patient, "create");

    // mocked req and res
    mockReq = {
      body: {
        fullName: "Bob Marley",
        email: "bob.marley@gmail.com",
        contact: "1234567890",
        dob: "2002-02-02",
        profilePic: "/images/1689828132904.png",
        isStarred: true,
      },
      file: {
        // path: '../../images/1689828132904.png',
        path: "../../images/",
      },
    };

    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks(); // resert
  });

  it("Expected status 201: Should add a new patient.", async () => {
    // sample patient data
    const newPatient = {
      fullName: "Bob Marley",
      email: "bob.marley@gmail.com",
      contact: "1234567890",
      dob: "2002-02-02",
      profilePic: "images/1689828132904.png",
      isStarred: true,
    };
    createStub.mockResolvedValue(newPatient); // mock create patient
    await addPatient(mockReq, mockRes); // call controller function with mock

    // Verify that Patient.create() was called with the correct data
    expect(createStub).toHaveBeenCalledWith(mockReq.body);
    console.group(createStub);

    logger.info(createStub);

    // Verify that res.status().json() was called with the correct data
    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith(newPatient);
  });
});

// TEST FOR PATIENTSCONTROLLER.JS

// GENERATE TOKEN
jest.mock("jsonwebtoken", () => ({
  sign: jest.fn().mockReturnValue("mocked_token"), // mock JWT
}));
describe("generateToken test", () => {
  it("Should generate JWT token.", () => {
    const token = generateToken("user_id_123"); // pass in mock user ID
    // verifying correct call and if generated token matches mocked token
    expect(jwt.sign).toHaveBeenCalledWith(
      { id: "user_id_123" },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );
    expect(token).toBe("mocked_token");
  });
});
