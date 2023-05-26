import './HomeLeft.scss';
import {Button} from 'antd';
import {useNavigate} from 'react-router-dom';
import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHouse, faTags} from '@fortawesome/free-solid-svg-icons';
import {listCateGory} from '../../contants/Category';
import Cookie from "universal-cookie";


export const HomeLeft = (props) =>{
    const {setIsClickPopular,handleClickTopicITem,checkLogin} = props;
    const navigate = useNavigate();
    var cookie = new Cookie();
    const onHome = () =>{
        if (checkLogin){
            navigate('/');
        }else navigate('/login')
    };
    const onPopular = () =>{
        if (checkLogin){
            navigate('/');
        }else navigate('/login')
        setIsClickPopular(true);
    };
    const onRemoveCookie = () =>{
        navigate('/login')
        cookie.remove('accessToken')
        cookie.remove('userId')
    }
    return(
        <div className="homeLeft">
            <div className="feeds">
                <h1 className="titleFeeds">Feeds</h1>
                <div className="topic" onClick={onHome}>
                    <FontAwesomeIcon icon={faHouse} />
                    <p className="topicName">Home</p>
                </div>
                <div className="topic" onClick={onPopular}>
                    <FontAwesomeIcon icon={faTags} />
                    <p className="topicName">Popular</p>
                </div>
            </div>
            <div className="topicList">
                <div className='wrapScroll'>
                    <h1 className="titleTopics">Topics</h1>
                    {listCateGory?.map((category)=>{
                        return(
                            <div className="topicItem" onClick={()=>handleClickTopicITem(category.value)} key={category.value}>
                                <div className="wrapTopic">
                                    <p className="topicName">{category.name}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="suggestLogin">
                <p className="suggestText">
                    Create an account to follow <br/>your favorite communities<br/> and start taking part in conversations.
                </p>
                {checkLogin && <Button onClick={()=>onRemoveCookie('/login')} type="primary" className="buttonLeft">LogOut</Button>}
                {!checkLogin && <Button onClick={()=>onRemoveCookie('/login')} type="primary" className="buttonLeft">Login</Button>}
            </div>
        </div>
    );
};