import React from 'react'
import { StyleSheet, TouchableOpacity, Text, Platform } from 'react-native'
import { blue, white } from '../utils/colors'

export default CustomButton = ({ children, onPress, addStyle, ...props }) => (
    <TouchableOpacity
        style={Platform.OS === 'ios'
            ? [styles.iosButton, addStyle]
            : [styles.androidButton, addStyle]}
            {...props}
            onPress={onPress}
    >
        <Text style={styles.submitText}>
            {children}
        </Text>
    </TouchableOpacity>
)

const styles = StyleSheet.create({
    iosButton: {
        padding: 10,
        paddingLeft: 40,
        paddingRight: 40,        
        height: 45,
        borderRadius: 6 
    },
    androidButton: {
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        height: 45,        
        borderRadius: 4
    },
    submitText: {
        color: white,
        fontSize: 18,
        textAlign: 'center'
    }
})
