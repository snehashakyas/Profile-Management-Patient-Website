// import { Heading, Input, Button, Stack, Box, Flex, Link, Image, Text } from '@chakra-ui/react'
// import { useSelector, useDispatch } from 'react-redux'
// import { useNavigate } from 'react-router-dom'
// import { useState, useEffect } from 'react'
// import { deletePatient } from '../features/patients/patientSlice'
// import { toast } from 'react-toastify'
// import Spinner from '../components/Spinner'


// function PatientItem({patient}) {
  
//   const dispatch = useDispatch()
//   const navigate = useNavigate()
//   const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth) // selecting from state.auth state

//   // useEffect(() => {
//   //   if(isError) { // if true
//   //     toast.error(message)
//   //   }
//   //   if(isSuccess || user) {
//   //     navigate('/users/' + patient._id) // navigate directly to dashboard
//   //   }
//   //   //dispatch(reset())// reset states
//   // }, [user, isError, isSuccess, message, navigate, dispatch])

//   const onSubmit = async (event) => {
//     event.preventDefault();
//     // const userData={
//     //   "email": email,
//     //   "password": password
//     // }

//     //dispatch(signin(userData))
//   }
  
//   return (
    
//     <div className="goal">
//         {/* <div>
//             {new Date(patient.createdAt).toLocaleString('en-US')}
//         </div> */}
//         {patient.profilePic}
//         <h2>{patient.fullName}</h2>
//         <button onClick={() => dispatch(deletePatient(patient._id))} className='close'>X</button>
//         <form onSubmit={onSubmit}>
//           {/* <Button className='btn' mb={30} type="submit"> Edit Patient</Button>  */}
//           {/* <button onClick={() => navigate('/users/' + patient._id )}>Edit Patient</button> */}
//         </form>
        
//     </div>
//   )
// }

// export default PatientItem