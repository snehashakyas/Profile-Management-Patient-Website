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

// delete patient
export const deletePatient = createAsyncThunk('patients/delete', async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token // get JWT token
        return await patientService.deletePatient(id, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString() // see if they exist, put in variable
        return thunkAPI.rejectWithValue(message)
    }
})

// edit patient
export const editPatient = createAsyncThunk('patients/edit', async ({id, formData}, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token // get JWT token
        return await patientService.editPatient(id, formData, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString() // see if they exist, put in variable
        return thunkAPI.rejectWithValue(message)
    }
})

export const patientSlice = createSlice({
    name: 'patient',
    initialState,
    reducers: {
        reset2: (state) => initialState // reset to default values
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
            .addCase(deletePatient.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deletePatient.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.patients = state.patients.filter((patient) => patient._id !== action.payload.id) // only shows goals that are NOT delete so the page is immedately refreshed with the deleted patient gone
            })
            .addCase(deletePatient.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(editPatient.pending, (state) => {
                state.isLoading = true
            })
            .addCase(editPatient.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                // replace current state.patients value with the new updated state.patients value
                const editedPatient = action.payload // edited patient object returned from API
                console.log('editedPatient')
                console.log(editedPatient)
                const index = state.patients.findIndex((patient) => patient._id === editedPatient._id) // index of patient to be edited in the patients array
                if (index !== -1) { // if patient found in array, update its data
                    state.patients[index] = editedPatient;
                }
            })
            .addCase(editPatient.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const { reset2 } = patientSlice.actions
export default patientSlice.reducer