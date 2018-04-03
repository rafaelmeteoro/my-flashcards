import {
    ADD_DECK,
    ACCEPT_DECKS
} from '../utils/types'

export const addDeck = deck => ({
    type: ADD_DECK,
    deck
})

export const acceptDecks = decks => ({
    type: ACCEPT_DECKS,
    decks
})
