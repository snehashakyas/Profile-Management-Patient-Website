import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import patientReducer from '../features/patients/patientSlice'


export const store = configureStore({
  reducer: {
    auth: authReducer, // reducer for user
    patients: patientReducer // reducer for patient
  },
});
