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
import UserPermissions from '../utilities/UserPermissions';
import Accordian from '../components/Accordian';
import Colors from '../constants/Colors';

export default class PostScreen extends React.Component {
    
    state = {
      type: '',
      date: '',
      time: '',
      groupSize: '0',
      location: '',
      description: '',
      user: {},
      name: '',
      email: '',
      avatar: '',
      active: false,
      typeData: [
        {
          title: 'Type', 
          data: [
            {key: 'Mock Interview', value: false},
            {key: 'Project', value: false},
            {key: 'Others', value: false},
          ]
        },
        { 
          title: 'Date',
          data: ''
        },
        { 
          title: 'Time',
          data: ''
        },
        {
          title: 'Group Size',
          data: [
            {key: '1', value: false},
            {key: '2', value: false},
            {key: '3', value: false},
            {key: '4', value: false},
            {key: '4+', value: false}
          ]
        },
        {
          title: 'Location',
          data: ''
        }
      ]
    };
    
    componentDidMount() {
        // UserPermissions.getCameraPermission();
      const user = this.props.uid || Fire.shared.uid;
      this.data = Fire.shared.firestore
		  .collection('users')
		  .doc(user)
		  .onSnapshot(doc => {
			this.setState({ 
              user: doc.data(),
              name: doc.data().name,
              email: doc.data().email,
              avatar: doc.data().avatar
            })
		  });
    }

    componentWillUnmount() {
        this.data();
    }

    handlePost = () => {
        // const screen = this.props.navigation.dangerouslyGetState();
        // const idx = screen['index'];
        // const prev_route = screen['routeNames'][idx];
      const user = this.props.uid || Fire.shared.uid;
      Fire.shared
          .addPost({ 
            type: this.state.type,
            date: this.state.date,
            time: this.state.time,
            groupSize: this.state.groupSize,
            location: this.state.location.trim(),
            description: this.state.description.trim(),
            name: this.state.name,
            email: this.state.email,
            avatar: this.state.avatar,
            active: true
          })
          .then(ref => {
            this.setState({ 
              type: '',
              date: '',
              time: '',
              groupSize: '',
              location: '',
              description: '',
              name: '',
              email: '',
              avatar: '',
              active: false
            });
            this.props.navigation.goBack();
          })
          .catch(error => { alert(error) });
    };
    renderAccordians=()=> {
        const items = [];
        for (let item of this.state.typeData) {
            items.push(
                <Accordian 
                    title = {item.title}
                    data = {item.data}
                    update = {this.update}
                />
            );
        }
        return items;
    }
    update=(item, cur)=> {
        this.setState({
            [item]: cur
        })
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={{backgroundColor: Colors.WHITE}}>
                    {this.renderAccordians()}
                </View>
                <View style={styles.inputContainer}>
                    <Text style = {styles.label}>Description</Text>
                    <View style={styles.breaker}/>
                    <TextInput
                        autoFocus={true}
                        multiline={true}
                        numberOfLines={4}
                        style={{ flex: 1, margin: 5 }}
                        placeholder='Please describe your activity'
                        onChangeText={text => this.setState({ description: text })}
                        value={this.state.description}
                    />
                </View>
                <View>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={this.handlePost.bind(this)}
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
    // header: {
    //     flexDirection: 'row',
    //     justifyContent: 'space-between',
    //     paddingHorizontal: 32,
    //     paddingVertical: 12,
    //     borderBottomWidth: 1,
    //     borderBottomColor: '#D8D9DB'
    // },
    // footer: {
    //     flexDirection: 'row',
    //     justifyContent: "center",
    //     paddingHorizontal: 32,
    //     paddingVertical: 12
    // },
    inputContainer: {
        margin: 10,
        height: 200,
        // flexDirection: 'row',
        backgroundColor: "white",
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 1,
        borderRadius:5
    },
    // avatar: {
    //     width: 48,
    //     height: 48,
    //     borderRadius: 24,
    //     marginRight: 16
    // },
    // photo: {
    //     alignItems: 'flex-end',
    //     marginHorizontal: 32
    // },
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
