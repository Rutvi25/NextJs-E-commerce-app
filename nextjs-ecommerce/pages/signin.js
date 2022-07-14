import { useState, useContext, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

import { DataContext } from "../store/GlobalState";
import { postData } from "../utils/fetchData";

const Signin = () => {
  const initialState = { email: '', password: '' }
  const [userData, setUserData] = useState(initialState);
  const { email, password } = userData;
  const [state, dispatch] = useContext(DataContext);
  const { auth } = state
  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setUserData({...userData, [name]: value})
    dispatch({ type: 'NOTIFY', payload: {} })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: 'NOTIFY', payload: {loading: true} });
    const res = await postData('auth/login', userData);

    if(res.error) return dispatch({ type: 'NOTIFY', payload: {error: res.error} });
    dispatch({ type: 'NOTIFY', payload: {success: res.message} });

    dispatch({ type: 'AUTH', payload: {
      token: res.access_token,
      user: res.user
    }});

    Cookies.set('refreshToken', res.refresh_token, {
      path: 'api/auth/accessToken',
      expires: 7
    });
    localStorage.setItem('firstLogin', true)
  }

  useEffect(() => {
    if(Object.keys(auth).length !== 0) router.push('/')
  }, [auth])

  return (
    <div>
      <Head>
        <title>Sign in</title>
      </Head>
      <form className="mx-auto my-4" style={{ maxWidth: "500px" }} onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmnlfor="email">Email address</label>
          <input
            required
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            name="email"
            value={email}
            onChange={handleInputChange}
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label htmnlfor="password">Password</label>
          <input
            required
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="btn btn-dark w-100">
          Login
        </button>
        <p className="my-2">
          Don't have an account?
          <Link href="/register">
            <a style={{ color: "crimson" }}> Register Now</a>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signin;
