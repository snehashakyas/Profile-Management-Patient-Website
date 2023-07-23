// for making http request and sending data back and setting any data in local storage

import axios from 'axios'

// register user function
const register = async (userData) => {
    const response = await axios.post("http://localhost:3001/api/users", userData)

    if(response.data) { // axios puts response in object called data, hence the reference
        localStorage.setItem('user', JSON.stringify(response.data)) // only strings are allowed in localStorage. response.data includes the token
    }

    return response.data
}

// signin user function
const signin = async (userData) => {
    const response = await axios.post("http://localhost:3001/api/users/signin", userData)

    if(response.data) { // axios puts response in object called data, hence the reference
        localStorage.setItem('user', JSON.stringify(response.data)) // only strings are allowed in localStorage. response.data includes the token
    }

    return response.data
}

// logout user function
const logout = () => {
    localStorage.removeItem('user') // remove user from localStorage
}

const authService = {
    register,
    logout,
    signin
}

export default authService