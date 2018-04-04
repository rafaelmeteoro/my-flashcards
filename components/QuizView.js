import React, { Component } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import TextHeader from './TextHeader'
import { red, green } from '../utils/colors'
import CustomButton from './CustomButton'

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
        let percent = (answersCorrect / questions * 100).toFixed(2)
        let questionsText =  `You have hit ${answersCorrect} of ${questions} ${questions === 1 ? 'question' : 'questions'}!`
        let percentText = `Your hit rate is ${percent}%`
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

    render() {

        const { deck } = this.props
        const { index, answersCorrect, showQuest } = this.state

        // No cards to show
        if (index === deck.questions.length) {

            return (
                <View style={styles.container}>
                    <View style={styles.question}>
                        <TextHeader>{this.showResult(answersCorrect, deck.questions.length)}</TextHeader>
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
    }
})

const mapStateToProps = ({ decks }, { navigation }) => ({
    deck: decks[navigation.state.params.title]
})

export default connect(mapStateToProps)(QuizView)
