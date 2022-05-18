

const initialState = {
    chatNotifications: [],
    notifications: [],
    
}

export default function notifReducer(state = initialState, action) {

    switch (action.type) {
        case "GET_CHAT_NOTIFICATIONS":
            return { ...state, chatNotifications: action.payload };
        
        case "GET_NOTIFICATIONS": return {
            ...state,
            notifications: action.payload,
        }

        case "DELETE_CHAT_NOTIFICATIONS": return {
            ...state,
            chatNotifications: [],
        }

        case "DELETE_NOTIFICATIONS": return {
            ...state,
            notifications: [],
        }
        
        default: return state
    }
}