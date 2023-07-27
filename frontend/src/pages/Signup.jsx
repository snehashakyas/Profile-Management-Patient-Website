import { Heading, Input, Button, Stack, Box, Flex, Link, Image, Text } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
// useSelector: to select something from state (e.g. isUser, isLoading, isError, etc)
// useDispatch: to dispatch function async thunk function

import { register, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

function Signup() {

  const [ formData, setFormData ] = useState({
    fullName: '',
    email: '',
    password: ''
  })

  const { fullName, email, password } = formData
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth) // selecting from state.auth state

  // dependencies that fire off useEffect are in []
  useEffect(() => {
    if(isError) { // if true
      toast.error(message)
    }

    if(isSuccess || user) {
      navigate('/users/me') // navigate directly to dashboard
    }

    dispatch(reset())// reset states
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const onChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }))
  }

  const onSubmit = async (event) => {
    event.preventDefault();

    const userData={
      "fullName": fullName,
      "email": email,
      "password": password
    }

  dispatch(register(userData)) // calling code from authSlice
  }

  if(isLoading) {
    return <Spinner />
  }

  return (
    <>
      <Flex h="25vh" alignItems="center" justifyContent="center">
        <Flex flexDirection='column'>
          <Flex flexDirection ='row' justifyContent='center' gap='15'>
            <Image boxSize='100px' src='https://images.freeimg.net/rsynced_images/heart-pulse-3662916_1280.png' alt='Logo' mb={15} />
            <Heading as='h1' size='xl' mt={20}>patientmanager.com</Heading>
          </Flex>
          <Text mb={0}>Your own medical patients management portal. Store and manage now. </Text>
        </Flex>
      </Flex>

      <Flex alignItems="center" justifyContent="center">
        <Flex flexDirection="column" className='login-form' >
        <form onSubmit={onSubmit}>
          <Stack spacing={10}>
            <Heading mb={20}>Register</Heading>

            <label htmlFor="fullName">Full Name</label>
            <Input required className='form-input' placeholder="Full Name" size='md' type="text" id="fullName" name="fullName" value={fullName} variant="filled" mb={10} onChange={onChange}/>
            
            <label htmlFor="email">Email</label>
            <Input required className='form-input' placeholder="Email" size='md' type="email" id="email" name="email" value={email} variant="filled" mb={10} onChange={onChange} />
            
            <label htmlFor="password">Password</label>
            <Input required className='form-input' placeholder="Password" size='lg' type="password" id="password" name="password" value={password} variant="filled" mb={10} onChange={onChange} />
            
            <Button className='btn' mb={30} type="submit"> Register</Button>
            <Box>
              <Text as='i'>Have an account?{" "}</Text>
                <Link color="rgb(132, 26, 26)" href="../users/signin" >
                <Text as='u' >Log in here. </Text>
                </Link>
            </Box>
          </Stack>
        </form>
        </Flex>
      </Flex>
    </>
  )
  }

export default Signup