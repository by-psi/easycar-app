/**
 * src/components/btn/btn.jsx
 */

import { StyleSheet, TouchableOpacity, Text } from "react-native";

export default function MyButton(props) {
  // Define a cor do fundo e do texto com base no tema
  let btnStyle = styles.btnYellow;
  let textStyle = styles.textDark;

  if (props.theme === "red") {
      btnStyle = styles.btnRed;
      textStyle = styles.textLight;
  } else if (props.theme === "dark") {
      btnStyle = styles.btnDark;
      textStyle = styles.textLight;
  }

  return (
      <TouchableOpacity style={btnStyle} onPress={()=>props.onClick()}>
          <Text style={textStyle}>
              {props.text}
          </Text>
      </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btnYellow: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F7D600",
    height: 50
  }, 
  btnRed: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F05656",
    height: 50
  }, 
  btnDark: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000",
    height: 50
  }, 
  textDark: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 18
  },
  textLight: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 18
  }
});