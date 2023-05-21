import React, {useState} from 'react';
import './PostDetail.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCircleXmark, faMagnifyingGlass, faShare,faComment,faStar} from '@fortawesome/free-solid-svg-icons';
import {CommentOutlined,StarOutlined
    ,ShareAltOutlined,SaveOutlined,StarFilled,} from '@ant-design/icons';
import {useNavigate} from 'react-router-dom';
import {WrapAuthor} from '../WrapAuthor';
import {pushVote} from '../../services/HandleData';
export const PostDetail = ( props)=>{
    const {item,checked,countVote,onVote} = props;
    const navigate = useNavigate();
    return(
        <div className="postDetail" key={item?.id}>
            <WrapAuthor avt = {item?.avt} authorName = {item?.author} timePost = {item?.timePost} />
            <div className="wrapStatus">
                <p className='postContent'>{item?.content}</p>
                {item?.hashTags?.map((hashtag)=>{
                    return(
                        <p className='postHasTag' key={hashtag.id}>{hashtag.name}</p>
                    );
                })}

            </div>
            <div className="wrapReact">
                <div className="wrapItem" onClick={()=>onVote(item)}
                    style={{color: (checked) ? '#ebeb12' : '',fontWeight:checked ?'700':'400',}}>
                    <FontAwesomeIcon icon={faStar}/>
                    <p> {(countVote >0  ) ?`${countVote} Votes` :  'Vote' } </p>
                </div>
                <div className="wrapItem"
                    // onClick={()=>onComment(item)}
                >
                    <FontAwesomeIcon icon={faComment}/>
                    <p> {item?.countComment >0 ?`${item.countComment} Comments` :  'Comments' } </p>
                </div>
                <div className="wrapItem">
                    <FontAwesomeIcon icon={faShare}/>
                    <p>Share</p>
                </div>
                <div className="wrapItem">
                    <SaveOutlined />
                    <p>Save</p>
                </div>
            </div>
        </div>
    );
};