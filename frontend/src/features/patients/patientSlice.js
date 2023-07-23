import patientService from './patientService'
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

const initialState = {
    patient: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// add new patient
export const createPatient = createAsyncThunk('patients/create', async (patientData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token // get JWT token
        return await patientService.createPatient(patientData, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString() // see if they exist, put in variable
        return thunkAPI.rejectWithValue(message)
    }
})

// get user patient
export const getPatients = createAsyncThunk('patients/getAll', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token // get JWT token
        return await patientService.getPatients(token)


    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString() // see if they exist, put in variable
        return thunkAPI.rejectWithValue(message)
    }
} )

export const patientSlice = createSlice({
    name: 'patient',
    initialState,
    reducers: {
        reset: (state) => initialState // reset to default values
    }, 
    extraReducers: (builder) => {
        builder
            .addCase(createPatient.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createPatient.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.patients.push(action.payload) // push new patient created
            })
            .addCase(createPatient.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getPatients.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getPatients.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.patients = action.payload
            })
            .addCase(getPatients.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const { reset } = patientSlice.actions
export default patientSlice.reducer