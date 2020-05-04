import * as React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Avatar, Text, Button } from 'react-native-elements'
// import { ScrollView } from 'react-native-gesture-handler';
import Fire from '../API/Fire'
import UserPermissions from '../utilities/UserPermissions'
import * as ImagePicker from 'expo-image-picker'
import * as firebase from 'firebase'
import { FlatList } from 'react-native-gesture-handler';


export default class ProfileScreen extends React.Component {
	constructor(props) {
		super(props);
		this.ref = firebase.firestore().collection('globalPosts');
		this.unsubscribe = null;
		this.state = {
			user: {},
			loading: true,
			posts: []
		};
	}


	unsubscribe = null;
	componentDidMount() {
		this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
		const user = this.props.uid || Fire.shared.uid;

		this.unsubscribe = Fire.shared.firestore
			.collection('users')
			.doc(user)
			.onSnapshot(doc => {
				this.setState({ user: doc.data() })

			});
	}

	// componentDidMount() {
	// 	const user = this.props.uid || Fire.shared.uid;
	// 	// console.log(user);

	// 	this.unsubscribe = Fire.shared.firestore
	// 		.collection('users')
	// 		.doc(user)
	// 		.onSnapshot(doc => {
	// 			this.setState({ user: doc.data() })

	// 		});

	// }

	componentWillUnmount() {
		this.unsubscribe();
	}
	onCollectionUpdate = (querySnapshot) => {
		let cur = [];
		querySnapshot.forEach((doc) => {
			cur.push({
				id: doc.id,
				name: this.state.user.name,
				text: doc.data().text,
				timestamp: doc.data().timestamp,
				avatar: require('../images/IILogo.png'),
				// image: doc.data().image
			});
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
					style={styles.postavatar}
					source={
						this.state.user.avatar
							? { uri: this.state.user.avatar }
							: require("../assets/images/robot-dev.png")
					}
				/>
				<View style={{ flex: 1 }}>
					{/* <Text>{post.name}</Text> */}
					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'space-between',
							alignItems: 'center'
						}}
					>
					</View>

					<Text style={styles.post}>{post.text}</Text>
				</View>
			</View>
		);
	};


	handlePickAvatar = async () => {
        UserPermissions.getCameraPermission();

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3]
        });

        if (!result.cancelled) {
			// this.setState({ user : { ...this.state.user, avatar: result.uri } });
			Fire.shared.updateProfilePicture(result.uri);
			console.log("updated profile");
        }
	};
	
	render() {
		return (
			<View style={styles.container}>
				<View style={{ marginTop: 64, alignItems: "center" }}>
					<View style={styles.avatarContainer}>
						<Avatar
							// style={styles.avatar}
							size="xlarge"
							rounded
							source={
								this.state.user.avatar
									? { uri: this.state.user.avatar }
									: require("../assets/images/robot-dev.png")
							}
							showEditButton
							onEditPress={this.handlePickAvatar}
						/>
					</View>
					<Text style={styles.info}>{this.state.user.name}</Text>
					<Text style={styles.text}>{this.state.user.email}</Text>
					<Text style={styles.text}>Token: 50</Text>

				</View>
				{/* <Button style={{marginTop: 10}} title="Logout" onPress={() => {
					Fire.shared.signOut();
					this.props.navigation.popToTop();
				}} /> */}

				{/* <View style={styles.bodyContent}>
					<Text style={styles.text}>Users Posts</Text>
				</View> */}
				<View style={styles.bodyContent}>
				<FlatList
					style={styles.feed}
					data={this.state.posts}
					renderItem={({ item }) => this.renderPost(item)}
					keyExtractor={item => item.id}
					showsVerticalScrollIndicator={false}
				/>
			</View>

			</View>

		);
	}

}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#413c69"
	},
	avatarContainer: {
		shadowColor: "#151734",
		shadowRadius: 15,
		shadowOpacity: 0.4,
		justifyContent: "center"
	},
	avatar: {
		width: 136,
		height: 136,
		borderRadius: 50,
	},
	info: {
		marginTop: 10,
		fontSize: 16,
		fontWeight: "600",
		color: "white"
	},
	text: {
		color: "white",
	},
	bodyContent: {
		marginTop: 12,
		// borderColor: "black",
		// borderWidth: 2,
		height: "59%",
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
	postavatar: {
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
	post: {
		marginTop: 3,
		fontSize: 14,
		color: 'black'
	},
	postImage: {
		width: undefined,
		height: 150,
		borderRadius: 5,
		marginVertical: 16
	}

});
