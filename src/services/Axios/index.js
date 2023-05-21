import {createAxios} from './createAxios';

export const axiosWithToken = createAxios();
export const axiosWithoutToken = createAxios({
    withAuthToken: false
});