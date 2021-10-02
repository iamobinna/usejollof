import React, { useState, useEffect } from "react";
import {useRef} from 'react';
import "./styles/styles.css";
import signinIllustration from "../../static/svgs/signin.svg";
import TextField from '@mui/material/TextField'
// import {useDispatch} from 'react-redux';
// import {useHistory, Redirect} from 'react-router-dom';
import MovieIcon from '@mui/icons-material/Movie';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import avatar from '../../static/images/avatar.jpg';
import Alert from "@mui/material/Alert";
import { openInAppLink } from "../../services/openLinks";

const Index = () => {
    const [signUp, setSignUp] = useState(false);
    const [alert, setAlert] = useState(null);
    const [credentials, setCredentials] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [error, setError] = useState(false);
    const [profileImage, setProfileImage] = useState(null);

    const imageRef = useRef(null);

    const handleClick = () => {
        imageRef.current.click();
    }

    const imageHandler = (e) => {
        if(e.target.files[0])
        {
            const reader = new FileReader();
            reader.onload = () => {
                if(reader.readyState === 2){
                    setProfileImage(reader.result);
                }
            }
            reader.readAsDataURL(e.target.files[0]);
        }
    }

    const submitHandler = (e) => {
        e.preventDefault();
        if(credentials.email === 'vendor@vendor.com')
        {
            openInAppLink('/vendor/:id');
        }
        else
        {
            openInAppLink('/user/:id');
        }
    }

    return (
        <div className="signin-container">
            <div className="alert-container">
                {alert && (
                    <Alert severity="warning" style={{ marginBottom: "20px" }}>
                        {alert && alert}
                    </Alert>
                )}
                <div className="signin">
                    <div className="col1-container">
                        <div className="col1-bg"></div>
                        <div className={`circle ${signUp && "circle-2"}`}></div>
                        <div className="col1">
                            <div className="logo">
                                We-Video{" "}
                                <MovieIcon style={{ fontSize: "30px" }} />{" "}
                            </div>
                            <img src={signinIllustration} alt="" />
                            <p>Where the world meets, to inspire!</p>
                        </div>
                    </div>
                    <div className="col2-container">
                        <form className="col2" onSubmit={submitHandler} >
                            <div className="heading">
                                <h2>{signUp ? "Register" : "Login"}</h2>
                                <h4>For an amazing experience!</h4>
                            </div>
                            <div className="inputs">
                                {signUp && (
                                    <>
                                        <div className="image-uploader" onClick={() => handleClick()}>
                                    <img src={ profileImage? profileImage : avatar} alt='' />
                                    <div className='info' >
                                        <PhotoCameraIcon/> 
                                        <span>upload image</span>
                                    </div>
                                    <input ref={imageRef} onChange={imageHandler} type="file"rea name="" id="" accept="image/*" />
                                </div>
                                        <TextField
                                            required
                                            value={credentials.name}
                                            onChange={(e) =>
                                                setCredentials({
                                                    ...credentials,
                                                    name: e.target.value,
                                                })
                                            }
                                            size="small"
                                            inputProps={{
                                                style: { fontSize: 13 },
                                            }}
                                            InputLabelProps={{
                                                style: { fontSize: 13 },
                                            }}
                                            label="Name"
                                            variant="outlined"
                                        />
                                    </>
                                )}
                                <TextField
                                    required
                                    size="small"
                                    value={credentials.email}
                                    onChange={(e) =>
                                        setCredentials({
                                            ...credentials,
                                            email: e.target.value,
                                        })
                                    }
                                    inputProps={{ style: { fontSize: 13 } }}
                                    InputLabelProps={{
                                        style: { fontSize: 13 },
                                    }}
                                    label="E-mail"
                                    type="email"
                                    variant="outlined"
                                />
                                <TextField
                                    value={credentials.password}
                                    helperText={
                                        error &&
                                        "Passowrd must be 8 letters or longer"
                                    }
                                    onChange={(e) => {
                                        setError(false);
                                        setCredentials({
                                            ...credentials,
                                            password: e.target.value,
                                        });
                                    }}
                                    required
                                    size="small"
                                    inputProps={{ style: { fontSize: 13 } }}
                                    InputLabelProps={{
                                        style: { fontSize: 13 },
                                    }}
                                    label="Password"
                                    type="password"
                                    variant="outlined"
                                />
                            </div>
                            <div className="btn">
                                <button type="submit">
                                    {signUp ? "SIGN UP" : "LOG IN"}
                                </button>
                                <h6 onClick={() => setSignUp(!signUp)}>
                                    {signUp
                                        ? "Have an account?"
                                        : "Make an account?"}
                                </h6>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Index;
