import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, Image } from 'react-native'
import { Card, Button, SearchBar } from 'react-native-elements'


export default class ChannelScreen extends React.Component {
  state = {
    search: '',
  };

  updateSearch = search => {
    this.setState({ search });
  };
  render() {
    const {search} = this.state;

    return (
      <SafeAreaView style={styles.container}>
        {/* <SearchBar
        inputStyle={{ backgroundColor: 'white' }}
        containerStyle={{ backgroundColor: 'white'}}
        placeholderTextColor={'#g5g5g5'}
        placeholder={'Search...'}
      /> */}
        <SearchBar
          placeholder="Search..."
          onChangeText={this.updateSearch}
          value={search}
        />
        <ScrollView>
          {/* Amazon */}
          <Card
            image={require('../images/amazonLogo.jpg')}>
            <Button
              // icon={<Icon name='code' color='#ffffff' />}
              type="clear"
              buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
              title='Amazon Insight'
              onPress={() => { this.props.navigation.navigate('Amazon') }}
            />
          </Card>

          {/* Facebook */}
          <Card
            image={require('../images/facebookLogo.png')}>
            <Button
              // icon={<Icon name='code' color='#ffffff' />}
              type="clear"
              buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
              title='Facebook Insight'
              onPress={() => { this.props.navigation.navigate('Facebook') }}
            />
          </Card>

          {/* Google */}
          <Card
            image={require('../images/GoogleLogo.png')}>
            <Button
              // icon={<Icon name='code' color='#ffffff' />}
              type="clear"
              buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
              title='Google Insight'
              onPress={() => { this.props.navigation.navigate('Google') }}
            />
          </Card>

          {/* Microsoft */}
          <Card
            image={require('../images/msLogo.png')}>
            <Button
              // icon={<Icon name='code' color='#ffffff' />}
              type="clear"
              buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
              title='Microsoft Insight'
              onPress={() => { this.props.navigation.navigate('Microsoft') }}
            />
          </Card>


          {/* Apple */}
          <Card
            image={require('../images/appleLogo.png')}>
            <Button
              // icon={<Icon name='code' color='#ffffff' />}
              type="clear"
              buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
              title='Apple Insight'
              onPress={() => { this.props.navigation.navigate('Apple') }}
            />
          </Card>

          {/* Intel */}
          <Card
            image={require('../images/intelLogo.jpg')}>
            <Button
              // icon={<Icon name='code' color='#ffffff' />}
              type="clear"
              buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
              title='Intel Insight'
              onPress={() => { this.props.navigation.navigate('Intel') }}
            />
          </Card>



        </ScrollView>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#413c69'
  }
});
