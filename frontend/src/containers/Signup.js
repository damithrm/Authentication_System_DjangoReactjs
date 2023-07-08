import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Navigate } from 'react-router-dom'
import { signup } from '../actions/auth';
import axios from 'axios';

import {
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBIcon,
    MDBRow,
    MDBCol,
    MDBCheckbox
  }
  from 'mdb-react-ui-kit';

const Signup = ({ signup, isAuthenticated }) => {
    const [accountCreate , setAccountCreate] = useState(false);
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email:'',
        password:'',
        re_password:''
    });
    console.log("kee");

    const { first_name, last_name, email, password, re_password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

    const onSubmit = e =>{
        e.preventDefault();

        if (password === re_password){
            signup(first_name, last_name, email, password, re_password);
            setAccountCreate(true);
        }
    };

    const continueWithGoogle = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/o/google-oauth2/?redirect_uri=${process.env.REACT_APP_API_URL}/google`)

            window.location.replace(res.data.authorization_url);
        } catch (err) {

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
    if(accountCreate){
        return <Navigate to='/login' />
    }
    return(
        <div className='container mt-5'>
            {/* <h1>Sign Up</h1>
            <p>Create your Account</p>
            <form onSubmit={e => onSubmit(e)}>
            <div className='form-group'>
                    <input
                        className='form-control'
                        type='text'
                        placeholder='First Name*'
                        name='first_name'
                        value={first_name}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div className='form-group'>
                    <input
                        className='form-control'
                        type='text'
                        placeholder='Last Name*'
                        name='last_name'
                        value={last_name}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div className='form-group'>
                    <input
                        className='form-control'
                        type='email'
                        placeholder='Email*'
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
                        placeholder='Password*'
                        name='password'
                        value={password}
                        onChange={e => onChange(e)}
                        minLength='6'
                        required
                    />
                </div>
                <div className='form-group'>
                    <input
                        className='form-control'
                        type='password'
                        placeholder='Confirm Password*'
                        name='re_password'
                        value={re_password}
                        onChange={e => onChange(e)}
                        minLength='6'
                        required
                    />
                </div>
                <button className='btn btn-primary' type='submit'>Register</button>
            </form>
            <button className='btn btn-danger mt-3' onClick={continueWithGoogle}>
                Continue With Google
            </button>
            <br />
            <button className='btn btn-primary mt-3' onClick={continueWithFacebook}>
                Continue With Facebook
            </button>
            <p className='mt-3'>
                Alredy have an account? <Link to='/login'>Sign In</Link>
            </p> */}


            <div>
            <MDBContainer fluid className='my-5'>

                <MDBRow className='g-0 align-items-center'>
                <MDBCol col='6'>

                    <MDBCard className='my-5 cascading-right' style={{background: 'hsla(0, 0%, 100%, 0.55)',  backdropFilter: 'blur(30px)'}}>
                    <MDBCardBody className='p-5 shadow-5 text-center'>

                        <h2 className="fw-bold mb-5">Sign up now</h2>
                        <form onSubmit={e => onSubmit(e)}>
                        <MDBRow>
                        <MDBCol col='6'>
                            <MDBInput wrapperClass='mb-4' label='First name' id='form1' type='text' 
                                name='first_name'
                                value={first_name}
                                onChange={e => onChange(e)}
                                required/>
                        </MDBCol>

                        <MDBCol col='6'>
                            <MDBInput wrapperClass='mb-4' label='Last name' id='form2' type='text'
                                name='last_name'
                                value={last_name}
                                onChange={e => onChange(e)}
                                required/>
                        </MDBCol>
                        </MDBRow>

                        <MDBInput wrapperClass='mb-4' label='Email' id='form3' type='email'
                            name='email'
                            value={email}
                            onChange={e => onChange(e)}
                            required/>
                        <MDBInput wrapperClass='mb-4' label='Password' id='form4' type='password'
                            name='password'
                            value={password}
                            onChange={e => onChange(e)}
                            minLength='6'
                            required/>
                        <MDBInput wrapperClass='mb-4' label='Password' id='form5' type='password'
                            name='re_password'
                            value={re_password}
                            onChange={e => onChange(e)}
                            minLength='6'
                            required/>

                        <div className='d-flex justify-content-center mb-4'>
                        <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Subscribe to our newsletter' />
                        </div>

                        <MDBBtn className='w-100 mb-4' type='submit' size='md' >sign up</MDBBtn>
                        </form>
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
                        <p className='mt-3'>
                            Alredy have an account? <Link to='/login'>Sign In</Link>
                        </p>

                        </div>

                    </MDBCardBody>
                    </MDBCard>
                </MDBCol>

                <MDBCol col='6'>
                    <img src="https://mdbootstrap.com/img/new/ecommerce/vertical/004.jpg" className="w-100 rounded-4 shadow-4"
                    alt="" fluid/>
                </MDBCol>

                </MDBRow>

                </MDBContainer>

            </div>
        </div>
    );
};

const mapStateToProps = state =>({
    isAuthenticated: state.auth.isAuthenticated
});
 
export default connect(mapStateToProps, {signup})(Signup);