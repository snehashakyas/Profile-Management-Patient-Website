import { Heading, Input, Button, Stack, Box, Flex, Link, Image, Text } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux' // useSelector: to select something from state (e.g. isUser, isLoading, isError, etc); useDispatch: to dispatch function async thunk function
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
  }

  if(isLoading) {
    return <Spinner />
  }

  return (
    <>
      <Flex h="30vh" alignItems="center" justifyContent="center">
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
            <Heading mb={20}>Login</Heading>

            <label htmlFor="email">Email</label>
            <Input required className='form-input' placeholder="Email" type="email" id="email" name="email" value={email} variant="filled" mb={20} onChange={onChange} />

            <label htmlFor="password">Password</label>
            <Input required className='form-input' placeholder="Password" type="password" id="password" name="password" value={password} variant="filled" mb={20} onChange={onChange} />
            
            <Button className='btn' mb={30} type="submit"> Log In</Button>
            <Box>
              <Text as='i'>New to us?{" "}</Text>
                <Link color="rgb(132, 26, 26)" href="../users" >
                  <Text as='u' >Register here.</Text>
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