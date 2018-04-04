import React, { Component } from 'react'
import { StyleSheet, KeyboardAvoidingView, Keyboard } from 'react-native'
import { FormInput, FormValidationMessage } from 'react-native-elements'
import TextHeader from './TextHeader'
import CustomButton from './CustomButton'
import { black } from '../utils/colors'
import { connect } from 'react-redux'
import { saveDeckTitle } from '../utils/api'
import { addDeck } from '../actions';

class AddDeckView extends Component {

    state = {
        title: '',
        titleError: false
    }

    handleTitle = (title) => {
        this.setState(() => ({
            title,
            titleError: (title === '' ? true: false)
        }))
    }

    submit = () => {
        const { title, titleError } = this.state

        if (title === '') {
            this.setState({
                titleError: true
            })
        } else {
            
            // Save deck
            saveDeckTitle(title)

            // Dispatch action to update store
            this.props.dispatch(addDeck({
                [title]: {
                    title: title,
                    questions: []
                }
            }))

            // Hide Keyboard
            Keyboard.dismiss()

            // Clear input
            this.setState({
                title: ''
            })
        }
    }

    render() {

        const { title, titleError } = this.state

        return(
            <KeyboardAvoidingView style={styles.container}>
                <TextHeader>What is the title of your new Deck?</TextHeader>
                <FormInput
                    placeholder='Enter the deck title here...'
                    inputStyle={styles.input}
                    onChangeText={this.handleTitle}
                    value={title}
                />
                {titleError && (
                    <FormValidationMessage>This field is required</FormValidationMessage>
                )}
                <CustomButton
                    addStyle={{ backgroundColor: black, marginTop: 40 }}
                    onPress={this.submit}
                >
                    Create Deck
                </CustomButton>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 50
    },
    input: {
        textAlign: 'center',
        fontSize: 18
    }    
})

export default connect()(AddDeckView)
