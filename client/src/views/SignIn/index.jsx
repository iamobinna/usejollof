import React, { useState} from "react";
import {useRef} from 'react';
import "./styles/styles.css";
import signinIllustration from "../../static/svgs/signin.svg";
import TextField from '@mui/material/TextField'
import { signUp, signIn } from "../../services/axios/account";
import FoodBankIcon from '@mui/icons-material/FoodBank';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import avatar from '../../static/images/avatar.jpg';
import Alert from "@mui/material/Alert";
import { Redirect } from "react-router-dom";

const Index = () => {

    const [userType, setUserType] = useState(JSON.parse(localStorage.getItem('userData'))?.user?.type);

    if(userType)
    {
        <Redirect to='/' />
    }

    const [_signUp, setSignUp] = useState(false);
    const [alert, setAlert] = useState(null);
    const [credentials, setCredentials] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState(false);
    const [profileImage, setProfileImage] = useState(null);
    const [sendProfileImage, setSendProfileImage] = useState(null);

    const imageRef = useRef(null);

    const handleClick = () => {
        imageRef.current.click();
    }

    const imageHandler = (e) => {
        if(e.target.files[0])
        {
            setSendProfileImage(e.target.files[0]);
            const reader = new FileReader();
            reader.onload = () => {
                if(reader.readyState === 2){
                    setProfileImage(reader.result);
                }
            }
            reader.readAsDataURL(e.target.files[0]);
        }
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        if(_signUp)
        {
            const fd = new FormData();
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + '-' + sendProfileImage.name;
            fd.append('name', uniqueSuffix);
            fd.append('image', sendProfileImage);
            fd.append('user', credentials.name);
            fd.append('email', credentials.email);
            fd.append('password', credentials.password);
            const data = await signUp(fd);
            if(data){
                setUserType('user');
            }else{
                setAlert('There was some problem in connection');
            }
        }
        else{
            const data = await signIn(credentials);
            if(data)
            {
                setUserType('user');
            }else{
                setAlert('Make sure your credentials are correct')
            }
        }
    }

    if(userType){
        return(
            <Redirect to='/' />
        )
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
                        <div className={`circle ${_signUp && "circle-2"}`}></div>
                        <div className="col1">
                            <div className="logo">
                                We-Deliver<FoodBankIcon style={{ fontSize: "30px" }} />{" "}
                            </div>
                            <img src={signinIllustration} alt="" />
                            <p>Where the world meets, to inspire!</p>
                        </div>
                    </div>
                    <div className="col2-container">
                        <form className="col2" onSubmit={submitHandler} >
                            <div className="heading">
                                <h2>{_signUp ? "Register" : "Login"}</h2>
                                <h4>For an amazing experience!</h4>
                            </div>
                            <div className="inputs">
                                {_signUp && (
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
                                    {_signUp ? "SIGN UP" : "LOG IN"}
                                </button>
                                <h6 onClick={() => setSignUp(!_signUp)}>
                                    {_signUp
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
