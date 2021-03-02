import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout.js';
import Card from '../../components/UI/Card/Card.js';
import { signup } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { storage } from "../../index";
import FileField from '../../components/FileField.js';

/**
* @author
* @function RegisterPage
**/

const RegisterPage = (props) => {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  
  const [file, setFile] = useState("");
  const [url, setURL] = useState("");

  const allInputs = {imgUrl: ''}
  const [imageAsFile, setImageAsFile] = useState('')
  const [imageAsUrl, setImageAsUrl] = useState(allInputs)
  const [image, setImage] = useState(null);
  
  const registerUser = (e) => {
    
    e.preventDefault();

    const user = {
      firstName, lastName, email, password, image
    }

    const uploadTask = storage.ref(`/images/${file.name}`).put(file);
    uploadTask.on("state_changed", console.log, console.error, () => {
      storage
        .ref("images")
        .child(file.name)
        .getDownloadURL()
        .then((url) => {
          setFile(null);
          setURL(url);
          
        });
    });
    
    dispatch(signup(user))
  }

  function handleChange(e) {
    setFile(e.target.files[0]);
  }

 
  // function handleUpload(e) {
  //   e.preventDefault();
  //   const uploadTask = storage.ref(`/images/${file.name}`).put(file);
  //   uploadTask.on("state_changed", console.log, console.error, () => {
  //     storage
  //       .ref("images")
  //       .child(file.name)
  //       .getDownloadURL()
  //       .then((url) => {
  //         setFile(null);
  //         setURL(url);
  //       });
  //   });
  // }


  if(auth.authenticated){
    return <Redirect to={`/`} />
  }
  
  return(
    <Layout>
      <div className="registerContainer">
        <Card>
          <form onSubmit={registerUser}>

            <h3>Sign up</h3>

          <input 
              name="firstName"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
            />

            <input 
              name="lastName"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
            />

            
            <input 
              name="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />

            <input 
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />

            <div className = "image-wrapper">
              <img src='' alt="Profile photo - " className="profile-image"/>
              <input type="file" id="imageInput" onChange={handleChange} value={image}/>
            </div>

            <div>
              <button>Sign up</button>
            </div>

          </form>
        </Card>
      </div>
    </Layout>
   )

 }

export default RegisterPage