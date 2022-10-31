import React, { useState } from 'react'
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput
}
from 'mdb-react-ui-kit';
import { Button } from 'react-bootstrap';
import { signInWithEmailAndPassword } from "firebase/auth";
import {getAuth} from '../components/firebase'
import { useNavigate } from 'react-router-dom';


function LoginPage(props) {
  const [error,setError] = useState(false)
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')



  const navigate = useNavigate()

  const handleSubmit = (e) =>{
    e.preventDefault()

    const auth = getAuth();

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    props.setUser(true)

    navigate('/')
  })
  .catch((error) => {
    console.log(error);

  });


  }
  return (
    <div className='LoginPage'>
      <MDBContainer fluid>
      <MDBRow>

        <MDBCol sm='6'>

          <div className='d-flex flex-row ps-5 pt-5'>
            <MDBIcon fas icon="crow fa-3x me-3" style={{ color: '#709085' }}/>
            <span className="h1 fw-bold mb-0">Logo</span>
          </div>

          <div className='d-flex flex-column justify-content-center h-custom-2 w-75 pt-4'>

            <h3 className="fw-normal mb-3 ps-5 pb-3" style={{letterSpacing: '1px'}}>Log in</h3>

            <MDBInput wrapperClass='mb-4 mx-5 w-100' label='Email address' id='formControlLg' type='email' size="lg" onChange={e=>setEmail(e.target.value)}/>
            <MDBInput wrapperClass='mb-4 mx-5 w-100' label='Password' id='formControlLg1' type='password' size="lg" onChange={e=>setPassword(e.target.value)}/>

            <Button type='submint' onClick={handleSubmit} className="mb-4 px-5 mx-5 w-100" color='info' size='lg'>Login</Button>
            {error && <p className='ms-5 trouble'>Incorrect email or password</p>}
            <p className="small mb-5 pb-lg-3 ms-5"><a class="text-muted" href="#!">Forgot password?</a></p>
            <p className='ms-5'>Don't have an account? <a href="#!" class="link-info">Register here</a></p>

          </div>

        </MDBCol>

        <MDBCol sm='6' className='d-none d-sm-block px-0'>
          <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img3.webp"
            alt="Login" className="w-100" style={{objectFit: 'cover', objectPosition: 'left'}} />
        </MDBCol>

      </MDBRow>

    </MDBContainer>
    </div>
  )
}

export default LoginPage