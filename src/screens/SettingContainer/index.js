import './SettingContainer.scss';
import {Header} from '../../components/Header';
import {ListContentSetting} from '../../contants/ContentTitle';
import React, {useEffect, useState} from 'react';
import {Input, Select, Button,Form} from 'antd';
import {changePassword, createPost, getDataWithToken, pushVote, updateProfile} from "../../services/HandleData";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import {ValidationUpdateInfo} from "../../components/Validate";
import {useNavigate} from "react-router-dom";



export const SettingContainer = () =>{
    const [userOption,setUserOption] = useState('ACCOUNT');
    const [confirmPassword,setConfirmPassword] = useState()

    const [dataUpdate,setDataUpdate] = useState()
    const navigate = useNavigate()
    useEffect(()=>{
            const fetchInfo = async ()=>{
                const path = '/user/getInfo';
                const res = await getDataWithToken(path);
                setDataUpdate(res?.data?.result);
            }
            fetchInfo()
    },[])
    const [password,setPassword] = useState({
        id:localStorage.getItem("userId"),
        oldPassword:dataUpdate?.password,
        newPassword:'',
    })
    console.log("dataUpdate",dataUpdate)
    const [valueSetting,setValueSetting] = useState({
        gender:'man',
        phoneNumber: null,
        email:dataUpdate?.email,
        id:dataUpdate?.id,
    });
    // console.log(dataUpdate)
    const {
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm({
        mode: "onSubmit",
        reValidateMode: "onSubmit",
        resolver: yupResolver(ValidationUpdateInfo),
    });
    useEffect(() => {
        if (dataUpdate) {
            reset({
                email: dataUpdate?.email,
                gender: dataUpdate?.gender,
                phone: dataUpdate?.phoneNumber,
            });
        }
    }, [dataUpdate]);
    const onSubmit = async (data) => {
        setValueSetting({
            gender:data.gender,
            email:data.email,
            phoneNumber:data.phone,
            id:dataUpdate?.id,
        })
        const formData = new FormData();
        formData.append("request", valueSetting);
        try {
            const path = "/user/profile/update";
            const response = await updateProfile(path, formData);
            if (response.data.statusCode === 201) {
                reset();
                navigate("/");
            }
        } catch (error) {
            alert(error.response.message);
        }
    };
    const handleChangePassword = (e,type) =>{
        if(type === 'old'){
            return setPassword({...password, oldPassword: e.target.value,})
        }
        if(type === 'new'){
            return setPassword({...password, newPassword: e.target.value,})
        }
        return setConfirmPassword(e.target.value)
    }
    const onPassword = async ()=>{
        if(password?.newPassword === confirmPassword){
            try {
               const path = '/user/changePassword'
               await changePassword(path,password)
               navigate('/')
            } catch (erorr) {
                alert(erorr.response.data.message);
            }
        }
        return alert('mật khẩu nhập lại không khớp')
    }
    return(
        <div className='settingContainer'>
            <Header />
            <div className='navbarSetting'>
                <div>
                    {ListContentSetting?.map((item,index)=>{
                        return(
                            <p className={userOption === item.label?'activeSetting':'contentSetting'}
                                key={index} onClick={()=>setUserOption(item.label)}>
                                {item.label}
                            </p>
                        );
                    })}
                </div>
            </div>
            {userOption === 'ACCOUNT' && <Form className='wrapSetting' onFinish={handleSubmit(onSubmit)}>
                <div className='itemSetting'>
                    <h1 className='titleSetting'>Account settings</h1>
                    <p className='accountPre'>Account preferences</p>
                </div>
                <div className='itemGender'>
                    <h1 className='titleGender'>
                        gender
                    </h1>
                    <Controller
                        name="gender"
                        control={control}
                        render={({field}) => (
                            <Select
                                className='selectGender'
                                placeholder='gender'
                                {...field}
                                options={[
                                    {
                                        value: 'man',
                                        label: 'MAN',
                                    },
                                    {
                                        value: 'woman',
                                        label: 'WOMAN',
                                    },
                                    {
                                        value: 'other',
                                        label: 'OTHER',
                                    },
                                ]}
                            />
                        )}
                    />
                </div>
                <div className='itemEmail'>
                    <h1 className='titleEmail'>
                        Email address
                    </h1>
                    <Controller
                        control={control}
                        name="email"
                        render={({field}) => (
                            <Input
                                className='inputEmailSetting'
                                {...field}
                                placeholder="Enter title"
                                status={errors.email && "error"}
                            />
                        )}
                    />
                </div>
                <div className='itemPassword'>
                    <h1 className='titlePassword'>
                        Phone Number
                    </h1>
                    <div>
                        <Controller
                            control={control}
                            name="phone"
                            render={({field}) => (
                                <Input
                                    className='inputPasswordSetting'
                                    {...field}
                                    placeholder="Enter phone"
                                    status={errors.email && "error"}
                                />
                            )}
                        />
                    </div>
                </div>

                <div className='itemDelete'>
                    <Button className='btnDeleteSetting' danger={true} onClick={()=>navigate('/')}>
                        Cancel
                    </Button>
                    <Button className='btnDeleteSetting' type={"primary"} htmlType="submit">
                        Update
                    </Button>
                </div>
            </Form>}
            { userOption === 'SECURITY' &&
                (
                    <div className='wrapSetting' onFinish={handleSubmit(onSubmit)}>
                        <div className='itemSetting'>
                            <h1 className='titleSetting'>security settings</h1>
                            <p className='accountPre'>SECURITY preferences</p>
                        </div>
                        <div className='itemPasswords'>
                            <h1 className='titlePassword'>
                                Password
                            </h1>
                            <div className='wrap-password'>
                                <Input
                                    onChange = {(e)=>handleChangePassword(e,'old')}
                                    // value={dataUpdate?.password}
                                    className='inputPasswordSetting'
                                    placeholder="Enter your old password"
                                />
                                <Input
                                    onChange = {(e)=>handleChangePassword(e,'new')}
                                    className='inputPasswordSetting'
                                    placeholder="Enternew your new password"
                                />
                                <Input
                                    onChange = {(e)=>handleChangePassword(e,"confirm")}
                                    className='inputPasswordSetting'
                                    placeholder="Enter your confirm password"
                                />

                            </div>
                        </div>
                        <div className='itemDelete'>
                            <Button className='btnDeleteSetting' danger={true} onClick={()=>navigate('/')}>
                                Cancel
                            </Button>
                            <Button className='btnDeleteSetting' type={"primary"} onClick={onPassword}>
                                Change
                            </Button>
                            <Button className='btnDeleteSetting' danger={true}>
                                Delete Account
                            </Button>
                        </div>
                    </div>

                )
            }

        </div>
    );
};