import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {Header} from '../../components/Header';
import './DetailPostContainer.scss';
import {PostDetail} from '../../components/PostDetail';
import {HomeRight} from '../../components/HomeRight';
import {Button, Select, Input, Spin} from 'antd';
import {Comment} from '../../components/comment';
import {getData, getDataWithToken, getListComment, pushDataWithToken, pushVote} from '../../services/HandleData';
const { TextArea,Search } = Input;

export const PostCommentContainer = ()=>{
    const [postComment,setPostComment] = useState();
    const [checked,setChecked] = useState(false);
    const [countVote,setCountVote] = useState();
    const [valueComment,setValueComment] = useState();
    const [listComment,setListComment] = useState([]);
    const [loadingComment,setLoadingComment] = useState(false);
    const {id} = useParams();
    const [searchOptionComment,setSearchOptionComment] = useState({
        valueSearch:'',
        sort:'',
    });
    let vote = {};
    let value = {};
    let {sort,valueSearch} = searchOptionComment;
    const pageSize = 3;
    const [pageNo, setPageNo] = useState(1);

    useEffect(()=>{
        const fetchDetailPost = async ()=>{
            try {
                setLoadingComment(true);
                const path = `/post/getDetail/${id}`;
                const{data} = await getListComment(path);
                setPostComment(data.result);
                setCountVote(data.result?.voteResultDTO?.count);
                if(data.result?.voteResultDTO?.isUserUpVoted) {
                    setChecked(true);
                }
                setChecked(data.result?.voteResultDTO?.isUserUpVoted);
                setLoadingComment(false);
            }catch (error){
                console.log('call fail');
            }
        };
        fetchDetailPost();
    },[]);

    useEffect(()=>{
        const fetchListComment = async ()=>{
            try{
                const path = `/comment/getList/${id}`;
                const {data} = await getListComment(path,valueSearch,sort,pageSize,pageNo);
                setListComment(data?.result?.content);
            }catch (error){
                console.log('call fail');
            }
        };
        fetchListComment();
    },[valueComment,sort,valueSearch]);

    const onSearch = (value) => {
        setSearchOptionComment({...searchOptionComment,valueSearch:value});
    };
    const handleChangeComment = (e,id) =>{
        setValueComment( e.target.value);
    };
    const onComments = async (item) =>{
        value ={
            postId: item.id,
            content: valueComment
        };
        try {
            await pushDataWithToken('/comment/create',value);
            setValueComment();
        }catch (error){
            alert(error.response.message);
        }
    };
    const  onVote = async (item) =>{
        // if(checkLogin){
        if(item?.votePostDTO?.isUserUpVoted) {
            vote ={
                postId: item?.id,
                vote: 'DOWN_VOTE',
                voteFor:'POST'
            };
        }else{
            vote={
                postId:item?.id,
                vote:'UP_VOTE',
                voteFor:'POST'
            };
        }
        try{
            setChecked(!checked);
            if(checked){
                setCountVote(pre=>pre -1);
            } else setCountVote(pre=>pre +1);
            await pushVote('/vote',vote);
        }catch (error){
            console.log('call fail');
        }
    };
    return(
        <div className='wrapLoadingDetail'>
            {loadingComment && <Spin  size={'large'}/>}
            <div className="postComment" style={{opacity:loadingComment?'0.1': '1'}}>
                <Header />
                <div className="bodyComment">
                    <div className="rightComment" >
                        <div className='contentComment'>
                            <div className="wrapComments">

                                <PostDetail item = {postComment} onVote = {onVote } countVote={countVote} checked = {checked} />
                                <div className="listComment">
                                    <div className="wrapInput">
                                        <TextArea value={valueComment} rows={4} placeholder={'what are your thought?'} onChange = {(e )=>handleChangeComment(e,postComment.id)} />
                                        <Button type="primary" onClick={()=>onComments(postComment)} disabled={valueComment?false:true}>Comment</Button>
                                    </div>
                                    <div className="wrapSearchComment">
                                        <Select
                                            showSearch
                                            style={{ width: 200 }}
                                            placeholder="Sort By:"
                                            optionFilterProp="children"
                                            filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                            filterSort={(optionA, optionB) =>
                                                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                            }
                                            options={[
                                                {
                                                    value: '1',
                                                    label: 'Best',
                                                },
                                                {
                                                    value: '2',
                                                    label: 'Top',
                                                },
                                                {
                                                    value: '3',
                                                    label: 'Old',
                                                },
                                                {
                                                    value: '4',
                                                    label: 'New',
                                                },
                                            ]}
                                        />
                                        <Search  placeholder="input search text" onSearch={onSearch} enterButton />
                                    </div>
                                    <div className="box">
                                        {listComment?.map((comment)=>{
                                            return(
                                                <Comment comment = {comment} postId = {postComment?.id}/>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="suggest">
                            <HomeRight/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};