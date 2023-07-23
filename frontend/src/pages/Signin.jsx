import { Heading, Input, Button, Stack, Box, Flex, Link } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
//import axios from "axios"
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
// useSelector: to select something from state (e.g. isUser, isLoading, isError, etc)
// useDispatch: to dispatch function async thunk function

import { signin, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

function Signin() {

  const [ formData, setFormData ] = useState({
    email: '',
    password: ''
  })
  const { email, password } = formData

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
      "email": email,
      "password": password
    }

    dispatch(signin(userData))
  // // catching responses with axios
  // try {
  //   const response = await axios.post("http://localhost:3001/api/users/signin", userData) // 3001 is backend port
  //   console.log(response)
  // } catch (error) {
  //   console.log(error)
  // }
  }

  if(isLoading) {
    return <Spinner />
  }

  return (
    <>
      <Heading mb={8}>patientmanager.com</Heading>
      <Flex h="120vh" alignItems="center" justifyContent="center">
        <Flex flexDirection="column" bg="coral" p={30} borderRadius={20}>
        <form onSubmit={onSubmit}>
          <Stack spacing={10} p="1rem"boxShadow="md">
            <Heading mb={30}>Login</Heading>
            <Input placeholder="Email" type="email" id="email" name="email" value={email} variant="filled" mb={3} onChange={onChange} />
            <Input placeholder="Password" type="password" id="password" name="password" value={password} variant="filled" mb={6} onChange={onChange} />
            <Button colorScheme="teal" mb={8} type="submit"> Log In</Button>
            <Box>
              New to us?{" "}
                <Link color="teal.500" href="../users" >
                  Register here.
                </Link>
            </Box>
          </Stack>
        </form>
        </Flex>
      </Flex>
    </>
  )
  }

export default Signin