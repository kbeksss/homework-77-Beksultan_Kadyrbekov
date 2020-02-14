import axiosImageBoard from "../../axiosImageBoard";

export const FETCH_ALL_THREADS_SUCCESS = 'FETCH_ALL_THREADS_SUCCESS';

export const FETCH_A_THREAD_SUCCESS = 'FETCH_A_THEAD_SUCCESS';

const fetchAllThreadsSuccess = allThreads => ({type: FETCH_ALL_THREADS_SUCCESS, allThreads});

export const fetchAllThreads = () => {
    return async dispatch => {
        try{
            const response = await axiosImageBoard.get('board');
            dispatch(fetchAllThreadsSuccess(response.data));
        } catch(e){
            console.error(e);
        }
    }
};
export const postNewThread = thread => {
    return async () => {
        try {
            await axiosImageBoard.post('board', thread);
        } catch(e){
            console.error(e.response.data.error);
            alert(e.response.data.error);
        }
    }
};
