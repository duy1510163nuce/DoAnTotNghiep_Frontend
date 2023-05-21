import './HomeLeft.scss';
import {Button} from 'antd';
import {useNavigate} from 'react-router-dom';
import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHouse, faTags} from '@fortawesome/free-solid-svg-icons';
import {listCateGory} from '../../contants/Category';


export const HomeLeft = (props) =>{
    const {setIsClickPopular,handleClickTopicITem,checkLogin} = props;
    const navigate = useNavigate();

    const onHome = () =>{
        navigate('/');
    };
    const onPopular = () =>{
        navigate('/');
        setIsClickPopular(true);
    };
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
                {checkLogin && <Button onClick={()=>navigate('/register')} type="primary" className="buttonLeft">Login out</Button>}
                {!checkLogin && <Button onClick={()=>navigate('/login')} type="primary" className="buttonLeft">Sign in</Button>}
            </div>
        </div>
    );
};