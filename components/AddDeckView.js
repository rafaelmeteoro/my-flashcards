import React, { Component } from 'react'
import { StyleSheet, KeyboardAvoidingView } from 'react-native'
import TextHeader from './TextHeader'

class AddDeckView extends Component {

    render() {
        return(
            <KeyboardAvoidingView>
                <TextHeader>What is the title of yor new Deck?</TextHeader>
            </KeyboardAvoidingView>
        )
    }
}

export default AddDeckView
