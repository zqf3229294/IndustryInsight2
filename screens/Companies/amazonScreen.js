import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList
} from 'react-native';
import { Button, Avatar } from 'react-native-elements'
import Fire from '../../API/Fire'
import * as firebase from 'firebase'
import ChannelPost from '../ChannelPost'



export default class AmazonScreen extends React.Component {
    constructor(props) {
        super(props);
        this.ref = firebase.firestore().collection('channelPosts');
        this.unsubscribe = null;
        this.state = {
            user: {},
            loading: true,
            posts: []
        };
    }
    data = null;

	componentDidMount() {
		this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
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
    onCollectionUpdate = (querySnapshot) => {
	  let cur = [];
	  querySnapshot.forEach((doc) => {
		if (doc.data().channel == 'amazon') {
		  cur.push({
			id: doc.id,
			name: this.state.user.name,
			timestamp: doc.data().timestamp,
		    avatar: require('../../images/IILogo.png'),
			title: doc.data().title,
			text: doc.data().text,
			channel: doc.data().channel
		  });
		}	
	  });
	  this.setState({
		loading: false,
		posts: cur
	  });
	}

    renderPost = post => {
	  return (
	    <View style={styles.feedItem}>
		  <Avatar
			size="medium"
			rounded
			style={styles.avatar}
			source={
			  this.state.user.avatar
			  ? { uri: this.state.user.avatar }
			  : require("../../assets/images/robot-dev.png")
			}
		  />
		  <View style={{ flex: 1 }}>
		    <Text style={styles.postTitle}>{post.title}</Text>
			<View style={{paddingTop: 5}}>
			  <Text>{post.text}</Text>
			</View>
		  </View>
		</View>
		);
	};

    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Button
                        disabledStyle={true}
                        title="Create Post"
                        color="#f194ff"
                        onPress={() => this.props.navigation.navigate('ChannelPost', {channel: 'amazon'})}
                    />
                </View>
                <View>
                    <FlatList
                        style={styles.feed}
                        data={this.state.posts}
                        renderItem={({ item }) => this.renderPost(item)}
                        keyExtractor={item => item.id}
                        showsVerticalScrollIndicator={false}
                    />
                </View>


            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#413c69',
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
    text: {
        color: '#FFF',
        justifyContent: 'space-evenly'
    },
    feed: {
		marginHorizontal: 16
    },
    feedItem: {
		backgroundColor: 'whitesmoke',
		borderRadius: 5,
		padding: 8,
		flexDirection: 'row',
		marginVertical: 8
    },
    avatar: {
		width: 36,
		height: 36,
		borderRadius: 18,
		marginRight: 16
	},
  postTitle: {
	marginTop: 3,
	fontSize: 16,
    color: 'black',
    fontWeight: 'bold'
  },
    
});

// export default AmazonScreen;