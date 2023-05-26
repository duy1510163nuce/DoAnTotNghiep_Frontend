import {Button, Form, Input} from 'antd';
import {Controller, useForm} from 'react-hook-form';
import {Link} from 'react-router-dom';
import React, {useState,useEffect} from 'react';
import {yupResolver} from '@hookform/resolvers/yup';
import {ValidationLogin} from '../../components/Validate';
import { useNavigate } from 'react-router-dom';
import { pushData} from '../../services/HandleData';
import './LoginContainer.css';
import {pathApi} from '../../services/API';
import Cookies from 'universal-cookie';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFacebook, faTwitter} from "@fortawesome/free-brands-svg-icons";

export const LoginContainer = () =>{
    const [infoLogin,setInfoLogin] = useState();
    const [errorLogin,setErrorLogin] = useState(false);
    const navigate = useNavigate();
    const cookies = new Cookies();
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
        resolver: yupResolver(ValidationLogin),
    });
    const onSubmit = (data) => {
        setInfoLogin({
            username:data.username,
            password:data.password
        });
    };
    useEffect(() => {
        const postDataLogin = async () => {
            try {
                const path = pathApi.login;
                const res =  await pushData(path, infoLogin);
                cookies.set('accessToken', res.data.result.accessToken, { path: '/' });
                cookies.set('userId', res.data.result.userDTO.id, { path: '/' });
                // localStorage.setItem('accessToken', res.data.result.accessToken);
                // localStorage.setItem('userId', res.data.result.userDTO.id);
                navigate('/');
            }catch (error){
                alert(error.response.data.message);
                setErrorLogin(true);
            }
        };
        if(infoLogin){
            postDataLogin();
        }
    }, [infoLogin]);
    return(
        <body>
        <div className="box-form">
            <div className="leftLogin">
                <div className="overlay">
                    <h1>Question & Answer</h1>
                    <p>Welcome to our website <br/>
                        Wish you have a pleasant experience</p>
                    <span>
			            <p>login with social media</p>
                        <div className='loginBtnWrap'>
                            <Button className='btnLogin'><FontAwesomeIcon icon={faFacebook} className="fa fa-facebook" ></FontAwesomeIcon >Facebook</Button>
                            <Button className='btnLogin'><FontAwesomeIcon icon={faTwitter} className="fa fa-facebook" ></FontAwesomeIcon >Twitter</Button>
                        </div>
		            </span>
                </div>
            </div>
            <div className="rightLogin">
                <h5>Login</h5>
                <Form onFinish={handleSubmit(onSubmit)}>
                                 <Controller
                                    control={control}
                                    name="username"
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            placeholder="Enter your username"
                                            className="input"
                                            status={(errors.email || errorLogin) && 'error'}
                                        />
                                    )}
                                />
                                <Controller
                                    control={control}
                                    name="password"
                                    render={({ field }) => (
                                        <Input.Password
                                            {...field}
                                            placeholder="Enter your password"
                                            className="input"
                                            status={(errors.email || errorLogin) && 'error'}
                                        />
                                    )}
                                />
                                <Button htmlType="submit" className="btnLogin" type="primary">
                                    Log In
                                </Button>
                            </Form>
                    <div className="remember-me--forget-password">
                        <p>Don't have an account?
                            <span className='linkLogin' onClick={()=>navigate('/register')}>
                                Create Your Account<br/>
                            </span>
                                it takes less than a minute
                        </p>
                    </div>
            </div>

        </div>
        </body>
    );
};