import React, { Component } from 'react'
import { StyleSheet, KeyboardAvoidingView } from 'react-native'
import { FormInput } from 'react-native-elements'
import TextHeader from './TextHeader'
import CustomButton from './CustomButton'
import { black } from '../utils/colors'

class AddDeckView extends Component {

    render() {
        return(
            <KeyboardAvoidingView style={styles.container}>
                <TextHeader>What is the title of your new Deck?</TextHeader>
                <FormInput
                    placeholder='Enter the deck title here...'
                    inputStyle={styles.input}
                />
                <CustomButton
                    addStyle={{ backgroundColor: black, marginTop: 40 }}
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

export default AddDeckView
