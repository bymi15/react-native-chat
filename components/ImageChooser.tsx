import * as ImageManipulator from "expo-image-manipulator";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";
import { Button } from "react-native-paper";
import Styles from "../styles/Styles";

type ImageChooserProps = {
  onSelectImage: (imageBase64: string) => void;
};

const ImageChooser = ({ onSelectImage }: ImageChooserProps) => {
  const [image, setImage] = useState("");

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Camera roll permissions are required for this app.");
      }
    })();
  }, []);

  const selectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
    });

    if (!result.cancelled) {
      var resizedImage = await ImageManipulator.manipulateAsync(
        result.uri,
        [{ resize: { width: 50, height: 50 } }],
        { base64: true }
      );
      var imageBase64 = resizedImage.base64 ?? "";
      setImage(result.uri);
      onSelectImage(imageBase64);
    }
  };

  return (
    <View style={Styles.selectImageContainer}>
      <Button icon="upload" mode="contained" color="#000" onPress={selectImage}>
        Select profile image
      </Button>
      {image ? (
        <Image resizeMode="cover" source={{ uri: image }} style={Styles.avatarBig} />
      ) : (
        <Text style={{ alignSelf: "center", paddingTop: 5 }}>No image selected</Text>
      )}
    </View>
  );
};

export default ImageChooser;
