import { StyleSheet, Text, View } from 'react-native'
import { colors } from '../global/colors'

const FlatCard = ({children,style}) => {
  return (
    <View style={{...styles.cardContainer,...style}}>
      {children}
    </View>
  )
}

export default FlatCard

const styles = StyleSheet.create({
    cardContainer:{
        backgroundColor: colors.blanco,
        shadowColor: colors.blanco,
        shadowOpacity:1,
        shadowRadius:10,
        shadowOffset: {width: 3,height:5},
        elevation:10,
    }
})