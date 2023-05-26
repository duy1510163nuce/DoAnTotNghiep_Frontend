import './HomeRight.scss';
import {ListMember} from '../../contants/ListMember';
import React from 'react';
import {LoginOutlined,ProfileOutlined,SettingOutlined} from '@ant-design/icons';
import {useNavigate} from 'react-router-dom';

export const HomeRight = (props)=>{
    const {isLogOut} = props;
    const navigate = useNavigate();
    const onNavigate = (path)=>{
        navigate(path);
    };
    return(
        <div className="homeRightContainer">
            <div className="wrapTable">
                <p className="tableTitle">Can you don't know to Q&A</p>
                <div className="listMember">
                    {ListMember.map((member,index)=>{
                        return(
                            <div className="wrapMember" key={index}>
                                <div className="info">
                                    <p className="infoName">{member.name}</p>
                                </div>
                                <p>{member.rate}</p>
                            </div>
                        );
                    })
                    }
                </div>
            </div>
        </div>
    );
};