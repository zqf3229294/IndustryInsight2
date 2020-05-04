import React, {Component} from 'react';
import { View, TouchableOpacity, Text, StyleSheet, FlatList, TextInput, Button} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import Colors from '../constants/Colors';
import DateTimePicker from '@react-native-community/datetimepicker';

export default class Accordian extends Component{
    constructor(props) {
      super(props);
      this.state = { 
        data: props.data,
        expanded : false,
        date: new Date().toString().slice(0,15),
        time: new Date().toString().slice(16,21),
        mode: 'date',
        show: false
      }
    }
    toggleExpand=()=>{
        this.setState({expanded : !this.state.expanded})
    }
    // choose type or group size
    onClickList=(index)=>{
        const temp = this.state.data.slice()
        const cur = temp[index]
        cur.value = !cur.value
        if (cur.value) {
            for (let item of temp) {
                if (item !== cur){
                    item.value = false
                }
            }
        }
        this.setState({data: temp})
        this.props.update(this.props.title == 'Type' ? 'type' : 'groupSize', cur.key)
    }
    // change date or time
    onChange = (event, selectedDate) => {
        const currentDate = selectedDate.toString()
        const cur = this.props.title == 'Date' ? currentDate.slice(0,15) : currentDate.slice(16,21)
        if (this.props.title == 'Date') {
            this.setState({
                show: (Platform.OS === 'ios'),
                date: cur
            })
            this.props.update('date', cur)
        }
        else {
            this.setState({
                show: (Platform.OS === 'ios'),
                time: cur
            })
            this.props.update('time', cur)
        }
    }
  
    showMode = (currentMode) => {
        this.setState({
            show: !this.state.show,
            mode: currentMode
        })
    }
  
    showDatepicker = () => {
      this.showMode('date');
    }
  
    showTimepicker = () => {
      this.showMode('time');
    }
  
    render() {
    return (
        <View>
            <TouchableOpacity style={styles.row} onPress={this.toggleExpand}>
                <Text style={styles.title}>{this.props.title}</Text>
                <Icon 
                name={this.state.expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} 
                size={30}
                color={Colors.DARKGRAY} 
                />
            </TouchableOpacity>
            <View style={styles.parentHr}/>
            {
                this.state.expanded && (this.props.title == 'Date' || this.props.title == 'Time') &&
                <View>
                    <Button 
                    onPress={this.props.title == 'Date' ? this.showDatepicker : this.showTimepicker} 
                    title={this.props.title == 'Date' ? this.state.date : this.state.time} 
                    />
                    {
                    this.state.show &&
                    <DateTimePicker
                        value={new Date()}
                        mode={this.state.mode}
                        is24Hour={true}
                        display="default"
                        onChange={this.onChange}
                    />
                    }
                </View>
            }
            {
                this.state.expanded && (this.props.title == 'Type' || this.props.title == 'Group Size') &&
                <View style={{}}>
                    <FlatList
                    data={this.state.data}
                    numColumns={1}
                    scrollEnabled={false}
                    renderItem={({item, index}) => 
                        <View>
                        <TouchableOpacity style={item.value ? styles.itemActive : styles.item} onPress={()=>this.onClickList(index)}>
                            <Icon 
                            name={'check-circle'} 
                            size={24} 
                            color={ item.value ? Colors.GREEN : Colors.LIGHTGRAY} 
                            />
                            <Text style={{paddingLeft: 30}}>{item.key}</Text>
                        </TouchableOpacity>
                        </View>
                    }/>
                </View>
            }
            {
                this.state.expanded && this.props.title == 'Location' &&
                <View style={styles.locContainer}>
                    <TextInput
                    autoFocus={true}
                    multiline={true}
                    numberOfLines={2}
                    style={{ flex: 1, margin: 5 }}
                    placeholder='Add the location of your activity'
                    onChangeText={text => this.props.update('location', text)}
                    />
                </View>
            }
        </View>
    )
    }
}

const styles = StyleSheet.create({
    container:{
      justifyContent: 'center',
      alignItems: 'center'
    },
    item:{
      width:'100%',
      height:54,
      alignItems:'center',
      paddingLeft:35,
      paddingRight:35,
      fontSize: 12,
      flexDirection: 'row',
      justifyContent:'flex-start',
    },
    itemActive:{
      width:'100%',
      height:54,
      alignItems:'center',
      paddingLeft:35,
      paddingRight:35,
      fontSize: 12,
      flexDirection: 'row',
      justifyContent:'flex-start',
      backgroundColor: Colors.GRAY,
    },
    title:{
      fontSize: 14,
      fontWeight:'bold'
    },
    row:{
      flexDirection: 'row',
      justifyContent:'space-between',
      height:60,
      paddingLeft:25,
      paddingRight:20,
      alignItems:'center' 
    },
    parentHr:{
      height:1,
      borderBottomColor: Colors.LIGHTGRAY,
      borderBottomWidth: 1,
    },
    locContainer: {
      margin: 10,
      height: 100,
      backgroundColor: "white",
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.5,
      shadowRadius: 1,
      borderRadius:5
    }
});