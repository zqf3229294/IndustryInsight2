import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import ChannelCard from '../components/ChannelCard';

function ChannelScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <ChannelCard url={require('../images/amazonLogo.jpg')} />
        <ChannelCard url={require('../images/facebookLogo.png')} />
        <ChannelCard url={require('../images/GoogleLogo.png')} />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  }
});

export default ChannelScreen;