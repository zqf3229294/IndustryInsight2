import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

export default class Card extends React.Component {
    render() {
        return (
            <TouchableOpacity style={styles.card}>
                <Text style={styles.cardText}>
                    {this.props.feed}
                </Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        marginBottom: 10,
        marginLeft: '2%',
        width: '96%',
        shadowColor: '#000',
        shadowOpacity: 0.2, 
        shadowRadius: 1,
        shadowOffset: {
            width: 3, 
            height: 3
        }
    },
    cardText: {
        padding: 10,
        fontSize: 16
    }

});