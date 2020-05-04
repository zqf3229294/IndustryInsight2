import * as React from 'react';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/profile';
import ChannelScreen from '../screens/channel';
import MessengerScreen from '../screens/messenger';
import { MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();
function IndexScreen() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'Home') {
                        iconName = 'home';
                    } else if (route.name === 'Profile') {
                        iconName = 'account-circle';
                    } else if (route.name == 'Channel') {
                        iconName = 'list';
                    } else if (route.name == 'Messenger') {
                        iconName = 'message';
                    }
                    // You can return any component that you like here!
                    return <MaterialIcons name={iconName} size={size} color={color} />;
                }
            })}
            tabBarOptions={{
                activeTintColor: 'blue',
                inactiveTintColor: 'gray',
            }}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Channel" component={ChannelScreen} />
            <Tab.Screen name="Messenger" component={MessengerScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
}

export default IndexScreen;