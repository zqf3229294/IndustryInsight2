import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ActivityIndicator, Alert, Image, ImagePickerIOS } from 'react-native'
import Fire from '../API/Fire'
import { Ionicons } from '@expo/vector-icons';
import UserPermissions from '../utilities/UserPermissions';
import * as ImagePicker from 'expo-image-picker'
import * as firebase from 'firebase'

export default class RegisterScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            user: {
                name: '', 
                email: '', 
                password: '', 
                avatar: '',
            },
            error: '', 
            loading: false 
        };
    }

    handlePickAvatar = async () => {
        UserPermissions.getCameraPermission();

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3]
        });

        if (!result.cancelled) {
            this.setState({ user : { ...this.state.user, avatar: result.uri } });
        }
    };

    // sends user data to firebase and saves it
    handleSignUp = async () => {
    //   if(Fire.shared.createUser(this.state.user)) {
    //     this.props.navigation.navigate('Login');
    //   }
      Fire.shared.createUser(this.state.user)
      .then(() => this.props.navigation.navigate('Home'))

        // this.setState({ error: '', loading: true });
        // const { name, email, password } = this.state;
        // this.setState({ name: '', email: '', password: '' })
        // firebase.auth().createUserWithEmailAndPassword(email, password)
        //     .then(userCredentials => {
        //         userCredentials.user.updateProfile({ displayName: this.state.name });
        //         this.setState({ error: '', loading: true });
        //         this.props.navigation.navigate('Login');
        //         console.log('user successfully signed up!');
        //     })
        //     .catch(() => {
        //         this.setState({ name: name, email: email, password: password, error: 'Authentication failed!', loading: false });
        //     })
    }

    // method to display either buttons or activity indicator
    renderButtonOrLoading() {
        if (this.state.loading) {
            return <ActivityIndicator size="large" color="#2a7886" />
        } else if (this.state.error === 'Authentication failed!') {
            this.state.error = '';
            this.state.loading = false;
            Alert.alert(
                'Sign Up Failure',
                'Sign up failed due to invalid fields',
                [
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: false },
            );
        }
        return <View>
            <TouchableOpacity style={styles.buttonContainer} onPress={this.handleSignUp.bind(this)}>
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
                <Text style={styles.loginLink}>
                    Already have an account? <Text style={styles.loginText}>Login!</Text>
                </Text>
            </TouchableOpacity>
        </View>
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.errorMessage}>
                    {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
                </View>
                <Image
                    style={styles.logo}
                    source={require('../images/IILogo.png')}
                />
                <TouchableOpacity style={styles.avatarPlaceholder} onPress={this.handlePickAvatar}>
                    <Image source={{uri: this.state.user.avatar}} style={styles.avatar}/>
                    <Ionicons
                        name="ios-add"
                        size={40}
                        color="#FFF"
                        style={{ marginTop: 6, marginLeft: 2 }}
                    >
                    </Ionicons>

                </TouchableOpacity>
                <TextInput
                    style={styles.input}
                    placeholder='Name'
                    autoCapitalize="none"
                    placeholderTextColor='rgba(255, 255, 255, 0.7)'
                    returnKeyType="next"
                    onChangeText={name => this.setState({ user: { ...this.state.user, name} })}
                    value={this.state.user.name}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Email'
                    autoCapitalize="none"
                    keyboardType='email-address'
                    returnKeyType="next"
                    placeholderTextColor='rgba(255, 255, 255, 0.7)'
                    onChangeText={email => this.setState({ user: { ...this.state.user, email} })}
                    value={this.state.user.email}
                /> 
                <TextInput
                    style={styles.input}
                    placeholder='Password'
                    secureTextEntry={true}
                    autoCapitalize="none"
                    returnKeyType="next"
                    placeholderTextColor='rgba(255, 255, 255, 0.7)'
                    onChangeText={password => this.setState({ user: {...this.state.user, password} })}
                    value={this.state.user.password}
                />
                {this.renderButtonOrLoading()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        width: 350,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        marginBottom: 15,
        paddingHorizontal: 10,
        color: 'white',
        fontSize: 18,
        fontWeight: '500',
    },
    avatarPlaceholder: {
        width: 100,
        height: 100,
        backgroundColor: "#E1E2E6",
        borderRadius: 50,
        marginTop: 20,
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',

    },
    avatar: {
        position: "absolute",
        width: 100,
        height: 100,
        borderRadius: 50
    },
    container: {
        flex: 1,
        backgroundColor: '#413c69',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonContainer: {
        backgroundColor: '#2a7886',
        paddingVertical: 15,
        width: 300,
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
    logo: {
        width: 200,
        height: 200,
    },
    logoTitle: {
        color: '#FFF',
        marginTop: 40,
        fontSize: 20,
        width: 200,
        height: 40,
        textAlign: "center",
        justifyContent: 'center'
    },
    loginLink: {
        color: '#FFF',
        marginTop: 20,
        alignSelf: 'center'
    },
    loginText: {
        fontWeight: '500',
        color: '#eb1543'
    }
})
