import React from 'react'
import { View, Text, StyleSheet, Image, KeyboardAvoidingView, ActivityIndicator, StatusBar, TextInput, TouchableOpacity, Alert } from 'react-native'
import * as firebase from 'firebase'
import config from '../config'

if (!firebase.apps.length) {
    firebase.initializeApp(config.firebaseConfig);
}



export default class LoginScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = { email: '', password: '', error: '', loading: false };
    }

    onLoginPress() {
        this.setState({ error: '', loading: true });
        const { email, password } = this.state;
        this.setState({ email: '', password: '' })
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                this.setState({ error: '', loading: false });
                this.props.navigation.navigate('Home');
            })
            .catch(() => {
                this.setState({ email: email, password: password, error: 'Authentication failed!', loading: false });
            })
    }

    renderButtonOrLoading() {
        if (this.state.loading) {
            return <ActivityIndicator size="large" color="#2a7886" />
        } else if (this.state.error === 'Authentication failed!') {
            Alert.alert(
                'Login Failure',
                'You have entered incorrect email or password',
                [
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: false },
            );
            this.setState({ error: '', loading: false })
        }
        return <View>
            <TouchableOpacity style={styles.buttonContainer} onPress={this.onLoginPress.bind(this)}>
                <Text style={styles.buttonText}>LOGIN</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')}>
                <Text style={styles.registerLink}>
                    Do not have an account? <Text style={{ fontWeight: '500', color: '#eb1543' }}>Sign Up!</Text>
                </Text>
            </TouchableOpacity>
        </View>
    }

    render() {
        return (      
          <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <View style={styles.container}>
                    {/* <Text style={styles.greeting}>Welcom Back!</Text> */}

                    <View style={styles.errorMessage}>
                        {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
                    </View>
                </View>

                <View style={styles.logoContainer}>
                    <Image
                        style={styles.logo}
                        source={require('../images/IILogo.png')}
                    />
                </View>
                <View style={styles.formContainer}>
                    <View style={styles.insideFormcontainer}>
                        <StatusBar barStyle="light-content" />
                        <TextInput
                            placeholder="Email"
                            autoCapitalize="none"
                            placeholderTextColor='rgba(255, 255, 255, 0.7)'
                            returnKeyType="next"
                            style={styles.input}
                            onChangeText={email => this.setState({ email })}
                            value={this.state.email}
                        />
                        <TextInput
                            placeholder="Password"
                            placeholderTextColor='rgba(255, 255, 255, 0.7)'
                            returnKeyType="go"
                            secureTextEntry
                            style={styles.input}
                            onChangeText={password => this.setState({ password })}
                            value={this.state.password}
                        />
                        {this.renderButtonOrLoading()}
                    </View>
                </View>
            </KeyboardAvoidingView>
        )
    }
}


const styles = StyleSheet.create({
    areaView: {
        flex: 1,
    },
    container: {
        flex: 1,
        // backgroundColor: '#3498db'
        backgroundColor: '#413c69'
    },
    formContainer: {
        // borderWidth: 2,
        flexGrow: 1,
    },
    greeting: {
        marginTop: 30,
        fontSize: 18,
        fontWeight: '400',
        textAlign: 'center'
    },
    errorMessage: {
        height: 72,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 30
    },
    error: {
        color: '#de0937',
        fontSize: 13,
        fontWeight: '600',
        textAlign: 'center'
    },
    logoContainer: {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center',
    },
    logo: {
        width: 200,
        height: 200
    },
    logoTitle: {
        color: '#FFF',
        marginTop: 10,
        width: 160,
        textAlign: "center",
    },
    buttonContainer: {
        backgroundColor: '#2a7886',
        paddingVertical: 15,
        marginTop: 20,
        marginHorizontal: 30,
        borderRadius: 4,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontWeight: '700'
    },
    registerLink: {
        color: '#FFF',
        marginTop: 20,
        // width: 160,
        alignSelf: 'center'
    },
    insideFormcontainer: {
        padding: 30,
        paddingBottom: 100,
    },
    input: {
        height: 40,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        marginBottom: 10,
        color: "#FFF",
        paddingHorizontal: 10
    },
    loginButton: {
        backgroundColor: "#00b5ec",
    },
    loginText: {
        color: 'white',
    }
});