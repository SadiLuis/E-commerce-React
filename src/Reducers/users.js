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

        case 'ORDER_USER':
            let sorted = action.payload === "A-Z"
                ? [...state.users].sort(function (a, b) {
                    if (a.nombre.toLowerCase() > b.nombre.toLowerCase()) {
                        return 1;
                    }
                    if (b.nombre.toLowerCase() > a.nombre.toLowerCase()) {
                        return -1;
                    }
                    return 0;
                }) : action.payload === "Z-A"
                    ? [...state.users].sort(function (a, b) {
                        if (a.nombre.toLowerCase() > b.nombre.toLowerCase()) {
                            return -1;
                        } if (b.nombre.toLowerCase() > a.nombre.toLowerCase()) {
                            return 1;
                        }
                        return 0;
                    }) : action.payload === "asc"
                        ? [...state.users].sort(function (a, b) {
                            if (a.email.toLowerCase() > b.email.toLowerCase()) {
                                return 1;
                            }
                            if (b.email.toLowerCase() > a.email.toLowerCase()) {
                                return -1;
                            }
                            return 0;
                        })
                        : action.payload === "desc"
                            ? [...state.users].sort(function (a, b) {
                                if (a.email.toLowerCase() > b.email.toLowerCase()) {
                                    return -1;
                                } if (b.email.toLowerCase() > a.email.toLowerCase()) {
                                    return 1;
                                }
                                return 0;
                            })
                            : action.payload === "us-asc"
                                ? [...state.users].sort(function (a, b) {
                                    if (a.usuario.toLowerCase() > b.usuario.toLowerCase()) {
                                        return 1;
                                    }
                                    if (b.usuario.toLowerCase() > a.usuario.toLowerCase()) {
                                        return -1;
                                    }
                                    return 0;
                                }) : [...state.users].sort(function (a, b) {
                                    if (a.usuario.toLowerCase() > b.usuario.toLowerCase()) {
                                        return -1;
                                    } if (b.nombre.toLowerCase() > a.usuario.toLowerCase()) {
                                        return 1;
                                    }
                                    return 0;
                                })
            return {
                ...state,
                users: sorted
            }

        default:
            return { ...state }

    }

}

