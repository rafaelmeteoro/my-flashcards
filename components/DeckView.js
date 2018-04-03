import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { connect } from 'react-redux'
import TextHeader from './TextHeader'
import CustomButton from './CustomButton'
import { getDeckDescription } from '../utils/helpers'
import { gray, red, green } from '../utils/colors'

class DeckView extends Component {

    static navigationOptions = ({ navigation }) => ({title: navigation.state.params.title})

    render() {

        const { deck, navigate } = this.props

        return (
            <View style={styles.container}>
                <TextHeader>{deck.title}</TextHeader>
                <Text style={styles.description}>{getDeckDescription(deck)}</Text>
                <CustomButton
                    addStyle={{backgroundColor: red}}
                    onPress={() => navigate('AddCardView', { title: deck.title })}
                >
                    Add Card
                </CustomButton>
                <View style={{marginBottom: 20}} />
                {deck.questions.length > 0 && (
                    <CustomButton
                        addStyle={{backgroundColor: green}}
                        onPress={() => navigate('QuizView', { title: deck.title })}
                    >
                        Start Quiz
                    </CustomButton>
                )}                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    description: {
        color: gray,
        marginBottom: 40
    }
})

const mapStateToProps = ({ decks }, { navigation }) => ({
    deck: decks[navigation.state.params.title],
    navigate: navigation.navigate
})

export default connect(mapStateToProps)(DeckView)
