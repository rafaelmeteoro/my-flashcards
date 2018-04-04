import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Platform } from 'react-native'
import { getDeckDescription } from '../utils/helpers'
import { gray, white, black } from '../utils/colors'

export default DeckItem =({ deck, navigate }) => (
    <TouchableOpacity onPress={() => navigate('DeckView', {title: deck.title})}>
        <View style={Platform.OS === 'ios' ? styles.containerIos : styles.containerAndroid}>
            <Text style={styles.title}>{deck.title}</Text>
            <Text style={styles.description}>{getDeckDescription(deck)}</Text>
        </View>
    </TouchableOpacity>
)

const styles = StyleSheet.create({
    containerIos: {
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        height: 100
    },
    containerAndroid: {
        marginTop: 5,
        marginBottom: 5,
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: gray,
        height: 100,
        borderRadius: 5
    },
    title: {
        color: Platform.OS === 'ios' ? black : white,
        fontSize: 20,
        marginBottom: 10
    },
    description: {
        color: Platform.OS === 'ios' ? black : white
    }
})
