import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Navigate } from 'react-router-dom'
import { login } from '../actions/auth';
import axios from 'axios';

import {
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBRow,
    MDBCol,
    MDBInput,
    MDBCheckbox,
    MDBIcon
  }
  from 'mdb-react-ui-kit';

const Login = ({ login, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        email:'',
        password:''
    });

    const { email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

    const onSubmit = e =>{
        e.preventDefault();
        login(email, password);
    };

    const continueWithGoogle = async ()=>{
        try{
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/o/google-oauth2/?redirect_uri=${process.env.REACT_APP_API_URL}/google`)
            window.location.replace(res.data.authorization_url);
        }catch{

        }
    };

    const continueWithFacebook = async ()=>{
        try{
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/o/facebook/?redirect_uri=${process.env.REACT_APP_API_URL}/facebook`)
            window.location.replace(res.data.authorization_url);
        }catch{

        }
    };


    if(isAuthenticated){
        return <Navigate to='/' />
    }
    return(
        <div className='container mt-5'>
            {/* <h1>Sign In</h1>
            <p>Sign into your Account</p>
            <form onSubmit={e => onSubmit(e)}>
                <div className='form-group'>
                    <input
                        className='form-control'
                        type='email'
                        placeholder='Email'
                        name='email'
                        value={email}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div className='form-group'>
                    <input
                        className='form-control'
                        type='password'
                        placeholder='Password'
                        name='password'
                        value={password}
                        onChange={e => onChange(e)}
                        minLength='6'
                        required
                    />
                </div>
                <button className='btn btn-primary' type='submit'>Login</button>
            </form>
            <button className='btn btn-danger mt-3' onClick={continueWithGoogle}>
                Continue With Google
            </button>
            <br />
            <button className='btn btn-primary mt-3' onClick={continueWithFacebook}>
                Continue With Facebook
            </button>
            <p className='mt-3'>
                Don't have an account? <Link to='/signup'>Sign Up</Link>
            </p>
            <p className='mt-3'>
                Forgot your Password? <Link to='/reset-password'>Reset Password</Link>
            </p> */}
            <div>
            <MDBContainer className='my-5'>
                <MDBCard>

                    <MDBRow className='g-0 d-flex align-items-center'>

                    <MDBCol md='4'>
                        <MDBCardImage src='https://mdbootstrap.com/img/new/ecommerce/vertical/004.jpg' alt='phone' className='rounded-t-5 rounded-tr-lg-0' fluid />
                    </MDBCol>

                    <MDBCol md='8'>

                        <MDBCardBody>
                        <form onSubmit={e => onSubmit(e)}>
                        <MDBInput wrapperClass='mb-4' label='Email address' id='form1' type='email'
                            name='email'
                            value={email}
                            onChange={e => onChange(e)}
                            required/>
                        <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password'
                            name='password'
                            value={password}
                            onChange={e => onChange(e)}
                            minLength='6'
                            required/>

                        {/* <div className="d-flex justify-content-between mx-4 mb-4"> */}
                            <p className='mt-3'>
                                Don't have an account? <Link to='/signup'>Sign Up</Link>
                            </p>    
                            {/* <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' /> */}
                            {/* <a href="!#">Forgot password?</a> */}
                            <p className='mt-3'>
                                Forgot your Password? <Link to='/reset-password'>Reset Password</Link>
                            </p>
                        {/* </div> */}

                        <MDBBtn className="mb-4 w-100" type='submit'>Sign in</MDBBtn>
                        </form>
                        </MDBCardBody>
                        <div className="text-center">
                        <p>or sign up with:</p>

                        <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }} onClick={continueWithFacebook}>
                            <MDBIcon fab icon='facebook-f' size="sm"/>
                        </MDBBtn>

                        <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                            <MDBIcon fab icon='twitter' size="sm"/>
                        </MDBBtn>

                        <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }} onClick={continueWithGoogle}>
                            <MDBIcon fab icon='google' size="sm"/>
                        </MDBBtn>

                        <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                            <MDBIcon fab icon='github' size="sm"/>
                        </MDBBtn>
                        </div>
                    </MDBCol>

                    </MDBRow>

                </MDBCard>
                </MDBContainer>
            </div>
        </div>
    );
};

const mapStateToProps = state =>({
    isAuthenticated: state.auth.isAuthenticated
});
 
export default connect(mapStateToProps,{login})(Login);