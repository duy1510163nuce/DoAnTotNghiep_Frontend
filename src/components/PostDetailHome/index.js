import React, {useState} from 'react';
import './PostDetail.scss';
import {useNavigate} from 'react-router-dom';
import {WrapAuthor} from '../WrapAuthor';
import {pushVote} from '../../services/HandleData';
import {faShare,faBookmark,faComment,faStar} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
export const PostDetailHome = ( props)=>{
    const {item} = props;

    const [checked,setChecked] = useState(item?.voteResultDTO?.isUserUpVoted);
    const [countVote,setCountVote] = useState(item?.voteResultDTO?.count);
    const navigate = useNavigate();
    let vote = {};
    const onComment = (item) =>{
        return navigate(`/detail-page/${item.id}`);
    };

    const  handleClickReact = async (item) =>{
        // if(checkLogin){
        if(item?.votePostDTO?.isUserUpVoted) {
            vote ={
                postId: item?.id,
                vote: 'DOWN_VOTE',
                voteFor:'POST',
            };
        }else{
            vote={
                postId:item?.id,
                vote:'UP_VOTE',
                voteFor:'POST',
            };
        }
        try{
            const res = await pushVote('/vote',vote);
            setChecked(!checked);
            setCountVote(res.data.result.voteCount);
        }catch (error){
            console.log('call fail');
        }
    };
    return(
        <div className="postDetail" key={item?.id}>
            <WrapAuthor avt = {item?.avt} authorName = {item?.author} timePost = {item?.timePost}  />
            <div className="wrapStatus">
                <p className='postContent'>{item?.content}</p>
                {item?.hashTags?.map((hashtag)=>{
                    return(
                        <p className='postHasTag' key={hashtag.id}>{hashtag.name}</p>
                    );
                })}

            </div>
            <div className="wrapReact">
                <div className="wrapItem" onClick={()=>handleClickReact(item)}
                    style={{color: (checked) ? '#ebeb12' : '',fontWeight:checked ?'700':'400',}}>
                    <FontAwesomeIcon icon={faStar}/>
                    <p> {(countVote > 0) ?`${countVote} ` :  'Rate ' } </p>
                </div>
                <div className="wrapItem"
                    onClick={()=>onComment(item)}
                > <FontAwesomeIcon icon={faComment}/>

                    <p> {item?.countComment >0 ?`${item.countComment} Comments` :  'Comments' } </p>
                </div>
                <div className="wrapItem">
                    <FontAwesomeIcon icon={faShare}/>
                    <p>Share</p>
                </div>
                <div className="wrapItem">
                    {/*{isSave? <SaveFilled />:<SaveOutlined />}*/}
                    <FontAwesomeIcon icon={faBookmark}/>
                    <p>Save</p>
                </div>
            </div>
        </div>
    );
};