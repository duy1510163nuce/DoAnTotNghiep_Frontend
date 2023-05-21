import {axiosWithoutToken, axiosWithToken} from '../Axios';

export const getData = async (path) => {
    const response = await axiosWithoutToken.get(path);
    return response.data;
};

export const getDataWithToken = async (path) => {
    const response = await axiosWithToken.get(path,);
    return response;
};

export const getListPost = (path,pageSize,pageNo) =>
    axiosWithToken.get(path, {
        params: {
            pageSize: pageSize,
            pageNo: pageNo,
        }
    });

export const getListPostWithCategory = (path,categoryId,pageSize,pageNo) =>
    axiosWithToken.get(path, {
        params: {
            categoryId:categoryId,
            pageSize: pageSize,
            pageNo: pageNo,
        }
    });
export const getDataSearch = async (path,value,typeFilter,sort,time,pageSize,pageNo) =>
    await    axiosWithToken.get(path, {
        params: {
            key: value,
            sort:sort || null,
            type:typeFilter || null,
            time:time || null,
            pageSize: pageSize,
            pageNo: pageNo,
        }
    });

export const getListComment = async (path,value,sort,pageSize,pageNo) =>
    await     axiosWithToken.get(path, {
        params: {
            key: value || '',
            sort:sort || '',
            pageSize: pageSize,
            pageNo: pageNo,
        }
    });

export const getDataWithParams = async (path,pageSize,pageNo)=>{
    const response = await axiosWithoutToken.get(path,
        {
            params: {
                pageSize: pageSize,
                pageNo: pageNo,
            }
        });
    return response.data;
};


export const createPost = async (path,formData) => {
    return await axiosWithToken.post(path, formData, {headers: {'Content-Type': 'multipart/form-data'}});
};
export const updateProfile = async (path,formData) => {
    return await axiosWithToken.put(path, formData, {headers: {'Content-Type': 'multipart/form-data'}});
};
export const pushDataWithToken = async (path,formData) => {
    return await axiosWithToken.post(path, formData);
};

export const pushData = async (path, data) => {
    const results = await axiosWithoutToken.post(path, data);
    return results;
};

export const pushVote = async (path, vote) => {
    const results = await axiosWithToken.post(path, vote);
    return results;
};
export const changePassword = async (path, password) => {
    const results = await axiosWithToken.post(path, password);
    return results;
};