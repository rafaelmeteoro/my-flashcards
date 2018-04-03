import {
    ADD_DECK,
    ACCEPT_DECKS,
    ADD_CARD
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
        case ADD_CARD:
            return {
                ...state,
                [action.deckTitle]: {
                    title: action.deckTitle,
                    questions: [
                        ...state[action.deckTitle].questions,
                        action.card
                    ]
                }
            }
        default:
            return state
    }
}

export default decks
