import _ from 'lodash';
import { TO_DETAILS, TO_SUMMARIES} from '../redux/actions'

let initialState = {
    name: '',
    details: {},
    isDetailed: false
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case TO_DETAILS: {
            let newState = {...state};
            newState.isDetailed = true;
            newState.name = action.name;
            newState.details = action.details;
            return newState;
        }

        case TO_SUMMARIES: {
            let newState = {...state};
            newState.isDetailed = false;
            newState.name = "";
            return newState;
        }

        default:
            return state;
    }
}

export default reducer;