import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './style.css';

const ProfilePage = (props) => {
    const auth = useSelector(state => state.auth);
    const {user, onClick} = props;

    return (

        <div style={{margin: '20px 0', color: 'black', fontWeight: 'bold'}}>
            <h1>Profile Page</h1>
            <h1>First Name - {auth.firstName}</h1>
            <h1>Last Name - {auth.lastName}</h1>
            <h1>Email - {auth.email}</h1>
            
            {/* {auth.authenticated ? `${auth.firstName} ${auth.lastName}` : ''} */}
        </div>
    )
}
export default ProfilePage;