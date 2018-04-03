import {
    ADD_DECK
} from '../utils/types'

const decks = (state = {}, action) => {
    switch (action.type) {
        case ADD_DECK:
            return {
                ...state,
                ...action.deck
            }
        default:
            return state
    }
}

export default decks
