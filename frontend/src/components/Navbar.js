import React, { Fragment, useState} from 'react';
import { Link, Navigate } from 'react-router-dom'
import { connect } from 'react-redux';
import { logout } from '../actions/auth';

const Navbar = ({ logout,isAuthenticated }) => {
    const [redirect, setRedirect] = useState(false);

    const logout_user = () => {
        logout();
        setRedirect(true);
    };

    const guestLink = () =>(
        <Fragment>
            <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/signup">Sign up</Link>
            </li>
        </Fragment>
    );

    const AuthLink = () =>(
        <li className="nav-item">
            <Link className="nav-link" href="#!" onClick={logout}>logout</Link>
        </li>
    );

    

    return (
        <Fragment>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link className="navbar-brand" to="/">Auth System</Link>
                <button 
                    className="navbar-toggler" 
                    type="button" 
                    data-toggle="collapse" 
                    data-target="#navbarNav" 
                    aria-controls="navbarNav" 
                    aria-expanded="false" 
                    aria-label="Toggle navigation"
                    >

                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                    </li>
                    {isAuthenticated ? AuthLink() : guestLink()}
                    </ul>
                </div>
            </nav>
            {redirect ? <Navigate to='/' /> : <Fragment></Fragment>}
        </Fragment>
    )
};

const mapStateToProps = state =>({
    isAuthenticated: state.auth.isAuthenticated
});
 
export default connect(mapStateToProps,{logout})(Navbar);