import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom'
import { verify } from '../actions/auth';
import { useParams } from 'react-router-dom';

const Activate = ({ verify }) => {
    const [verifyed, setVerifyed] = useState(false);

    const {uid} = useParams();
    const {token} = useParams();

    const verify_account = e =>{
        verify(uid, token);
        setVerifyed(true);
    };

    if(verifyed){
        return <Navigate to='/' />
    }
    return(
        <div className='container mt-5'>
            <div 
                className='d-flex flex-column justify-content-center align-items-center'
                style={{ marginTop: '200px' }}
            >
                    <h>Verify your Account:</h>
                    <button
                        onClick={verify_account}
                        style={{ marginTop: '50px' }}
                        type='button'
                        className='btn btn-primary'
                     >
                        verify
                    </button>   
                </div>
        </div>
    );
};

 
export default connect(null,{ verify })(Activate);