// import { Heading, Input, Button, Stack, Box, Flex, GlobalStyle } from '@chakra-ui/react'
// import { Link, useNavigate } from 'react-router-dom'
// import { useSelector, useDispatch } from 'react-redux'
// import { logout, reset } from '../features/auth/authSlice'
// import { useState, useEffect } from 'react'
// import PatientForm from '../components/PatientForm' 
// import PatientItem from '../components/PatientItem' 
// import Header from '../components/Header'
// import Spinner from '../components/Spinner'
// import { editPatient } from '../features/patients/patientSlice'
// import Popup from '../components/Popup'

// function PatientEdit() {

//   // get data with get request
//   // use data to populate data

//   // NEED TO ACCESS PREV DATA HERE
//   const [ patient, setPatient ] = useState({
//     fullName: '',
//     email: '',
//     contact: '',
//     dob: '',
//     profilePic: null
//   })

//   const navigate = useNavigate()
//   const dispatch = useDispatch()
//   const { user } = useSelector((state) => state.auth) // for user


//   const { fullName, email, contact, dob, profilePic } = patient

//   const onBack = () => {
//     //dispatch(logout())
//     dispatch(reset())
//     navigate('/users/me')
//   }

//   const onSubmit = async (event) => {
//     event.preventDefault();
//     const patientData={
//       fullName,
//       email,
//       contact,
//       dob,
//       profilePic
//     }

//     dispatch(editPatient(patientData))
//   }

//   const onChange = (event) => {
//     const { name, value, type } = event.target
    
//     if (type === 'file') { // if file is profilePic photo
//         const file = event.target.files[0] // access selected file from input
//         setPatient((prevState) => ({
//             ...prevState,
//             profilePic: file,
//         }))
//     } else {
//         setPatient((prevState) => ({
//             ...prevState,
//             [event.target.name]: event.target.value,
//           }))
//     }
//   }
  
//   return (
//     <>
//       <Header />
//       <section className='form'>
//             <form onSubmit={onSubmit} enctype="multipart/form-data">
//                 <div className="form-group">
//                   <section className="heading">
//                     <p>Edit: {patient && patient.fullName} </p>
//                   </section>  

//                     <label htmlFor="fullName">Full Name</label>
//                     <Input required placeholder="Full Name" type="text" id="fullName" name="fullName" value={fullName} variant="filled" mb={3} onChange={onChange}/>

//                     <label htmlFor="email">Email</label>
//                     <Input required placeholder="Email" type="email" id="email" name="email" value={email} variant="filled" mb={3} onChange={onChange}/>

//                     <label htmlFor="contact">Contact</label>
//                     <Input required placeholder="Contact" type="number" id="contact" name="contact" value={contact} variant="filled" mb={3} onChange={onChange}/>

//                     <label htmlFor="dob">Date of Birth</label>
//                     <Input required placeholder="Date of Birth" type="date" id="dob" name="dob" value={dob} variant="filled" mb={3} onChange={onChange}/>

//                     <label htmlFor="profilePic">Profile Picture</label>
//                     <Input required placeholder="Profile Picture" type="file" id="profilePic" name="profilePic" value={profilePic} variant="filled" mb={3} onChange={onChange}/>

//                 </div>
//                 <div className="form-group">
//                 <Button className='btn' mb={8} type="submit">Confirm Edit</Button>
//                 </div>

//             </form>
//         </section>
//     </>
//   )
// }
// export default PatientEdit