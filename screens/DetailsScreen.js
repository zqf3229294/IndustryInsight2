import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import { Button } from 'react-native-elements'
import Fire from '../API/Fire';
// import UserPermissions from '../utilities/UserPermissions';
import * as firebase from 'firebase'
import Colors from '../constants/Colors';

export default class DetailsScreen extends React.Component {
    state = {
      user: {},
    };

    data = null;

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


    render() {
      const post = this.props.route.params.post
      return (
        <View style={styles.container}>
          <View style={styles.headContainer}>
            <View style={styles.typeContainer}>
              <Text style={styles.postType}>{post.type}</Text>
            </View>
            
            <View style={styles.postTime}>
              <Text style={styles.info}>
                <Text style={{ fontWeight: 'bold' }}>Date:</Text> {post.date}
              </Text>
              <Text style={styles.info}>
                <Text style={{ fontWeight: 'bold' }}>  Time:</Text> {post.time}
              </Text>
            </View>

            <View style={styles.location}>
              <Text style={styles.info}>
                <Text style={{ fontWeight: 'bold' }}>Location:</Text> {post.location}
              </Text>
            </View>
          </View>
          <View style={styles.sizeContainer}>
            <Text style={styles.info}>
              <Text style={{ fontWeight: 'bold'}}>Group Size:  </Text>  
              <Text style={{fontWeight: 'bold', color:'red'}}>{post.groupSize}</Text>
            </Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.info}>{post.description}</Text>
          </View>
          <View style={{marginTop:10}}>
            <TouchableOpacity
              style={styles.button}
            //   onPress={}
            >
              <Text style={styles.buttonText}>Join</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.BACKGRAY
    },
    typeContainer: {
        backgroundColor: Colors.WHITE,
		padding: 15,
		flexDirection: 'row',
        marginVertical: 8,
        justifyContent: 'center',
    },
    sizeContainer: {
      backgroundColor: Colors.WHITE,
	  padding: 20,
	  flexDirection: 'row',
      marginVertical: 8,
      justifyContent: 'center',
    },
    headContainer: {
      height: 200,
      flexDirection: 'column',
      backgroundColor: Colors.WHITE
    },
    textContainer: {
      height: 300,
      backgroundColor: Colors.WHITE,
	  padding: 10,
	  flexDirection: 'row',
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        marginRight: 15,
        marginLeft: 5,
        marginTop: 5
    },
    photo: {
        alignItems: 'flex-end',
        marginHorizontal: 32
    },
    postType: {
	  marginTop: 3,
	  fontSize: 30,
      color: 'black',
      fontWeight: 'bold',
    },
    postTime: {
	  marginTop: 3,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      paddingTop: 10,
      justifyContent: 'center',
    },
    location: {
      marginTop: 3,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      paddingTop: 20,
      justifyContent: 'center',
    },
    info: {
      fontSize: 20
    },
    button: {
      alignItems: 'center', 
      justifyContent: 'center', 
      backgroundColor: '#ff5c5c',
      padding: 10,
      marginLeft: 10,
      marginRight: 10,
      borderRadius:10
    },
    buttonText: {
      fontSize: 18,
      color: 'white',
      fontWeight: 'bold'
    },
});
