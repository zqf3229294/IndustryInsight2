import { useLinking } from '@react-navigation/native';
import { Linking } from 'expo';

export default function(containerRef) {
  return useLinking(containerRef, {
    prefixes: [Linking.makeUrl('/')],
    config: {
      Root: {
        path: 'root',
        screens: {
          Home: 'Home',
          Channel: 'Channel',
          Messenger: 'Messenger',
          Profile: 'Profile'
        },
      },
      Auth: {
          path: 'auth',
          screens: {
              Login: 'Login',
              Register: 'Register'          
          }
      }
    },
  });
}
