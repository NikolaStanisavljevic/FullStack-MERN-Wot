import { GET_STATS, SET_STATS } from '../actions/types';

const initialState = {
    asyncStats : [],
    syncStats: []
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_STATS:
            return {
                ...state,
                asyncStats: action.payload
            };
            case SET_STATS:
            return {
                ...state,
                syncStats: action.payload
            }
        default:
            return state;
    }
}