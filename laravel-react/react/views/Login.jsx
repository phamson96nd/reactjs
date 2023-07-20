import {useRef, useState} from "react"
import {Link} from 'react-router-dom'
import axiosClient from "../src/axios-client";
import {useStateContext} from "../src/contexts/ContextProvider";

export default function Login() {
  const [errors, setErrors] = useState()

  const emailRef = useRef()
  const passwordRef = useRef()

  const {setToken, setUser} = useStateContext()

  const handleSubmit = (event) => {
    event.preventDefault()
    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    }

    setErrors(null)
    axiosClient.post('/login', payload)
      .then(({data}) => {
        setToken(data.token)
        setUser(data.user)
      })
      .catch((error) => {
        const response = error.response
        if (response && response.status === 422) {
          if (response.data.errors) {
            setErrors(response.data.errors)
          } else {
            setErrors({
              email: [response.data.message]
            })
          }
        }
      })
  }

  return (
    <>
      <h1 className="title">Login into your account</h1>

      {errors &&
      <div className="alert">
        {Object.keys(errors).map(key => (
          <p key={key}>{errors[key][0]}</p>
        ))}
      </div>
      }

      <form onSubmit={handleSubmit}>
        <input ref={emailRef} type="email" placeholder="Email"/>
        <input ref={passwordRef} type="password" placeholder="Password"/>
        <button className="btn btn-block">Login</button>
        <p className="message">
          Not Registered? <Link to='/sign-up'>Create an account</Link>
        </p>
      </form>
    </>
  )
}