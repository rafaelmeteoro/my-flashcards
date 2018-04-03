import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { connect } from 'react-redux'
import TextHeader from './TextHeader'

class ListDeckView extends Component {

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
            <View style={styles.container}>
                <Text>List View</Text>
            </View>            
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    empty: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

const mapStateToProps = ({ decks }) => (
    { decks }
)

export default connect(mapStateToProps)(ListDeckView)
