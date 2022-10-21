import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, SafeAreaView, FlatList, ToastAndroid, Platform, Alert } from 'react-native';
import moment from 'moment';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './RootStackPrams';
import { ParkingContext } from '../context/ParkingContext';
import { styles } from '../Styles/Styles';

type ParkingLotDrawingProp = StackNavigationProp<RootStackParamList, 'ParkingLotDrawing'>;

const ParkingLotDrawing = ({route}: any) => {
  const navigation = useNavigation<ParkingLotDrawingProp>();
  const { state, dispatch } = useContext(ParkingContext);

  const currentTime = moment();

  const [isShowView, setShowView] = useState(false);
  const [carReg, setCarReg] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [time, setTime] = useState(currentTime);

  useEffect(()=>{
    const filterSlot = state.list.filter((el)=> el.slot);
    if(filterSlot.length  === state.list.length) {
      Platform.OS === 'android' ?
      ToastAndroid.show("Parking is FULL.", ToastAndroid.LONG) :
      Alert.alert("Parking is FULL.");
    };
  },[route.refresh]);

  const createParkingSlot = () => {
    const filterSlot = state.list.filter((el)=> !el.slot);
    if(filterSlot.length > 0) {
      const randomNum = Math.floor(Math.random() * filterSlot.length);
      const valueAtIndex = filterSlot[randomNum];
      valueAtIndex.carReg = carReg;
      valueAtIndex.time = moment(time).format();
      valueAtIndex.slot = true;
      setCarReg('');
    } else {
      Platform.OS === 'android' ?
      ToastAndroid.show("Parking is FULL.", ToastAndroid.LONG) :
      Alert.alert("Parking is FULL.");
      setCarReg('');
    };
    setShowView(false);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: any) => {
    let time = moment(date);
    setTime(time);
    hideDatePicker();
  };

  const showTime = () => {
    return moment(time).format('hh:mm A');
  };

  const renderItem = (item: any) => {
    const { id, slot, carReg } = item.item;
    return (
      <TouchableOpacity 
        style={[styles.itemContainer, styles.alignItemCenter, styles.borderWidth1,{ 
          backgroundColor: slot ? '#0451B4' : '#EFEFEF',
          borderWidth: slot ? 0 : 1}
        ]} 
        onPress={()=>{
          if(slot) {
            navigation.navigate('CarDeregisterScreen');
            dispatch({
              type: 'setChekout',
              payload: item.item,
            });
          }
        }}
        testID={`parking-drawing-space-number-${id}`}
      >
        {!slot ? (
          <Text style={[styles.fontSize20, styles.fontWeight600]}>{id}</Text>
        ) : (
          <View style={styles.alignItemCenter}>
            <Text style={[styles.fontSize20, styles.fontWeight600, styles.colorWhite]}>{id}</Text>
            <Text style={[styles.textTransformUp, styles.fontSize18, styles.colorWhite, styles.fontWeight600]}>{carReg}</Text>
            <Text style={[styles.fontSize12, styles.colorWhite]}>tap to checkout</Text>
          </View>
        )}
      </TouchableOpacity>
    )
  };
  
  return (    
    <SafeAreaView style={styles.drawContainer}>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        date={new Date()}
        mode="time"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      <FlatList
        data={state.list}
        renderItem={renderItem}
        extraData={state.list}
        keyExtractor={item => item.id}
        numColumns={2}
        style={styles.flatList}
        showsVerticalScrollIndicator={false}
      />
      {isShowView ? (
        <View style={[styles.bottomPopContainer, styles.paddingHorizontal15]}>
          <View style={styles.marginBottom15}>
            <Text style={[styles.fontSize18, styles.colorBlack]}>Parking Time (tap to change):</Text>
            <TouchableOpacity
              style={[styles.backgroundColorBlue, styles.timeInput, styles.borderRadius5, styles.borderWidth1, styles.alignSelfCenter]}
              onPress={()=>{
                setDatePickerVisibility(true);
              }}
            >
              <Text style={[styles.paddingLeft10, styles.fontSize18, styles.colorBlack]}>{showTime()}</Text>
            </TouchableOpacity>
            <Text style={[styles.fontSize18, styles.colorBlack, styles.marginTop10]}>Car Registration:</Text>
            <TextInput
              style={[styles.carRegInput, styles.fontSize18, styles.paddingHorizontal15, styles.borderRadius5, styles.borderWidth1]}
              onChangeText={text=> setCarReg(text)}
              value={carReg}
              placeholder="Enter Car Registration"
              testID='parking-drawing-registration-input'
            />
          </View>
          <View style={styles.bottomPopButton}>
            <TouchableOpacity
              style={[styles.lotButtonContainer, styles.alignItemCenter, styles.paddingVertical10, styles.borderRadius5]}
              onPress={()=>{
                setShowView(false);
              }}
            >
              <Text style={[styles.fontSize16, styles.colorWhite]}>CLOSE</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.lotButtonContainer, styles.alignItemCenter, styles.paddingVertical10, styles.borderRadius5]}
              onPress={()=>{
                if(carReg === '') return;
                createParkingSlot();
              }}
              testID='parking-drawing-add-carbutton'
            >
              <Text style={[styles.fontSize16, styles.colorWhite]}>SUBMIT</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={{paddingVertical: 15}}>
          <TouchableOpacity
            style={[styles.buttonContainer, styles.backgroundColorBlue, styles.alignItemCenter, styles.paddingVertical10]}
            onPress={()=>{
              setTime(currentTime);
              setShowView(true);
            }}
          >
            <Text style={[styles.fontSize16, styles.colorWhite]}>ADD NEW PARKING</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

export default ParkingLotDrawing;