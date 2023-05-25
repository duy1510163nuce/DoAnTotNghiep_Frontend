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
        <div className="wrapLogin">
            <div className="loginContainer">
                <h1 className="title">Vui lòng đăng nhập:</h1>
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
                <div className="footer">
                    <span>Already have an account ? </span>
                    <Link to="/register">Sign up</Link>
                </div>

            </div>
        </div>
    );
};