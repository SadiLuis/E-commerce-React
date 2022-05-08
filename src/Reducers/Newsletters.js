import { postNewsletter } from '../Actions/Newsletter'

const initialState = {
    newsletterStore: []
}

export default function newsletterReducer(state = initialState, action) {
    switch (action.type) {
        case POST_NEWS:
            return {
                ...state,
                newsletterStore: action.payload
            }
        default:
            break;
    }
}