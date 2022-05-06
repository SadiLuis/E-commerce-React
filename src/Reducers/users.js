import { getAllUsers } from '../Actions/users'

const initialState = {
    users: [],
    userDetail: {},
    userDisabled: ''
}

export default function userReducer(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case 'GET_ALL_USERS':
            return {
                ...state,
                users: action.payload
            }
        case 'GET_USER_BY_ID':
            return {
                ...state,
                userDetail: action.payload
            }
        case 'CLEAN_USER_DETAIL':
            return {
                ...state,
                userDetail: {}
            }
        case 'DISABLED_USER':
            return {
                ...state,
                userDisabled: action.payload
            }
        case 'CLEAN_DISABLED_USER':
            return {
                ...state,
                userDisabled: ''
            }
        default:
            return { ...state }

    }

}

