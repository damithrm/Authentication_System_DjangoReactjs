import React,{useEffect} from 'react';
import { Link, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { googleAuthenticate } from '../actions/auth';
import queryString from 'query-string';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn, MDBTypography } from 'mdb-react-ui-kit';


const Google = ({googleAuthenticate, isAuthenticated, userEmail, userFirstName, userLastName}) => {
    let location = useLocation();

    useEffect(()=>{
        const values = queryString.parse(location.search);
        const state = values.state ? values.state : null;
        const code = values.code ? values.code : null;

        console.log('State' + state);
        console.log('Code' + code);

        if (state && code) {
            googleAuthenticate(state, code);
        }

        
    },[location]);

    return(
        <div>

        {isAuthenticated?(<div className="gradient-custom-2" >
            <MDBContainer className="py-5 h-100">
                <MDBRow className="justify-content-center align-items-center h-100">
                <MDBCol lg="9" xl="7">
                    <MDBCard>
                    <div className="rounded-top text-white d-flex flex-row" style={{ backgroundColor: '#000', height: '200px' }}>
                        <div className="ms-4 mt-5 d-flex flex-column" style={{ width: '150px' }}>
                        <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
                            alt="Generic placeholder image" className="mt-4 mb-2 img-thumbnail" fluid style={{ width: '150px', zIndex: '1' }} />
                        <MDBBtn outline color="dark" style={{height: '36px', overflow: 'visible'}}>
                            Edit profile
                        </MDBBtn>
                        </div>
                        <div className="ms-3" style={{ marginTop: '130px' }}>
                        <MDBTypography tag="h5">{userFirstName} {userLastName} </MDBTypography>
                        <MDBCardText>New York</MDBCardText>
                        </div>
                    </div>
                    <div className="p-4 text-black" style={{ backgroundColor: '#f8f9fa' }}>
                        <div className="d-flex justify-content-end text-center py-1">
                        <div>
                            <MDBCardText className="mb-1 h5">253</MDBCardText>
                            <MDBCardText className="small text-muted mb-0">Photos</MDBCardText>
                        </div>
                        <div className="px-3">
                            <MDBCardText className="mb-1 h5">1026</MDBCardText>
                            <MDBCardText className="small text-muted mb-0">Followers</MDBCardText>
                        </div>
                        <div>
                            <MDBCardText className="mb-1 h5">478</MDBCardText>
                            <MDBCardText className="small text-muted mb-0">Following</MDBCardText>
                        </div>
                        </div>
                    </div>
                    <MDBCardBody className="text-black p-4">
                        <div className="mb-5">
                        <p className="lead fw-normal mb-1">Email</p>
                        <div className="p-4" style={{ backgroundColor: '#f8f9fa' }}>
                            <MDBCardText className="font-italic mb-1">{userEmail}</MDBCardText>
                        </div>
                        </div>
                    </MDBCardBody>
                    </MDBCard>
                </MDBCol>
                </MDBRow>
            </MDBContainer>
            </div>
            ):(
            <div className='container'>
                <div className='jumbotron '>
                    <h1 className='display-4'>Welcome</h1>
                    <hr className='my-4' />
                    <Link className='btn btn-primary btn-lg' to='/login' role='button'>Login</Link>
                    <h1></h1>
                </div>
            </div>)}


        </div>
    );
};

const mapStateToProps = state =>({
    isAuthenticated: state.auth.isAuthenticated,
    userEmail: state.auth.userEmail,
    userFirstName: state.auth.userFirstName,
    userLastName: state.auth.userLastName,
    
});
 
export default connect(mapStateToProps,{ googleAuthenticate })(Google);