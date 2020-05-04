import React from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, TouchableWithoutFeedback, ActivityIndicator, Image } from 'react-native';
import { Avatar } from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons';
import * as firebase from 'firebase'
import Fire from '../API/Fire'
// import DetailsScreen from '../screens/DetailsScreen';

export default class HomeScreen extends React.Component {
	constructor(props) {
		super(props);
		this.ref = firebase.firestore().collection('posts');
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
			cur.push({
        id: doc.id,
        timestamp: doc.data().timestamp,
        name: doc.data().name,
        email: doc.data().email,
        avatar: doc.data().avatar,
        type: doc.data().type,
        date: doc.data().date,
        time: doc.data().time,
        groupSize: doc.data().groupSize,
        location: doc.data().location,
        description: doc.data().description,
        active: doc.data().active
			});
		});
		this.setState({
			loading: false,
			posts: cur
		});
  }
  
	renderPost = post => {
		return (
			<TouchableWithoutFeedback onPress={() => {this.props.navigation.navigate('Details', {post: post})}}>
				<View style={styles.feedItem}>
				<Avatar
					size="medium"
					rounded
					style={styles.avatar}
					source={
            post.avatar ? { uri: post.avatar }
            : require("../assets/images/robot-dev.png")
					}
				/>
				<View style={{ flex: 1 }}>
					<Text style={styles.postType}>{post.type}</Text>
          <View style={styles.postTime}>
            <Text>Date: {post.date}</Text>
            <Text>  Time: {post.time}</Text>
          </View>
          <View style={{paddingTop: 5}}>
            <Text>Group Size: {post.groupSize}</Text>
          </View>
				</View>
			</View>
			</TouchableWithoutFeedback>

		);
	};

	render() {
		return (
			<View style={styles.container}>
				<FlatList
					style={styles.feed}
					data={this.state.posts}
					renderItem={({ item }) => this.renderPost(item)}
					keyExtractor={item => item.id}
					showsVerticalScrollIndicator={false}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#413c69'
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
	name: {
		fontSize: 15,
		fontWeight: '500',
		color: '#454d65'
	},
	timestamp: {
		fontSize: 11,
		color: '#c4c6ce',
		marginTop: 4
	},
	postType: {
		marginTop: 3,
		fontSize: 16,
    color: 'black',
    fontWeight: 'bold'
  },
  postTime: {
		marginTop: 3,
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
	postImage: {
		// width: undefined,
		height: 150,
		borderRadius: 5,
		marginVertical: 16
	}
});

