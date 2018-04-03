import {
    ADD_DECK,
    ACCEPT_DECKS,
    ADD_CARD
} from '../utils/types'

export const addDeck = deck => ({
    type: ADD_DECK,
    deck
})

export const acceptDecks = decks => ({
    type: ACCEPT_DECKS,
    decks
})

export const addCard = (deckTitle, card) => ({
    type: ADD_CARD,
    deckTitle,
    card
})
