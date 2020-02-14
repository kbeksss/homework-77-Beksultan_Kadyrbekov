import {FETCH_ALL_THREADS_SUCCESS} from "../actions/boardsActions";

const initialState = {
    allThreads: [],
    currentThread: {},
};

const boardsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ALL_THREADS_SUCCESS:
            return {
                ...state,
                allThreads: action.allThreads.reverse(),
            };
        default:
            return state;
    }
};

export default boardsReducer;
