import React from 'react'
import { StyleSheet, Text } from 'react-native'

export default TextHeader = ({ children }) => (
    <Text style={styles.container}>
        {children}
    </Text>
)

const styles = StyleSheet.create({
    container: {
        fontSize: 18,
        textAlign: 'center',
        paddingLeft: 40,
        paddingRight: 40
    }
})
