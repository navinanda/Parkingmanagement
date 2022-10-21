import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, Alert, Platform, ToastAndroid } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import moment from 'moment';
import { RootStackParamList } from './RootStackPrams';
import { ParkingContext } from '../context/ParkingContext';
import { styles } from '../Styles/Styles';

type CarDeregisterScreenRrop = StackNavigationProp<RootStackParamList, 'CarDeregisterScreen'>;

const CarDeregisterScreen = () => {
    const { state } = useContext(ParkingContext);
    const navigation = useNavigation<CarDeregisterScreenRrop>();

    const [timeSpent, setTimeSpent] = useState(2);
    const [carReg, setCarReg] = useState("");
    const [charge, setCharge] = useState(10);

    useEffect(() => {
      const { checkout } = state;
      const { carReg, time } = checkout;
      var hours = moment().diff(time, 'hours');
      let charge = 10;
      if(hours > 2) {
        const amount = (hours - 2) * 10;
        charge = 10 + amount;
        setTimeSpent(hours);
      } else {
        charge = 10;
      };
      setCarReg(carReg);
      setCharge(charge);
    }, []);

    const paymentTaken = async () => {
      const { checkout, list } = state;
      const parkingLot = list.filter((el) => el.id === checkout.id);
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ carRegistration: carReg, charge: charge })
      };
      try {
        await fetch('https://httpstat.us/200', requestOptions)
          .then(response => { 
            parkingLot[0].slot = false,
            parkingLot[0].carReg = '',
            parkingLot[0].time = '',
            Platform.OS === 'android' ?
            ToastAndroid.show("Success.", ToastAndroid.LONG) :
            Alert.alert("Success.");
            navigation.navigate('ParkingLotDrawing', {refresh: true});
          })
      }
      catch (error) {
        console.error(error);
      };
    };
    
    return (
      <SafeAreaView>
        <TouchableOpacity
          style={[styles.carRegBackButton, styles.alignItemCenter, styles.backgroundColorBlue]}
          onPress={()=>{
            navigation.goBack();
          }}
          testID='deregister-back-button'
        >
          <Text style={[styles.fontSize16, styles.colorWhite]}>GO BACK</Text>
        </TouchableOpacity>
        <View 
          style={{
            borderWidth: 5,
            borderRadius: 10,
            borderColor: '#C6D5F4',
            paddingHorizontal: 10,
            paddingVertical: 10,
            marginVertical: 25,
            marginHorizontal: 4,
          }}
        >
          <View style={styles.carRegTextContainer}>
            <Text style={[styles.fontSize18, styles.colorBlack]}>Car Registration:</Text>
            <Text style={[styles.fontSize18, styles.colorBlack, styles.textTransformUp]}>{carReg}</Text>
          </View>
          <View style={styles.carRegTextContainer}>
            <Text style={[styles.fontSize18, styles.colorBlack]}>Time Spent:</Text>
            <Text style={[styles.fontSize18, styles.colorBlack]} testID='deregister-time-spent'>{timeSpent} hours</Text>
          </View>
          <View style={styles.carRegTextContainer}>
            <Text style={[styles.fontSize18, styles.colorBlack]}>Parking Charges:</Text>
            <Text style={[styles.fontSize18, styles.colorBlack]} testID='deregister-charge'>$ {charge}</Text>
          </View>          
        </View>
        <View style={styles.marginHorizontal15}>
          <TouchableOpacity
            style={[styles.carRegButtonContainer, styles.alignItemCenter, styles.backgroundColorBlue, styles.alignSelfCenter]}
            onPress={()=>{
              paymentTaken();
            }}
            testID='deregister-payment-button'
          >
            <Text style={[styles.fontSize16, styles.colorWhite]}>PAYMENT TAKEN</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  export default CarDeregisterScreen;