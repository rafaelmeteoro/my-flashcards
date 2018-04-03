import React, { Component } from 'react'
import { StyleSheet, View, Text, KeyboardAvoidingView, Keyboard } from 'react-native'
import { FormInput, FormValidationMessage } from 'react-native-elements'
import { connect } from 'react-redux'
import CustomButton from './CustomButton'
import { black } from '../utils/colors'

class AddCardView extends Component {

    state = {
        question: '',
        questonError: false,
        answer: '',
        answerError: false
    }

    handleQuestion = (question) => {
        this.setState({
            question,
            questionError: (question === '' ? true: false)
        })
    }

    handleAnswer = (answer) => {
        this.setState({
            answer,
            answerError: (answer === '' ? true : false)
        })
    }

    submit = () => {
        const { title } = this.props
        const { question, questionError, answer, answerError } = this.state

        if (question === '' || answer === '') {
            this.setState({
                questionError: (question === '' ? true : false),
                answerError: (answer === '' ? true : false)
            })
        } else {
            card = {
                question,
                answer
            }

            // Save card

            // Dispatch update card

            // Hide keyboard
            Keyboard.dismiss()

            // Clear input text
            this.setState({
                question: '',
                answer: ''
            })
        }
    }

    render() {

        const { question, questionError, answer, answerError } = this.state

        return (
            <KeyboardAvoidingView style={styles.container}>
                <FormInput
                    placeholder='Enter question'
                    containerStyle={{ margin: 30 }}
                    onChangeText={this.handleQuestion}
                    value={question}
                />
                {questionError && (
                    <FormValidationMessage>This field is required</FormValidationMessage>
                )}
                <FormInput
                    placeholder='Enter answer'
                    containerStyle={{ margin: 30 }}
                    onChangeText={this.handleAnswer}
                    value={answer}
                />
                {answerError && (
                    <FormValidationMessage>This field is required</FormValidationMessage>
                )}
                <CustomButton
                    addStyle={{ backgroundColor: black, margin: 30 }}
                    onPress={this.submit}
                >
                    Submit
                </CustomButton>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1        
    }
})

const mapStateToProps = (state, { navigation }) => ({
    title: navigation.state.params.title
})

export default connect(mapStateToProps)(AddCardView)
