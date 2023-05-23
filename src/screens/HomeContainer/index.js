import './HomeContainer.scss';
import { Header } from '../../components/Header';
import { HomeLeft } from '../../components/HomeLeft';
import { Content } from './components/Content';
import { HomeRight } from '../../components/HomeRight';
import React, {useCallback, useEffect, useState} from 'react';
import { Spin } from 'antd';
import {getDataWithParams, getListPost, getListPostWithCategory} from '../../services/HandleData';
import { ListPost } from '../../contants/ListPost';
export const HomeContainer = () => {
    const [isClickPopular, setIsClickPopular] = useState(false);
    const [listData, setListData] = useState([]);
    const [checkLogin, setCheckLogin] = useState(false);
    const [isLogOut, setIsLogOut] = useState(false);
    const [loading, setLoading] = useState(false);
    const [categoryId, setCategoryId] = useState(null);
    const token = localStorage.getItem('accessToken');
    const pageSize = 4;
    const [pageNo, setPageNo] = useState(1);
    useEffect(() => {
        const getListPostHome = async () => {

            if (!token) {
                console.log(2222)
                try {
                    setLoading(true);
                    const path = '/post/filter';
                    const res = await getDataWithParams(path, pageSize, pageNo);
                    setListData(res.result);
                    setLoading(false);
                } catch (error) {
                    console.log('call fail');
                }
            } else {
                setCheckLogin(true);
                try {
                    setLoading(true);
                    const path = '/post/filter';
                    const { data } = await getListPost(
                        path,
                        pageSize,
                        pageNo
                    );
                    setListData(data.result);
                    setLoading(false);
                } catch (error) {
                    console.log('call fail');
                }
            }
        };
        getListPostHome();
    }, [ pageNo]);

    useEffect(()=>{
        setCategoryId(categoryId);
        const fetchCategory = async () =>{
            try {
                setLoading(true);
                const path = '/post/filter';
                const { data } = await getListPostWithCategory(
                    path,
                    categoryId,
                    pageSize,
                    pageNo
                );
                setListData(data.result);
                setLoading(false);
            } catch (error) {
                console.log('call fail');
            }
        }
        fetchCategory()
    },[categoryId])
    const handleClickTopicITem = (value) =>{
        setCategoryId(value);
        setPageNo(1);
    }
    const onSeeMore = async (type) => {
        if (type === 'back') {
            setPageNo(1);
            const pageSize = 4;
            const path = '/post/filter';
            const { data } = await getListPost(path, categoryId, pageSize, pageNo);
            setListData(data.result);
            setLoading(false);
        }
        if (type === 'next') {
            setPageNo((pre) => pre + 1);
            const pageSize = 4;
            setLoading(true);
            const path = '/post/filter';
            const { data } = await getListPost(path, categoryId, pageSize, pageNo);
            setListData(data.result);
            setLoading(false);
        }
    };
    return (
        <div className="wrapLoading">
            {loading && <Spin size={'large'} />}
            <div className="homeContainer" style={{ opacity: loading ? '0.1' : '1' }}>
                <Header
                    isLogOut={isLogOut}
                    setIsLogOut={setIsLogOut}
                    checkLogin={checkLogin}
                />
                <div className="body">
                    <div className="left">
                        <HomeLeft
                            setIsClickPopular={setIsClickPopular}
                            isClickPopular={isClickPopular}
                            setPageNo={setPageNo}
                            checkLogin={checkLogin}
                            handleClickTopicITem={handleClickTopicITem}
                        />
                    </div>
                    <div className="right">
                        <div className="content">
                            <Content
                                listData={listData}
                                isClickPopular={isClickPopular}
                                checkLogin={checkLogin}
                                onSeeMore={onSeeMore}
                            />
                        </div>
                        <div className="suggest">
                            <HomeRight isLogOut={isLogOut} checkLogin={checkLogin} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
