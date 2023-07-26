import { Heading, Input, Button, Stack, Box, Flex, Link } from '@chakra-ui/react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createPatient } from '../features/patients/patientSlice'
import { toast } from 'react-toastify'

function PatientForm({ setTrigger }) {
    //const [ trigger, setTrigger ] = useState(false)

    const [ patient, setPatient ] = useState({
        fullName: '',
        email: '',
        contact: '',
        dob: '',
        profilePic: null
    })

    const dispatch = useDispatch()

    const { fullName, email, contact, dob, profilePic } = patient

    const onSubmit = (e) => {
        e.preventDefault()

        // form data

        const formData = new FormData();
        formData.append('fullName', fullName);
        formData.append('email', email);
        formData.append('contact', contact);
        formData.append('dob', dob);
        formData.append('profilePic', profilePic);

        dispatch(createPatient(formData))

            // dispatch(createPatient({
            //     fullName, 
            //     email,
            //     contact,
            //     dob,
            //     profilePic
            // }))
        
        // reset
        // setPatient({
        //     fullName: '',
        //     email: '',
        //     contact: '',
        //     dob: '',
        //     profilePic: ''
        // })

        setTrigger(false)
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
                    <Input required placeholder="Full Name" type="text" id="fullName" name="fullName" value={fullName} variant="filled" mb={3} onChange={onChange}/>

                    <label htmlFor="email">Email</label>
                    <Input required placeholder="Email" type="email" id="email" name="email" value={email} variant="filled" mb={3} onChange={onChange}/>

                    <label htmlFor="contact">Contact</label>
                    <Input required placeholder="Contact" type="number" id="contact" name="contact" value={contact} variant="filled" mb={3} onChange={onChange}/>

                    <label htmlFor="dob">Date of Birth</label>
                    <Input required placeholder="Date of Birth" type="date" id="dob" name="dob" value={dob} variant="filled" mb={3} onChange={onChange}/>

                    <label htmlFor="profilePic">Profile Picture</label>
                    <Input required placeholder="Profile Picture" type="file" id="profilePic" name="profilePic" variant="filled" mb={3} onChange={onChange}/>

                </div>
                <div className="form-group">
                <Button className='btn' mb={8} type="submit">Add Patient</Button>
                </div>

            </form>
        </section>
  )
}

export default PatientForm