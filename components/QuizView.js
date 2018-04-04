import React, { Component } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import TextHeader from './TextHeader'
import { red, green, black } from '../utils/colors'
import CustomButton from './CustomButton'
import { setLocationNotification, clearLocalNotification } from '../utils/helpers'
import { NavigationActions } from 'react-navigation'

class QuizView extends Component {

    state = {
        index: 0,
        answersCorrect: 0,
        showQuest: true
    }

    cardNumber = (deck, index) => {
        return `${index + 1}/${deck.questions.length}`
    }

    showResult = (answersCorrect, questions) => {
        const percent = (answersCorrect / questions * 100).toFixed(2)
        const questionsText =  `You have hit ${answersCorrect} of ${questions} ${questions === 1 ? 'question' : 'questions'}!`
        const percentText = `Your hit rate is ${percent}%`
        return `${questionsText}\n${percentText}`
    }

    changeQuestionAnswer = () => {
        this.setState(previousState => {
            return {
                showQuest: !previousState.showQuest
            }
        })
    }

    showNext = () => {
        this.setState(previousState => {
            return {
                index: previousState.index + 1,
                showQuest: true                
            }
        })
    }

    answerCorrect = () => {
        this.setState(previousState => {
            return {
                answersCorrect: previousState.answersCorrect + 1
            }
        })
        this.showNext()
    }

    restartQuiz = () => {
        this.setState({
            index: 0,
            answersCorrect: 0,
            showQuest: true
        })
    }

    backToDeck = () => {
        this.props.navigation.dispatch(NavigationActions.back({
            key: null
        }))
    }

    render() {

        const { deck } = this.props
        const { index, answersCorrect, showQuest } = this.state

        // No cards to show
        if (index === deck.questions.length) {

            // Clear notification and set tomorrow
            clearLocalNotification()
                .then(setLocationNotification)

            return (
                <View style={styles.container}>
                    <View style={styles.question}>
                        <TextHeader>{this.showResult(answersCorrect, deck.questions.length)}</TextHeader>
                        <CustomButton
                            addStyle={styles.btnRestart}
                            onPress={this.restartQuiz}
                        >
                            Restart Quiz
                        </CustomButton>
                        <CustomButton
                            addStyle={styles.btnBack}
                            onPress={this.backToDeck}
                        >
                            Back to Deck
                        </CustomButton>
                    </View>
                </View>
            )
        }

        const card = deck.questions[index]        

        // Show questions and answers
        return (
            <View style={styles.container}>
                <View style={styles.questionsNumber}>
                    <Text style={{fontSize: 18}}>{this.cardNumber(deck, index)}</Text>
                </View>
                {card && (
                    <View style={styles.question}>
                        {showQuest && (
                            <View>
                                <TextHeader>{card.question}</TextHeader>
                                <TouchableOpacity onPress={this.changeQuestionAnswer}>
                                    <Text style={styles.btnText}>Answer</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                        {!showQuest && (
                            <View>
                                <TextHeader>{card.answer}</TextHeader>
                                <TouchableOpacity onPress={this.changeQuestionAnswer}>
                                    <Text style={styles.btnText}>Question</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                        <View style={showQuest ? { opacity: 0.5 }: {}}>
                            <CustomButton
                                addStyle={styles.btnCorrect}
                                disabled={showQuest}
                                onPress={this.answerCorrect}
                            >
                                Correct
                            </CustomButton>
                            <CustomButton
                                addStyle={styles.btnIncorrect}
                                disabled={showQuest}
                                onPress={this.showNext}
                            >
                                Incorrect
                            </CustomButton>
                        </View>
                    </View>
                )}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    questionsNumber: {
        margin: 10
    },
    question: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnText: {
        fontSize: 20,
        margin: 5,
        textAlign: 'center',
        color: red
    },
    btnCorrect: {
        marginTop: 60,
        marginBottom: 20,
        backgroundColor: green
    },
    btnIncorrect: {
        backgroundColor: red
    },
    btnRestart: {
        marginTop: 60,
        marginBottom: 20,
        backgroundColor: black
    },
    btnBack: {
        backgroundColor: red
    }
})

const mapStateToProps = ({ decks }, { navigation }) => ({
    deck: decks[navigation.state.params.title]
})

export default connect(mapStateToProps)(QuizView)
