import React from 'react';
import { StyleSheet, TouchableOpacity, Text, Image } from 'react-native';

export default class ChannelCard extends React.Component {
    render() {
        return (
            <TouchableOpacity style={styles.card}>
                <Image style={styles.cardImage} source={this.props.url} />
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    cardImage: {
        width: "100%",
        height: 150,
        resizeMode: 'cover',
        alignItems: 'center'
    },
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
        fontSize: 16,
    }

});