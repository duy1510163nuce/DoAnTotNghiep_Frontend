
import React, {useEffect, useState} from 'react';
import {Form, Button, Input } from 'antd';
import {Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {ValidationRegister} from '../../components/Validate';
import './RegisterContainer.css';
import {Link,useNavigate} from 'react-router-dom';
import {pushData} from '../../services/HandleData';
import {pathApi} from '../../services/API';

export  const RegisterContainer = () =>{
    const [infoUser, setInfoUser] = useState();
    const [checkPassword, setCheckPassword] = useState(false);
    // const [checkCallApi, setCheckCallApi] = useState(false);
    const navigate = useNavigate();
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
        resolver: yupResolver(ValidationRegister),
    });
    const onSubmit = (data) =>{
        if (data.password === data.confirmPassword) {
            setInfoUser({
                username: data.name,
                password: data.password,
                email: data.email,
            });
        } else {
            setCheckPassword(true);
        }
    };
    useEffect(() => {
        const postData = async () => {
            try {
                const path = pathApi.register;
                const response =  await pushData(path, infoUser);
                navigate('/login');
                setInfoUser();
            }catch (error){
                alert(error.response.data.message);
            }
        };
        if (infoUser){
            postData();
        }

    }, [infoUser]);
    return(
        <div className="wrapRegister">
            <div className="registerContainer">
                <h1 className="title">Vui lòng đăng kí theo các bước sau:</h1>
                <Form onFinish={handleSubmit(onSubmit)}>
                    <Controller
                        control={control}
                        name="name"
                        className="marginBottom"
                        render={({ field }) => (
                            <Input
                                {...field}
                                placeholder="Enter your full name"
                                className="input"
                                status={errors.name && 'error'}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="email"
                        className="marginBottom"
                        render={({ field }) => (
                            <Input
                                {...field}
                                placeholder="Enter your email"
                                className="input"
                                status={errors.email && 'error'}
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
                                status={(errors.password || checkPassword) && 'error'}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <Input.Password
                                {...field}
                                placeholder="confirm password"
                                className="input"
                                status={(errors.password || checkPassword) && 'error'}
                            />
                        )}
                    />
                    <Button htmlType="submit" type="primary" className="btnRegis">
                        Register
                    </Button>
                </Form>
                <div className="footer">
                    <span>Already have an account ? </span>
                    <Link to="/login">Sign In</Link>
                </div>

            </div>
        </div>

    );
};