import { Heading, Input, Button, Stack, Box, Flex, Link, Image, Text } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'

function Header() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  
  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/users/signin')
  }

  return (
    <header className='header'>
      <div>
        <Flex flexDirection='row' gap='100'>
          <Flex flexDirection ='row' justifyContent='center' gap='10'>
            <Image boxSize='60px' src='https://images.freeimg.net/rsynced_images/heart-pulse-3662916_1280.png' alt='Logo' ml={20} />
            <Heading as='h3' size='sm' mt={10}>patientmanager.com</Heading>
          </Flex>
          <Text mt={13} color='rgb(132, 26, 26)'>Welcome, {user && user.name} </Text>
        </Flex>
      </div>
      <div>
        {/* <Flex mr={20} bg="coral" p={10} borderRadius={15}> */}
        <Flex mr={30}>
          <button ml={20} className='btn' onClick={onLogout}>Logout</button>
        </Flex>
      </div>
    </header>
  )
}

export default Header