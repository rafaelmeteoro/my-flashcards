import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'

class ListDeckView extends Component {

    render() {
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
    }
})

export default ListDeckView
