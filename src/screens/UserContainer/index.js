import {Header} from '../../components/Header';
import {ListContentUser, ListFilterUser} from '../../contants/ContentTitle';
import React, {useEffect, useState} from 'react';
import './UserContainer.scss';
import {PostDetailHome} from '../../components/PostDetailHome';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    faCameraRetro,
    faEnvelope,
    faPersonHalfDress,
    faPhoneVolume,
    faUserPen
} from '@fortawesome/free-solid-svg-icons';
import {useNavigate, useParams} from "react-router-dom";
import {getData, getDataWithToken, updateProfile} from "../../services/HandleData";

export const UserContainer = ()=>{
    const [userOption,setUserOption] = useState('POSTS');
    const [filterOption,setFilterOption] = useState('NEW');
    const valueUser = useParams()
    const [checked,setchecked] = useState(valueUser.idUser === 'true')
    const [infoProfile,setInfoProfile] = useState()
    const [listPostProfile,setListPostProfile] = useState()
    const [filePicture, setFilePicture] = useState("");
    const [picture, setPicture] = useState("");
    const [imgData, setImgData] = useState("");
    const [infoPerson,setInfoPerson] = useState()

    const formData = new FormData();
    const navigate = useNavigate()
    const [request,setRequest] = useState({
        id:localStorage.getItem('userId'),
        phoneNumber:'',
        email:'',
        fullName:'',
        gender:'',
    })
    useEffect(()=>{
        if(checked){
            const userID = localStorage.getItem('userId')
           const fetchProfile = async ()=>{
                const path = `/user/profile/getOverallInfo/${userID}`
                const response = await getData(path)
                setInfoProfile(response?.result)
            }
            const fetchPost = async ()=>{
                const path = `/post/user/get-post/${userID}`
                const res = await getDataWithToken(path)
                setListPostProfile(res?.data?.result)
            }
            const fetchInfo = async ()=>{
                const path = '/user/getInfo';
                const res = await getDataWithToken(path);
                setInfoPerson(res?.data?.result);
                setRequest({
                    id:localStorage.getItem('userId'),
                    phoneNumber:res?.data?.result?.phoneNumber,
                    email:res?.data?.result?.email,
                    fullName:res?.data?.result?.fullName,
                    gender:res?.data?.result?.gender,
                })
            }
            fetchInfo()
            fetchProfile()
            fetchPost()
        }

    },[])
    console.log(infoPerson,request)
    const handleChangeAvt = (e) =>{
        // console.log(e.target.files[0])
        // setFilePicture(e.target.value.split('\\'))

        setFilePicture(e.target.files[0]);
        setPicture(e.target.value);
        const reader = new FileReader();
        reader.addEventListener("load", () => {
            setImgData(reader.result);
        });
        reader.readAsDataURL(e.target.files[0]);
    }
    // let url = 'abc'

    useEffect(()=>{
        setImgData(imgData)
        setFilePicture(filePicture)
    },[imgData])
    const onSave = ()=>{
            formData.append("avatar", filePicture);
            formData.append("request",JSON.stringify(request));
        const pushAvt = async ()=>{
            try {
                const path = '/user/profile/update'
                await updateProfile(path,formData)
            }catch (erorr){
                console.log(erorr)
            }

        }
        pushAvt()
    }
    // console.log(url);
    return(
        <div className='userContainer'>
            <Header />
            <div className='navbar'>
                <div>
                    {ListContentUser?.map((item,index)=>{
                        return(
                            <p className={userOption === item.label?'activeUser':'contentUser'}
                                key={index} onClick={()=>setUserOption(item.label)}>
                                {item.label}
                            </p>
                        );
                    })}
                </div>
            </div>
            <div className='bodyUser'>
                <div className='listPostUser'>
                    <div className='filterUser'>
                        {ListFilterUser?.map((item,index)=>{
                            return(
                                <button className={filterOption === item.value?'activeBtn':'btnNew'}
                                    key={index} onClick={()=>setFilterOption(item.value)}>
                                    {item.label}
                                </button>
                            );
                        })}
                    </div>
                    <div className='postUser'>
                        {listPostProfile && listPostProfile.map((item)=>{
                            return(
                                <PostDetailHome item={item} />
                            );
                        })}
                        {listPostProfile?.length ===0 &&
                        <p className='warning'>
                            hmm... u/nguyenDuy1702 hasn't posted anything
                        </p>
                        }
                    </div>
                </div>
                <div className='profileUser'>
                    <div className='imgUser'>
                        {checked && <input type='file' className='inputUser' onChange={(e)=>handleChangeAvt(e)}/>}
                        {/*<img src={infoProfile?.avtUrl ||'/image/avtName.jpg'} alt='avt-user'  />*/}
                        <img src={imgData?.length? imgData:infoProfile?.avtUrl ||'/image/avtName.jpg'} alt='avt-user'  />
                        {checked && <div>
                            <FontAwesomeIcon icon={faCameraRetro} className='cameraIcon'/>
                        </div>}
                    </div>
                    {filePicture && <button onClick={onSave}>Save</button>}
                    <div className='wrapProfileUser'>
                        <p className='profileName'>{infoProfile?.username}</p>
                        <div>
                            <p className='profileItem'>VOTES <span className='vote'>{infoProfile?.voteCount}</span></p>
                            <p className='profileItem' >COMMENTS <span className='comment'>{infoProfile?.postCount}</span></p>
                            <p className='profileItem' >POSTS <span className='comment'>{infoProfile?.commentCount}</span></p>
                        </div>
                    </div>
                    <div className='wrap-info-user'>
                        <div className='info-item'>
                            <FontAwesomeIcon icon={faPersonHalfDress}/>
                            <p>{infoPerson?.gender || 'man'}</p>
                        </div>
                        <div className='info-item'>
                            <FontAwesomeIcon icon={faEnvelope}/>
                            <p>{infoPerson?.email}</p>
                        </div>
                        <div className='info-item'>
                            <FontAwesomeIcon icon={faPhoneVolume}/>
                            <p>{infoPerson?.phoneNumber || 'chưa có'}</p>
                        </div>
                    </div>
                    <div className='edit-info'>
                        <button className='info-edit' onClick={()=>navigate('/setting')}>
                            <FontAwesomeIcon icon={faUserPen}/>
                            <p className='profileName'>Edit</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};