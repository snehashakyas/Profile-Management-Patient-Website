import { Heading, Input, Button, Stack, Box, Flex } from '@chakra-ui/react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'
import { useEffect } from 'react'
import PatientForm from '../components/PatientForm' 
import Spinner from '../components/Spinner'

function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const { patients, isLoading, isError, message } = useSelector((state) => state.patients)

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/users/signin')
  }

  useEffect(() => {
    if(isError) {
      console.log(message)
    }
    if(!user) { // if no user
      navigate('/users/signin')
    }
  }, [user, navigate])

  return (
    <>
      <section className="heading">
        <h1>Welcome, {user && user.name} </h1>
        <p>Patients Dashboard</p>
      </section>
      <PatientForm />
      <Flex h="12vh" alignItems="top">
        <Flex bg="coral" p={30} borderRadius={20}>
          <button className='btn' onClick={onLogout}>Logout</button>
        </Flex>
      </Flex>
    </>
  )
}

export default Dashboard