import {Link} from 'react-router-dom'

export default function Login() {
  const handleSubmit = (event) => {
    event.preventDefault()
  }

  return (
    <>
      <h1 className="title">Login into your account</h1>

      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email"/>
        <input type="password" placeholder="Password"/>
        <button className="btn btn-block">Login</button>
        <p className="message">
          Not Registered? <Link to='/sign-up'>Create an account</Link>
        </p>
      </form>
    </>
  )
}