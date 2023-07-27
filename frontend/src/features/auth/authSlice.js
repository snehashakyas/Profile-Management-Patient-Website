import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import authService from './authService'

// get user from localStorage
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    user: user ? user : null, // get user if there is user, or else null
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// Register user
export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
    try {
        return await authService.register(user) // payload
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString() // see if they exist, put in variable
        return thunkAPI.rejectWithValue(message)
    }
})

// Signin user
export const signin = createAsyncThunk('auth/signin', async (user, thunkAPI) => {
    try {
        return await authService.signin(user) // payload
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString() // see if they exist, put in variable
        return thunkAPI.rejectWithValue(message)
    }
})

// Logout user
export const logout = createAsyncThunk('auth/logout', async () => {
    await authService.logout() // logout function in authService
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => { // to reset state to default values
            state.isError = false
            state.isSuccess = false
            state.isLoading = false
            state.message = ''
        }
    }, 
    extraReducers: (builder) => {
        builder
        .addCase(register.pending, (state) => { // what to do when the register is pending
            state.isLoading = true
        })
        .addCase(register.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload // payload that is returned by register function
        })
        .addCase(register.rejected, (state, action) => { // what to do when something goes wrong
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.user = null
        })
        .addCase(logout.fulfilled, (state) => {
            state.user = null
        })
        .addCase(signin.pending, (state) => { // what to do when the register is pending
            state.isLoading = true
        })
        .addCase(signin.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload // payload is response from backend
        })
        .addCase(signin.rejected, (state, action) => { // what to do when something goes wrong
            state.isLoading = false
            state.isError = true
            state.message = action.payload // payload is error message
            state.user = null
        })
    }
})

export const {reset} = authSlice.actions
export default authSlice.reducer