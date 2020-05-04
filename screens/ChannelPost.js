import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    TextInput
} from 'react-native';
import Fire from '../API/Fire';
// import UserPermissions from '../utilities/UserPermissions';
import Colors from '../constants/Colors';

export default class ChannelPost extends React.Component {
    
  state = {
    title: '',
    text: '',
    channel: '' 
  };
    
    componentDidMount() {
        // UserPermissions.getCameraPermission();
        const user = this.props.uid || Fire.shared.uid;

        this.data = Fire.shared.firestore
			.collection('users')
			.doc(user)
			.onSnapshot(doc => {
				this.setState({ user: doc.data() })

			});
    }

    componentWillUnmount() {
        this.data();
    }

    handleChannelPost = () => {
      const channel = this.props.route.params.channel
      Fire.shared
          .addChannelPost({ 
            title: this.state.title,
            text: this.state.text,
            channel: channel
          })
          .then(ref => {
            this.setState({ 
              title: '',
              text: '',
              channel: ''
            });
            this.props.navigation.goBack();
          })
          .catch(error => {
            alert(error);
          });
    };
    
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Text>{this.state.channel}</Text>
                <View style={styles.titleContainer}>
                    <Text style = {styles.label}>Title</Text>
                    <View style={styles.breaker}/>
                    <TextInput
                        autoFocus={true}
                        multiline={true}
                        numberOfLines={2}
                        style={{ flex: 1, margin: 5 }}
                        placeholder='Input your title'
                        onChangeText={text => this.setState({ title: text })}
                        value={this.state.title}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style = {styles.label}>Content</Text>
                    <View style={styles.breaker}/>
                    <TextInput
                        autoFocus={true}
                        multiline={true}
                        numberOfLines={5}
                        style={{ flex: 1, margin: 5 }}
                        placeholder='Input your post'
                        onChangeText={text => this.setState({ text: text })}
                        value={this.state.text}
                    />
                </View>
                <View>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={this.handleChannelPost.bind(this)}
                    >
                        <Text style={styles.buttonText}>Post</Text>
                    </TouchableOpacity>
                </View>
                
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.BACKGRAY,
        paddingTop: 30,
    },
    titleContainer: {
        margin: 10,
        height: 100,
        // flexDirection: 'row',
        backgroundColor: Colors.WHITE,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 1,
        borderRadius:5
    },
    inputContainer: {
        margin: 10,
        height: 200,
        // flexDirection: 'row',
        backgroundColor: Colors.WHITE,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 1,
        borderRadius:5
    },
    button: {
        alignItems: 'center', 
        justifyContent: 'center', 
        backgroundColor: '#ff5c5c',
        padding: 10,
        marginLeft: 10,
        marginRight: 10,
        borderRadius:5
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold'
    },
    label: {
        padding: 10,
        fontWeight: 'bold'
    },
    breaker: {
        margin: 5,
        borderBottomColor: Colors.LIGHTGRAY,
        borderBottomWidth: 1,
    }
});
