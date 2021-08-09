import axiosInstance from "../helpers/axios";
import { categoryConstants } from "./constants";

export const getAllCategory = () => {
    return async dispatch => {
        dispatch({type: categoryConstants.CATEGORY_REQUEST})
        const res = await axiosInstance.get(`category/getcategory`);
        console.log(res);
        if(res.status == 200){

            const {categoryList} = res.data;
            dispatch({
                type: categoryConstants.CATEGORY_SUCCESS,
                payload: {categories: categoryList}
            })
        }else{
            dispatch({
                type: categoryConstants.CATEGORY_FAILURE,
                payload:{error: res.data.error}
            })
        }
    }
}
