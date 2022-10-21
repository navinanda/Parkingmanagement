import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, SafeAreaView, Alert, ToastAndroid, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './RootStackPrams';
import { ParkingContext } from '../context/ParkingContext';
import { styles } from '../Styles/Styles';

type ParkingLotCreationProp = StackNavigationProp<RootStackParamList, 'ParkingLotCreation'>;

const ParkingLotCreation = () => {
    const navigation = useNavigation<ParkingLotCreationProp>();
    const { dispatch } = useContext(ParkingContext);
    const [text, onChangeText] = useState("");
    
    const alotParking = () => {
      try {
        const value = parseInt(text);
        const array: any[] = [];
        for(let i = 0; i < value; i++) {
          array.push({
            id: i+1,
            slot: false,
            carReg: '',
            time: '',
          });
        };
        dispatch({
          type: 'setParkingLot',
          payload: array,
        });
        onChangeText('');
        navigation.navigate('ParkingLotDrawing', {refresh: false});
      } 
      catch(error) {
        console.log(error);
      }
    };

    return (
      <SafeAreaView style={styles.lotContainer}>
        <View>
          <Text style={styles.lotTitle}>Parking Management</Text>
          <TextInput
            style={styles.lotInput}
            onChangeText={text=> onChangeText(text)}
            value={text}
            placeholder="Enter number of parking spaces"
            keyboardType='numeric'
            testID='Parking-create-text-input'
          />
        </View>
        <TouchableOpacity
          style={[
            styles.lotButton,
            { backgroundColor: text && text !== '' ? '#0451B4' : '#d5d5d5' }
          ]}
          onPress={()=>{
            if(text.length > 3) {
              Platform.OS === 'android' ?
              ToastAndroid.show("Maximum 3 digit available.", ToastAndroid.LONG) :
              Alert.alert("Maximum 3 digit available.")
            }
            const regexCheck = /^\d{1,3}$/.test(text)
            regexCheck ?
            alotParking() :
            Platform.OS === 'android' ?
            ToastAndroid.show("Enter number.", ToastAndroid.LONG) :
            Alert.alert("Enter number.");
          }}
          testID='Parking-create-submit-button'
        >
          <Text style={[styles.lotButtonText,{ color: text && text !== '' ? "#FFF" : '#9da2a5' }]}>Submit</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  export default ParkingLotCreation;
