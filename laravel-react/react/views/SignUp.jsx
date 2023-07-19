import {useRef, useState} from "react";
import {Link} from "react-router-dom";
import axiosClient from "../src/axios-client";
import {useStateContext} from "../src/contexts/ContextProvider";

export default function SignUp() {
  const [errors, setErrors] = useState()

  const nameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmationRef = useRef()

  const {setToken, setUser} = useStateContext()

  const handleSubmit = (event) => {
    event.preventDefault()
    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value,
    }
    axiosClient.post('/sign-up', payload)
      .then(({data}) => {
        setToken(data.token)
        setUser(data.user)
      })
      .catch((error) => {
        const response = error.response
        if (response && response.status === 422) {
          setErrors(response.data.errors)
        }
      })
  }

  return (
    <>
      <h1 className="title">Sign up for free</h1>

      {errors &&
        <div className="alert">
          {Object.keys(errors).map(key => (
            <p key={key}>{errors[key][0]}</p>
          ))}
        </div>
      }

      <form onSubmit={handleSubmit}>
        <input ref={nameRef} type="input" placeholder="Full Name"/>
        <input ref={emailRef} type="email" placeholder="Email"/>
        <input ref={passwordRef} type="password" placeholder="Password"/>
        <input ref={passwordConfirmationRef} type="password" placeholder="Password Confirmation"/>
        <button className="btn btn-block">Sign up</button>
        <p className="message">
          Already Registered? <Link to='/login'>Sign in</Link>
        </p>
      </form>
    </>
  )
}