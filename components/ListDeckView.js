import React, { Component } from 'react'
import { StyleSheet, View, Text, ScrollView, Platform } from 'react-native'
import { connect } from 'react-redux'
import TextHeader from './TextHeader'
import DeckItem from './DeckItem'
import { getDecks } from '../utils/api'
import { acceptDecks } from '../actions'
import { black } from '../utils/colors'

class ListDeckView extends Component {

    componentDidMount() {
        getDecks()
            .then(decks => {
                if (decks !== null) {
                    this.props.dispatch(acceptDecks(decks))
                }
            })
    }

    render() {

        const { decks } = this.props

        if (Object.keys(decks).length === 0) {
            return(
                <View style={styles.empty}>
                    <TextHeader>There are no decks. Add a new!</TextHeader>
                </View>
            )
        }

        return(
            <ScrollView style={styles.container}>
                {decks && Object.keys(decks).map((title, position) => {
                    const deck = decks[title]
                    return (
                        <View key={position}>
                            <DeckItem deck={deck} navigate={this.props.navigation.navigate} />
                            <View style={styles.separator} />
                        </View>
                    )
                })}
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5,
        margin: 5
    },
    empty: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    separator: {
        backgroundColor: black,
        height: Platform.OS === 'ios' ? 1 : 0
    }
})

const mapStateToProps = ({ decks }) => (
    { decks }
)

export default connect(mapStateToProps)(ListDeckView)
