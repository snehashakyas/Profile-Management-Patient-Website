import axios from 'axios'

const API_URL = "http://localhost:3001/api/patient/"

// add new patient
const createPatient = async (patientData, token) => {
    const config = { // contains headers
        headers: {
            Authorization: `Bearer ${token}` // send as Bearer token
        }
    }

    const response = await axios.post(API_URL, patientData, config)

    return response.data
}

// get user patients
const getPatients = async (token) => {
    const config = { // contains headers
        headers: {
            Authorization: `Bearer ${token}` // send as Bearer token
        }
    }

    const response = await axios.get(API_URL, config)

    return response.data
}

const patientService = {
    createPatient, 
    getPatients
}

export default patientService