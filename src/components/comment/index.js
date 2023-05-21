import {WrapAuthor} from '../WrapAuthor';
import { EllipsisOutlined} from '@ant-design/icons';
import React, {useState,useEffect} from 'react';
import './comment.scss';
import {Button,Input} from 'antd';
import {faStar,faComment} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {getData, pushDataWithToken, pushVote} from '../../services/HandleData';
const {TextArea} = Input;
export const Comment = (props) =>{
    const {comment,postId} = props;
    const [isLike, setIsLike] = useState(comment?.voteResultDTO?.isUserUpVoted);
    const [voteComment, setVoteComment] = useState(comment?.voteResultDTO?.count);
    const [isReply, setIsReply] = useState(false);
    const [listReply,setListReply] = useState([]);
    const [valueReply,setValueReply] = useState();
    let payload = {};

    useEffect(()=>{
        const fetchListComment = async ()=>{
            try{
                const path = `/comment/getDetail/${comment.id}`;
                const res = await getData(path);
                setListReply(res.result?.childrenComment);
            }catch (error){
                console.log(error.result.message);
            }
        };
        fetchListComment();
    },[valueReply,isReply]);


    const handClickReply =  () =>{
        setIsReply(!isReply);
    };

    let rate = {};
    const handClickRate = async (comment) =>{
        if(comment?.voteResultDTO?.isUserUpVoted){
            rate ={
                commentId: comment?.id,
                vote: 'DOWN_VOTE',
                voteFor:'COMMENT',
            };
        }else {
            rate ={
                commentId: comment?.id,
                vote: 'UP_VOTE',
                voteFor:'COMMENT',
            };
        }
        try{
            const res = await pushVote('/vote',rate);
            setIsLike(!isLike);
            setVoteComment(res.data.result.voteCount);
        }catch (error){
            console.log('call fail');
        }
    };
    const onReply = async (comment) =>{
        payload = {
            postId: postId,
            commentParentId:comment?.id,
            content: valueReply
        };
        try {
            await pushDataWithToken('/comment/create',payload);
            setValueReply();
        }catch (error){
            alert(error.response.message);
        }
    };
    return(
        <div className="userComment" key={comment?.id}>
            <WrapAuthor avt = {comment.avtUrl} authorName = {comment.username}
                timePost = {comment.createdAt}
            />
            <div className="borderLeft">
                <p className="textComment">{comment.content}</p>
                <div className="footerComment">
                    <div onClick={()=>handClickRate(comment)} className='startComment'
                        style={{color: (isLike) ? '#ebeb12' : '',fontWeight:isLike ?'700':'400',}}
                    >
                        <FontAwesomeIcon icon={faStar}/>
                        <p >{ voteComment > 0 ?`${voteComment} ` :  'Rate' }</p>
                    </div>
                    <div className="reply" onClick={()=>handClickReply(comment)}>
                        <FontAwesomeIcon icon={faComment}/>
                        <p>{listReply.length > 0 ?`${listReply.length} Reply`: 'Reply'}</p>
                    </div>
                    <EllipsisOutlined />
                </div>
                {isReply &&
                    <div className="wrapReply">
                        <div  className="wrapInputReply">
                            <TextArea
                                value={valueReply}
                                rows={4} placeholder={'what are your thought?'}
                                onChange = {(e )=>setValueReply(e.target.value)}
                            />
                            <Button
                                type="primary"
                                disabled={valueReply?false:true}
                                onClick={()=>onReply(comment)}
                            >
                               Comment
                            </Button>
                        </div>
                        <div className="box">
                            {listReply?.map((comment)=>{
                                return(
                                    <Comment comment = {comment} postId = {postId} />
                                );
                            })}
                        </div>
                    </div>
                }
            </div>


        </div>
    );
};