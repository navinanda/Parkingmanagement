import { Dimensions, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    alignItemCenter: {
      alignItems: 'center',
    },
    alignSelfCenter: {
      alignSelf: 'center',
    },
    colorWhite: {
      color: "#FFF",
    },
    colorBlack: {
      color: '#000'
    },
    backgroundColorBlue: {
      backgroundColor: '#0451B4',
    },
    fontSize12: {
      fontSize: 12, 
    },
    fontSize16: {
      fontSize: 16, 
    },
    fontSize18: {
      fontSize: 18
    },
    fontSize20: {
      fontSize: 20, 
    },
    fontWeight600: {
      fontWeight: '600'
    },
    textTransformUp: {
      textTransform: 'uppercase', 
    },
    marginBottom15: {
      marginBottom: 15,
    },
    marginTop10: {
      marginTop: 10,
    },
    marginHorizontal15: {
      marginHorizontal: 15
    },
    paddingLeft10: {
      paddingLeft: 10, 
    },
    paddingHorizontal15: {
      paddingHorizontal: 15, 
    },
    paddingVertical10: {    
      paddingVertical: 10,
    },
    borderWidth1: {    
      borderWidth: 1, 
    },
    borderRadius5: {
      borderRadius: 5,
    },
    drawContainer: {
      flex: 1,
      backgroundColor: '#f5efef',
    },
    lotContainer: {
      flex: 1,
      alignItems: 'center', 
      justifyContent: 'center', 
      backgroundColor: '#FFF', 
    },
    lotTitle: {
      textAlign: 'center',
      fontSize: 22,
      color: '#000',
      marginBottom: 20,
    },
    lotInput: {
      height: 50,
      width: Dimensions.get('window').width - 100,
      borderWidth: 1,
      borderRadius: 5,
      paddingHorizontal: 15,
      backgroundColor: '#f6f6f6',
      borderColor: '#c9c9c9',
      fontSize: 18,
    },
    lotInputText: {
      fontSize: 14, 
      color: '#9698a8',
    },
    lotButton: {
      borderRadius: 5,
      marginTop: 30,
      paddingHorizontal: 50,
      paddingVertical: 12,
      backgroundColor: '#d5d5d5',
    },
    lotButtonText: {
      fontSize: 18,
      color: '#9da2a5',
    },
    buttonContainer: {
      width: Dimensions.get('window').width - 30,
      alignSelf: 'center',
    },
    lotButtonContainer: {
      width: Dimensions.get('window').width/2 - 25,
      backgroundColor: '#0451B4',
    },
    timeInput: { 
      alignItems: 'flex-start', 
      backgroundColor: '#FFF', 
      borderColor: '#0451B4', 
      paddingVertical: 8,
      width: Dimensions.get('window').width - 30,
    },
    carRegInput: {
      height: 45,
      width: Dimensions.get('window').width - 30,
      backgroundColor: '#f6f6f6',
      borderColor: '#c9c9c9',
    },
    itemContainer: {
      backgroundColor: '#EFEFEF',
      marginVertical: 10,
      marginHorizontal: 20,
      width: Dimensions.get('window').width/2 - 50,
      height: Dimensions.get('window').height/8,
      justifyContent: 'center',
      borderColor: '#13B86B',
    },
    flatList: {
      flex: 1,
      marginTop: 20,
      marginHorizontal: 12,
    },
    bottomPopContainer: {
      backgroundColor: '#FFF', 
      paddingVertical: 15
    },
    bottomPopButton: { 
      flexDirection: 'row', 
      justifyContent: 'space-between' 
    },
    carRegTextContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderBottomWidth: 1,
      borderColor: '#ACADB0',
      paddingVertical: 5,
    },
    carRegBackButton: {
      width: Dimensions.get('window').width/4,
      paddingVertical: 8,
    },
    carRegButtonContainer: {
      borderRadius: 5,
      width: Dimensions.get('window').width - 30,
      paddingVertical: 10,
    },
  });

  export { styles };