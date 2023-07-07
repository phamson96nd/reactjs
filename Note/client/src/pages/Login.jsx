import React, {useContext} from "react";
import {Button, Typography} from '@mui/material'
import {GoogleAuthProvider, signInWithPopup, getAuth} from 'firebase/auth'
import {AuthContext} from '../context/AuthProvider'
import {useNavigate} from 'react-router-dom'

export default function Login() {
  const auth = getAuth()
  const {user} = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLoginGG = async () => {
    const provider = new GoogleAuthProvider()

    const res = await signInWithPopup(auth, provider)

  }

  if (user?.uid) {
    navigate('/')
    return ;
  }


  return (
    <>
      <Typography variant='h5' sx={{marginBottom: '10px'}}>
        Welcome to Note App
      </Typography>
      <Button variant='outlined' onClick={handleLoginGG}>
        Login with Google
      </Button>
    </>
  )
}