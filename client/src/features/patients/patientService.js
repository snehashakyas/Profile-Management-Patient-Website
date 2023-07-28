import axios from 'axios'

const API_URL = "http://localhost:3002/api/patient/"

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

// delete patient
const deletePatient = async (patientId, token) => {
    const config = { // contains headers
        headers: {
            Authorization: `Bearer ${token}` // send as Bearer token
        }
    }

    const response = await axios.delete(API_URL + patientId, config)

    return response.data
}

// edit patient
const editPatient = async (patientId, formData, token) => {
    const config = { // contains headers
        headers: {
            Authorization: `Bearer ${token}` // send as Bearer token
        }
    }

    const response = await axios.put(API_URL + patientId, formData, config)

    return response.data
}

const patientService = {
    createPatient, 
    getPatients,
    deletePatient,
    editPatient
}

export default patientService