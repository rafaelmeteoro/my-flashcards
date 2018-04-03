import { AsyncStorage } from 'react-native'

const MY_FLASHCARDS_STORAGE_KEY = 'MyFlashcards:decks'

export const saveDeckTitle = (deckTitle) => {
    return AsyncStorage.mergeItem(MY_FLASHCARDS_STORAGE_KEY, JSON.stringify({
        [deckTitle]: {
            title: deckTitle,
            questions: []
        }
    }))
}
