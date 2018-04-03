import {
    ADD_DECK,
    ACCEPT_DECKS
} from '../utils/types'

const decks = (state = {}, action) => {
    switch (action.type) {
        case ADD_DECK:
            return {
                ...state,
                ...action.deck
            }
        case ACCEPT_DECKS:
            return {
                ...state,
                ...action.decks
            }
        default:
            return state
    }
}

export default decks
