import React, { useState } from "react";
import { Image, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import ImageChooser from "../components/ImageChooser";
import { AuthContext } from "../store";
import Styles from "../styles/Styles";

const Login = () => {
  const { signIn } = React.useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [profileImage, setProfileImage] = useState("");

  const onPressLogin = async () => {
    await signIn({ username, profileImage });
  };

  return (
    <View style={Styles.loginContainer}>
      <Image style={Styles.logo} source={require("../assets/dog-logo.png")}></Image>
      <View style={Styles.nameContainer}>
        <TextInput
          left={<TextInput.Icon name="account" />}
          style={Styles.nameTextInput}
          label="Name"
          onChangeText={(text) => setUsername(text)}
          value={username}
          activeOutlineColor="#000"
          activeUnderlineColor="#000"
          autoComplete={null}
        />
      </View>
      <ImageChooser onSelectImage={(imageBase64) => setProfileImage(imageBase64)} />
      <Button
        icon="login"
        mode="contained"
        color="#1877c9"
        dark
        style={{ padding: 10 }}
        onPress={onPressLogin}
      >
        Begin Chatting
      </Button>
    </View>
  );
};

export default Login;
