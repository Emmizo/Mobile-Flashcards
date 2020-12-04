export const ADD_DECKS = 'ADD_DECKS'
export const GET_DECKS = 'GET_DECKS'
export const ADD_QUESTIONS = 'ADD_QUESTIONS'

export function addDeck(deck, key) {
    return {
        type: ADD_DECKS,
        deck,
        key
    }
}

export function getDecks(decks) {
    return {
        type: GET_DECKS,
        decks
    }
}

export function addQuetionToDeck(card, deckKey) {
    return {
        type: ADD_QUESTIONS,
        card,
        deckKey
    }
}