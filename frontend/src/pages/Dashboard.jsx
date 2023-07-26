import { Heading, Input, Button, Stack, Box, Flex, GlobalStyle } from '@chakra-ui/react'
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

  // const onLogout = () => {
  //   dispatch(logout())
  //   dispatch(reset())
  //   navigate('/users/signin')
  // }

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
        <Flex mr={20} bg="rgb(227,0,34)" p={3} borderRadius={15}>
          <button className='btn-addPatient' onClick={() => setButtonPopup(true)}>Add Patient</button>
        </Flex>
      </Flex>
      <br></br>

      <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
        <PatientForm setTrigger={setButtonPopup}/>
      </Popup>

      <Popup trigger={buttonPopupEdit} setTrigger={setButtonPopupEdit}>
        <PatientEditForm setTrigger={setButtonPopupEdit} selectedPatientAll={selectedPatientAll}/>
      </Popup>

      <Popup trigger={buttonPopupDelete} setTrigger={setButtonPopupDelete}>
        <PatientDeleteForm setTrigger={setButtonPopupDelete} selectedPatient={selectedPatient}/>
      </Popup>

      {/* <section className='content'> */}
      <section>
        {patients && patients.length > 0 ? (
          <div>
            <table>
              <tr>
                <th>Profile Picture</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Phone Contact</th>
                <th>Date of Birth</th>
                <th>Actions</th>
              </tr>
              {patients.map((i) => {
                return (
                  <tr>
                    <td>{i.profilePic} </td>
                    <td>{i.fullName} </td>
                    <td>{i.email} </td>
                    <td>{i.contact} </td>
                    <td>{i.dob} </td>
                    <td>
                      <Flex flexDirection='row' gap='15'>
                      <button onClick={() => {
                        setSelectedPatient(i._id)
                        setButtonPopupDelete(true)
                      }} className='delete-btn'>DELETE</button>
                      <button onClick={() => {
                        setSelectedPatientAll(i)
                        setButtonPopupEdit(true)
                      }}>EDIT</button>
                      </Flex>
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
    </>
  )
}

export default Dashboard