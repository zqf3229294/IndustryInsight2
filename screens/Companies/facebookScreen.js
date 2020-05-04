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



export default class FaceBookScreen extends React.Component {
    constructor(props) {
        super(props);
        this.ref = firebase.firestore().collection('facebookPosts');
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
				name: this.state.user.name,
				text: doc.data().text,
				timestamp: doc.data().timestamp,
				avatar: require('../../images/IILogo.png'),
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
					style={styles.avatar}
					source={
						this.state.user.avatar
							? { uri: this.state.user.avatar }
							: require("../../assets/images/robot-dev.png")
					}
				/>
				{/* <Image source={post.avatar} style={styles.avatar} /> */}
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

    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Button
                        disabledStyle={true}
                        title="Post Insights..."
                        color="#f194ff"
                        // onPress={() => this.props.navigation.navigate('PostScreen')}
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
    
});

// export default AmazonScreen;