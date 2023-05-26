import React from 'react';
import './WrapAuthor.css';
import {formatTime} from '../../common/ConvertTime';
import {useNavigate} from "react-router-dom";

export const WrapAuthor = (props) =>{

    const {authorName,avt,timePost,authorId,checkLogin} = props;
    console.log(checkLogin)
    const timeConvert = formatTime(timePost);
    const navigate = useNavigate()
    const handleCLickAuthor = (id) =>{
        if(checkLogin){
            navigate(`/user/${id}`)
        }else navigate('/login')
    }
    return(
        <div className="wrapAuthor">
            <div className="author" onClick={()=>handleCLickAuthor(authorId)}>
                <img className="avatar" width="20px" height="20px" src={avt }  alt='avtUser'/>
                <p className="authorName">{authorName}</p>
            </div>
            <div className="wrapTimes">
                {/*<p>Posted by <span>{authorName}</span></p>*/}
                <p>{timeConvert}</p>
            </div>
        </div>
    );
};