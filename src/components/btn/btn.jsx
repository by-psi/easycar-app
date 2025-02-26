/**
 * src/components/btn/btn.jsx
 */

import { StyleSheet, TouchableOpacity, Text } from "react-native";

export default function MyButton(props) {
  return (
    <TouchableOpacity 
      style={props.theme === "red" ? styles.btnRed : styles.btnYellow}
      onPress={()=>props.onClick()}
    >
      <Text style={props.theme === "red" ? styles.textLight : styles.textDark}>
        {props.text}
      </Text>
    </TouchableOpacity> 
  )
}

const styles = StyleSheet.create({
  btnYellow: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F7D600",
    height: 50
  }, 
  textDark: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 18
  },
  btnRed: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F05656",
    height: 50
  }, 
  textLight: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 18
  }
});