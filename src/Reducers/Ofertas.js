

const initialState = {
    allOfertas: [],
    ofertByID: {},
    ofertaToEdit: null
}

export default function ofertasReducer(state = initialState, action) {

    switch (action.type) {
        case "SET_OFERTA_TO_EDIT":
            return { ...state, ofertaToEdit: action.payload };
        
        case "GET_ALL_OFERTAS": return {
            ...state,
            allOfertas: action.payload,
        }
        case "GET_OFERTA_BY_ID": return {
            ...state,
            ofertByID: action.payload
        }
        default: return state
    }
}