import './index.css';
import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import axios from 'axios';
import { trackPromise, usePromiseTracker } from 'react-promise-tracker';
import LoadingSpinnerComponent from 'components/LoadingIndicator';
import loginImage from '../../images/login-register.png';
import logo from '../../images/logo2.png';
import { URL } from '../App/constants';

function SignupPage() {
  const history = useHistory();
  const [errorMsg, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [nameValue, setNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const updateName = event => {
    setNameValue(event.target.value);
  };
  const updateEmail = event => {
    setEmailValue(event.target.value);
  };
  const updatePassword = event => {
    setPasswordValue(event.target.value);
  };
  const RegisterUser = () => {
    trackPromise(
      axios
        .post(`${URL}/v1/auth/register`, {
          name: nameValue,
          email: emailValue,
          password: passwordValue,
        })
        .then(function(response) {
          if (response.statusText === 'Created' && response.status === 201) {
            setSuccess('Registered successfully. Please login');
            setError('');
            // history.push('/homepage')
          }
        })
        .catch(function(error) {
          if (error.response.status === 401)
            setError(error.response.data.message);
          else if (error.response.status === 400)
            setError(error.response.data.message);
          else setError('Something went wrong. Please try again later.');
          setSuccess('');
        }),
    );
  };
  const { promiseInProgress } = usePromiseTracker();
  return promiseInProgress ? (
    <LoadingSpinnerComponent />
  ) : (
    <>
      <div className="signup-container">
        <div className="login">
          <div className="login-section-left">
            <div className="login-section-left-text">
              <img className="logo" src={logo} alt="website-logo" />
              <h1 className="sign-in-to">Sign up to</h1>
              <h1 className="website-name">AIR CLASS</h1>
              <p className="register-msg">
                If you already have an account login
              </p>
              <p className="register-msg">
                You can{' '}
                <NavLink className="nav-link" to="/login">
                  <span className="register-here">Login here!</span>
                </NavLink>
              </p>
            </div>
            <img src={loginImage} className="login-image" alt="login" />
          </div>

          <div className="login-section-right">
            <h1 className="sign-in">Sign Up</h1>
            <form>
              <input
                type="text"
                className="signup-input"
                placeholder="Name"
                value={nameValue}
                onChange={updateName}
              />
              <input
                type="text"
                className="signup-input"
                placeholder="Email"
                value={emailValue}
                onChange={updateEmail}
              />

              <input
                type="password"
                className="signup-input"
                placeholder="Password"
                value={passwordValue}
                onChange={updatePassword}
              />
              {success && (
                <>
                  <small style={{ color: 'green' }}>{success}</small>
                  <br />
                </>
              )}
              {errorMsg && (
                <>
                  <small style={{ color: 'red' }}>{errorMsg}</small>
                  <br /> <br />
                </>
              )}
              <button
                type="submit"
                className="signup-input login-btn"
                onClick={RegisterUser}
              >
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignupPage;
