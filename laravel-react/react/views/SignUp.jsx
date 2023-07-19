import {Link} from "react-router-dom";

export default function SignUp() {
  const handleSubmit = (event) => {
    event.preventDefault()
  }

  return (
    <>
      <h1 className="title">Sign up for free</h1>

      <form onSubmit={handleSubmit}>
        <input type="input" placeholder="Full Name"/>
        <input type="email" placeholder="Email"/>
        <input type="password" placeholder="Password"/>
        <input type="password" placeholder="Password Confirmation"/>
        <button className="btn btn-block">Sign up</button>
        <p className="message">
          Already Registered? <Link to='/login'>Sign in</Link>
        </p>
      </form>
    </>
  )
}