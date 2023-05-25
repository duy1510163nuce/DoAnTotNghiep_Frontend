import {Select, Spin} from 'antd';
import {ListContentSearch} from '../../contants/ContentTitle';
import React, {useEffect, useState} from 'react';
import './SearchContainer.scss';
import {PostDetailHome} from '../../components/PostDetailHome';
import {Header} from '../../components/Header';
import {useNavigate, useParams} from 'react-router-dom';
import {getDataSearch, getListPost} from '../../services/HandleData';
import {optionSort, optionTime} from '../../contants/OptionSearch';


export  const SearchContainer = (props) =>{
    const {} = props;
    const [loading,setLoading] = useState(false);
    const [isLogOut,setIsLogOut] = useState(false);
    const [checkLogin,setCheckLogin] = useState(false);
    const navigate = useNavigate();
    const [listDataFilter,setListDataFilter] = useState([]);
    const pageSize = 4;
    const valueParams = useParams()
    const [searchOption,setSearchOption] = useState({
        valueSearch:valueParams.value,
        typeFilter:'CONTENT',
        sort:null,
        time:null,
    });
    const [pageNo, setPageNo] = useState(1);
    let {sort,typeFilter,valueSearch,time} = searchOption;
    useEffect(()=>{
        if(searchOption.valueSearch.includes('#')){
            typeFilter = 'HASHTAG'
            setSearchOption({...searchOption,typeFilter: 'HASHTAG'})
        }
        const fetchDataFilter = async ()=>{
            try {
                console.log(typeFilter,valueSearch,sort,time)
                setLoading(true);
                const {data} =   await getDataSearch('/post/filter',valueSearch,typeFilter,sort,time,pageSize,pageNo);
                setListDataFilter(data.result);
                setLoading(false);
            }catch (error){
                console.log(error);
            }
        };
        fetchDataFilter();
    },[sort,typeFilter,time,valueSearch,pageNo]);
    const onSearchHeader = async (e) => {
        setSearchOption({...searchOption,valueSearch: e.target.value});
        if(e.key === 'Enter'){
            return navigate(`/search/${searchOption.valueSearch}`);
        }
    };
    const onTypeSearch = (value)=>{
        setSearchOption({...searchOption,typeFilter:value});
    };
    const onSelect = (value,type) =>{
        if(type === 'sort'){
            setSearchOption({...searchOption,sort:value});
        }else setSearchOption({...searchOption,time:value});
    };
    const onSeeMore = async (type)=>{
        if(type === 'next') {
            setPageNo(pre => pre +1);

        }
    };
    return(
        <div className='wrapLoading'>
            {loading && <Spin  size={'large'}/>}
            <div className="homeContainer" style={{opacity: loading ? '0.1' : '1'}}>
                <Header isLogOut={isLogOut} setIsLogOut={setIsLogOut} checkLogin={checkLogin}
                    onSearchHeader={onSearchHeader} searchOption={searchOption}
                />
                <div className="homeSearch">
                    <div className="contentSearch">
                        {ListContentSearch?.map((item,index)=>{
                            return(
                                <p className={searchOption.typeFilter === item.value?'active':'contentName'}
                                    key={index}
                                    onClick={()=>onTypeSearch(item.value)}
                                >
                                    {item.label}
                                </p>
                            );
                        })}
                    </div>
                    <div className='wrapSelect'>
                        <Select
                            placeholder='sort'
                            onChange={(value) => onSelect(value,'sort')}
                            style={{ width: 120 }}
                            bordered={false}
                            options={optionSort}
                        />
                        <Select
                            placeholder='time'
                            onChange={(value) => onSelect(value,'time')}
                            style={{ width: 120 }}
                            bordered={false}
                            options={optionTime}
                        />
                    </div>
                    <div className="listPost">
                        {listDataFilter?.map((item)=>{

                            return(
                                <PostDetailHome item={item} />
                            );
                        })}
                        {listDataFilter.length === 0 &&
                            <p className='warning'>
                                hmm... Looks like what you're looking for doesn't exist or has expired
                            </p>

                        }
                    </div>
                    {(listDataFilter.length !== 0 && listDataFilter.length === 4) && <div className='footer'>
                        <p className='btnSeeMore' onClick={()=>onSeeMore('next')}>Xem thêm ...</p>
                    </div>}
                </div>
            </div>
        </div>
    );
};