import React from "react";
import { Button, Image, Text, View } from "react-native";
import { AuthContext } from "../store";
import Styles from "../styles/Styles";
import { IMAGE_PREFIX, UNKNOWN_AVATAR_IMAGE } from "../utils/constants";

const Settings = () => {
  const { state, signOut } = React.useContext(AuthContext);

  return (
    <View style={{ flex: 1, paddingTop: 10, alignItems: "center" }}>
      <Text>You are currently logged in as {state.username}.</Text>
      <Image
        resizeMode="cover"
        source={{
          uri: IMAGE_PREFIX + (state.profileImage || UNKNOWN_AVATAR_IMAGE),
        }}
        style={Styles.avatarBig}
      />
      <Button title="Logout" onPress={signOut} />
    </View>
  );
};

export default Settings;
