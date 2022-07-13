import Head from "next/head";
import Link from "next/link";
import { useState, useContext } from "react";

import { DataContext } from "../store/GlobalState";
import validate from "../utils/validate";
import { postData } from "../utils/fetchData";

const Register = () => {
  const initialState = {name: '', email: '', password: '', confirmPassword: ''}
  const [userData, setUserData] = useState(initialState);
  const { name, email, password, confirmPassword} = userData;

  const [state, dispatch] = useContext(DataContext)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setUserData({...userData, [name]: value})
    dispatch({ type: 'NOTIFY', payload: {} })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errMsg = validate(name, email, password, confirmPassword)
    if(errMsg) {
      return dispatch({ type: 'NOTIFY', payload: {error: errMsg} })
    }
    dispatch({ type: 'NOTIFY', payload: {loading: true} })
    const res = await postData('auth/register', userData)
    if(res.error) return dispatch({ type: 'NOTIFY', payload: {error: res.error} })
    dispatch({ type: 'NOTIFY', payload: {success: res.message} })

  }
  return (
    <div>
      <Head>
        <title>Register</title>
      </Head>
      <form className="mx-auto my-4" style={{ maxWidth: "500px" }} onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmnlfor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Enter Name"
            name="name" value={name} onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmnlfor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            name="email" value={email} onChange={handleInputChange}
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label htmnlfor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Enter Password"
            name="password" value={password} onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmnlfor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            placeholder="Enter Password again"
            name="confirmPassword" value={confirmPassword} onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="btn btn-dark w-100">
          Register
        </button>
        <p className="my-2">
          Already have an account?
          <Link href="/signin">
            <a style={{ color: "crimson" }}> Login Now</a>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
