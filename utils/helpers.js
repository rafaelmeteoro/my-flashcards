export const getDeckDescription = deck => {
    const { length } = deck.questions
    return length === 0 ? 'No questions' : (length === 1 ? `${length} question` : `${length} questions`)
}
