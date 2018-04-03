import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { connect } from 'react-redux'

class QuizView extends Component {

    render() {

        return (
            <View>
                <Text>Quiz View</Text>
            </View>
        )
    }
}

export default connect()(QuizView)
