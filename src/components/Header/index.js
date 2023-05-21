import {Button} from 'antd';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBell, faCircleXmark, faMagnifyingGlass, faMessage, faPlus} from '@fortawesome/free-solid-svg-icons';
import './Header.scss';
import {LoginOutlined,ProfileOutlined,SettingOutlined} from '@ant-design/icons';
import {useNavigate} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {RedditOutlined,UserOutlined,DownOutlined} from '@ant-design/icons';
import {getDataWithToken} from '../../services/HandleData';
export  const Header = (props) =>{
    const {searchOption,checkLogin} = props;
    const [isLogOut,setIsLogout] = useState(false)
    const [infoPersonal,setInfoPersonal] = useState();
    const navigate = useNavigate();
    const [valueSearch,setValueSearch] = useState(searchOption?.valueSearch);
    const accessToken = localStorage.getItem('accessToken')
    let profile = 'true';
    useEffect(()=>{
        const fetchInfoUser = async ()=>{
            if(accessToken){
                const path = '/user/getInfo';
                const res = await getDataWithToken(path);
                setInfoPersonal(res.data.result);
            }
        };
        fetchInfoUser();
    },[]);
    const onNavigate =  (path)=>{
        navigate(path);
    };
    const onLogout = ()=>{
        setIsLogout(!isLogOut);
    };
    const onSearchHeader = (e) => {
        setValueSearch( e.target.value)
    };
    const handleClear = ()=>{
        setValueSearch('');
    };
    const handleSearch = ()=>{
        navigate(`/search/${valueSearch.replaceAll('#','%23')}`);
    };
    return(
        <div className="header">
            <div className="wrapLogo">
                <img src="/svg/goldenclass.svg" alt="icon-logo" width="40px" height="40px"/>
                <p className="logoName">Q&A</p>
                <Button onClick={()=>onNavigate('/')} className="buttonCreatePost" type='primary'>Home</Button>
            </div>
            <div className="wrapSearch">
                <input className="headerSearch"  name={'input'} value={valueSearch} placeholder="Search Q&A" onChange={(e)=>onSearchHeader(e)}></input>
                {(valueSearch) && <button className='clearBtn' onClick={handleClear}>
                    <FontAwesomeIcon icon={faCircleXmark}/>
                </button>}
                <button className='searchBtn' onClick={handleSearch}>
                    <FontAwesomeIcon icon={faMagnifyingGlass}/>
                </button>

            </div>
            <div className="wrapRight">
                {!infoPersonal && <Button onClick={()=>onNavigate('/login')} className="buttonLogin" type='primary'>Login</Button>}
                {infoPersonal &&
                    <div className='wrapIsLogin' >
                        <FontAwesomeIcon icon={faPlus} className='iconHeader' onClick={()=>onNavigate('/create')}/>
                        <FontAwesomeIcon icon={faMessage} className='iconHeader' />
                        <FontAwesomeIcon icon={faBell} className='iconHeader' />
                    </div>
                }
                <div className="wrapHelp" onClick={onLogout}>
                    {infoPersonal ? <RedditOutlined /> : <UserOutlined />}
                    {infoPersonal && <p>{infoPersonal.username.toUpperCase()}</p>}
                    <DownOutlined />
                    {isLogOut && <div className='wrapProfile'>
                        <p onClick={() => onNavigate(`/user/${profile}`)}><ProfileOutlined/> Profile</p>
                        <p onClick={() => onNavigate('/setting')}><SettingOutlined/> User Setting</p>
                        <p onClick={() => onNavigate('/login')}><LoginOutlined/> Log Out</p>
                    </div>}
                </div>
            </div>
        </div>
    );
};