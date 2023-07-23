import { Heading, Input, Button, Stack, Box, Flex, Link } from '@chakra-ui/react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createPatient } from '../features/patients/patientSlice'

function PatientForm() {
    const [ patient, setPatient ] = useState({
        fullName: '',
        email: '',
        contact: '',
        dob: '',
        profilePic: null
    })

    //const [ profilePicData, setProfilePicData ] = useState(null)

    const dispatch = useDispatch()

    const { fullName, email, contact, dob, profilePic } = patient

    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(createPatient({
            fullName, 
            email,
            contact,
            dob,
            profilePic
        }))
        
        // reset
        // setPatient({
        //     fullName: '',
        //     email: '',
        //     contact: '',
        //     dob: '',
        //     profilePic: ''
        // })
    }

    const onChange = (event) => {
        const { name, value, type } = event.target
        
        if (type === 'file') { // if file is profilePic photo
            const file = event.target.files[0] // access selected file from input
            setPatient((prevState) => ({
                ...prevState,
                profilePic: file,
            }))
        } else {
            setPatient((prevState) => ({
                ...prevState,
                [event.target.name]: event.target.value,
              }))
        }
    }

    return (
        <section className='form'>
            <form onSubmit={onSubmit} enctype="multipart/form-data">
                <div className="form-group">
                    <h2>Add Patient Form:</h2>

                    <label htmlFor="fullName">Full Name</label>
                    <Input placeholder="Full Name" type="text" id="fullName" name="fullName" value={fullName} variant="filled" mb={3} onChange={onChange}/>

                    <label htmlFor="email">Email</label>
                    <Input placeholder="Email" type="email" id="email" name="email" value={email} variant="filled" mb={3} onChange={onChange}/>

                    <label htmlFor="contact">Contact</label>
                    <Input placeholder="Contact" type="number" id="contact" name="contact" value={contact} variant="filled" mb={3} onChange={onChange}/>

                    <label htmlFor="dob">Date of Birth</label>
                    <Input placeholder="Date of Birth" type="date" id="dob" name="dob" value={dob} variant="filled" mb={3} onChange={onChange}/>

                    <label htmlFor="profilePic">Profile Picture</label>
                    <Input placeholder="Profile Picture" type="file" id="profilePic" name="profilePic" value={profilePic} variant="filled" mb={3} onChange={onChange}/>

                </div>
                <div className="form-group">
                <Button colorScheme="teal" mb={8} type="submit">Add Patient</Button>
                </div>

            </form>
        </section>
  )
}

export default PatientForm