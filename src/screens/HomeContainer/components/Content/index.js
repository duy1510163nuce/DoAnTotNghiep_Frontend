import React from 'react';
import './Content.scss';
import { ListContentTitle } from '../../../../contants/ContentTitle';
import { useState } from 'react';
import { PostDetail } from '../../../../components/PostDetail';
import { PostDetailHome } from '../../../../components/PostDetailHome';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

export const Content = (props) => {
    const { listData, checkLogin, onSeeMore } = props;
    const [idActive, setIdActive] = useState(1);
    const navigate = useNavigate();
    const handleClickTitle = (id) => {
        setIdActive(id);
    };
    return (
        <div className="contentContainer">
            <div className="wrapCreatePost" onClick={() => navigate('/create')}>
                <img
                    src="/svg/goldenclass.svg"
                    alt="icon-logo"
                    width="40px"
                    height="40px"
                />
                <input className="createPost" placeholder="Create post"></input>
                <Button type="primary">Create</Button>
            </div>
            <div className="contentTitle">
                {ListContentTitle?.map((item, index) => {
                    return (
                        <p
                            className={idActive === item.id ? 'active' : 'contentName'}
                            key={index}
                            onClick={() => handleClickTitle(item.id)}
                        >
                            {item.label}
                        </p>
                    );
                })}
            </div>
            <div className="listPost">
                {listData.length !== 0 &&
          listData?.map((item) => {
              return <PostDetailHome item={item} checkLogin={checkLogin} />;
          })}
                {listData.length === 0 && (
                    <p className="warning">hmm... Current page has no data</p>
                )}
            </div>
            {(listData.length !== 0 && listData.length === 4) && (
                <div className="footer">
                    <p className="btnSeeMore" onClick={() => onSeeMore('next')}>
                        xem thêm ...
                    </p>
                </div>
            )}
        </div>
    );
};
