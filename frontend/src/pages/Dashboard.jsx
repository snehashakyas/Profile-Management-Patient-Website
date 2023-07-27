import { Heading, Input, Button, Stack, Box, Flex, GlobalStyle, Image, Collapse } from '@chakra-ui/react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'
import { useState, useEffect } from 'react'
import PatientForm from '../components/PatientForm' 
import PatientEditForm from '../components/PatientEditForm' 
import PatientDeleteForm from '../components/PatientDeleteForm' 
import PatientItem from '../components/PatientItem' 
import { deletePatient } from '../features/patients/patientSlice'
import Header from '../components/Header'
import Spinner from '../components/Spinner'
import { getPatients, reset2 } from '../features/patients/patientSlice'
import Popup from '../components/Popup'
import { toast } from 'react-toastify'
import StarredPatients from '../components/StarredPatients'

function Dashboard() {
  
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth) // for user
  const { patients, isLoading, isError, message } = useSelector((state) => state.patients) // for patients
  const [ buttonPopup, setButtonPopup ] = useState(false)
  const [ buttonPopupEdit, setButtonPopupEdit ] = useState(false)
  const [ buttonPopupDelete, setButtonPopupDelete ] = useState(false)
  const [ selectedPatient, setSelectedPatient ] = useState('')
  const [ selectedPatientAll, setSelectedPatientAll ] = useState('')
  console.log("patients")
  console.log(patients)

  const countStarred = (patients) => {
    var count = 0
    patients.map((i) => {
      if (i.isStarred == true) {
        count = count + 1
      }
    })
    return (count)
  }

  useEffect(() => {
    if(isError) {
      toast.error(message)
      //console.log(message)
    }
    if(!user) { // if no user
      navigate('/users/signin')
    }

    dispatch(getPatients())

    //
    return () => {
      dispatch(reset2())
    }
  }, [user, navigate, isError, message, dispatch])

  if(isLoading) {
    return <Spinner />
  }

  return (
    <>
      <Header />
      <Flex flexDirection='row' gap='20'>
        <section className="heading">
          <p>Your Patients Dashboard</p>
        </section>
        {/* <Flex mr={20} bg="rgb(227,0,34)" p={3} borderRadius={15}> */} 
          <button className='btn' onClick={() => setButtonPopup(true)}>Add Patient</button>
        {/* </Flex> */}
      </Flex>
      <br></br>
      
      <section>
        <Flex flexDirection='row' gap='10'>
          <Heading ml={50} mb={20}>Special Attention Patients</Heading>
          <Image boxSize='20px' src='https://creazilla-store.fra1.digitaloceanspaces.com/icons/3267823/yellow-star-icon-md.png' alt='Special Attention Patient' mt={6} />
          {/* <Button variantColor="blue" onClick={handleToggle}>Click to expand</Button>
            <Collapse mt={4} isOpen={true}>
              <p>Hi</p>
              <StarredPatients patients={patients} setSelectedPatient={setSelectedPatient} setButtonPopupDelete={setButtonPopupDelete} setSelectedPatientAll={setSelectedPatientAll} setButtonPopupEdit={setButtonPopupEdit}/>
            </Collapse> */}
        </Flex>
      </section>
      
      <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
        <PatientForm setTrigger={setButtonPopup}/>
      </Popup>

      <Popup trigger={buttonPopupEdit} setTrigger={setButtonPopupEdit}>
        <PatientEditForm setTrigger={setButtonPopupEdit} selectedPatientAll={selectedPatientAll} selectedPatient={selectedPatient}/>
      </Popup>

      <Popup trigger={buttonPopupDelete} setTrigger={setButtonPopupDelete}>
        <PatientDeleteForm setTrigger={setButtonPopupDelete} selectedPatient={selectedPatient}/>
      </Popup>

       { patients && patients.length > 0 ? (
         <StarredPatients patients={patients} setSelectedPatient={setSelectedPatient} setButtonPopupDelete={setButtonPopupDelete} setSelectedPatientAll={setSelectedPatientAll} setButtonPopupEdit={setButtonPopupEdit}/> 
       ) : (
        <Flex alignItems="center" justifyContent="center">
           <p> You have no Special Attention patients! Add a new patient or edit an existing patient as a Special Attention patient. </p>
         </Flex>
       )} 
      
      <br></br>

      <section>
        <Heading ml={50} mb={20}>All Patients</Heading>
          
        {patients && patients.length > 0 ? (
          <div>
            <table>
              <tr>
                <th></th>
                <th>Profile Picture</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Phone Contact</th>
                <th>Date of Birth</th>
                <th>Actions</th>
                <th></th>
              </tr>
              {patients.map((i) => {
                // const image = require('../../public/assets/images/1689828132904.png')

                return (
                  <tr>
                    <td>{i.isStarred ? (
                      <Image boxSize='20px' src='https://creazilla-store.fra1.digitaloceanspaces.com/icons/3267823/yellow-star-icon-md.png' alt='Special Attention Patient' ml={8} mt={10} mr={5} />
                    ) : (
                      <Image boxSize='20px' src='https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/HD_transparent_picture.png/1600px-HD_transparent_picture.png?20200606142532' alt='Not Special Attention Patient' ml={8} mt={10} mr={5} />) }
                    </td>
                    <td>
                      <p>image</p>
                      {/* <img src={`localhost:3002/${i.profilePic}`}/> */}
                    </td>
                    <td>{i.fullName} </td>
                    <td>{i.email} </td>
                    <td>{i.contact} </td>
                    <td>{i.dob} </td>
                    <td>
                      <Flex flexDirection='row' gap='15'>
                      <button onClick={() => {
                        setSelectedPatient(i._id)
                        setButtonPopupDelete(true)
                      }} className='btn-delete'>DELETE</button>
                      <button className='btn-edit' onClick={() => {
                        setSelectedPatientAll(i)
                        setSelectedPatient(i._id)
                        setButtonPopupEdit(true)
                      }}>EDIT</button>
                      </Flex>
                    </td>
                    <td>
                      <Image boxSize='20px' src='https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/HD_transparent_picture.png/1600px-HD_transparent_picture.png?20200606142532' alt='' ml={0} mt={10} mr={0} />
                    </td>
                    
                  </tr>
                )
              })}
            </table>
          </div>
          // <div className="goals">
          //   {patients.map((patient) => (
          //     <PatientItem key={patient._id} patient={patient} />
          //   ))}
          // </div>
        ) : (
          <Flex alignItems="center" justifyContent="center">
            <p> You have no patients! Click the 'Add Patient' button above to add your patients to your patient portal. </p>
          </Flex>
        )}
      </section>
      <br></br>
    </>
  )
}

export default Dashboard