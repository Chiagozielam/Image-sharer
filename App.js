import React, { useState } from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Sharing from "expo-sharing";
import Home from "./screens/home";
import logo from "./assets/logo.png";

export default function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.cancelled === true) {
      return;
    }
    setSelectedImage({ localUri: pickerResult.uri });
  };

  let openShareDialogAsync = async () => {
    if (!(await Sharing.isAvailableAsync())) {
      alert("Ooops, sharing isn't available on your platform");
      return;
    }

    Sharing.shareAsync(selectedImage.localUri);
  };

  if (selectedImage !== null) {
    return (
      <View style={styles.container}>
        <Image
          source={{ uri: selectedImage.localUri }}
          style={styles.thumbnail}
        />
        <TouchableOpacity
          onPress={() => setSelectedImage(null)}
          style={{
            backgroundColor: "red",
            padding: 20,
            borderRadius: 5,
            marginTop: "5%",
            marginBottom: "5%",
          }}
        >
          <Text style={styles.buttonText}>Clear Image</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={openShareDialogAsync} style={styles.button}>
          <Text style={styles.buttonText}>Share this photo</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <Text style={styles.header}>
        To share a photo from your phone with a friend, just press the button
        below!
      </Text>

      <TouchableOpacity onPress={openImagePickerAsync} style={styles.button}>
        <Text style={styles.buttonText}> Pick a photo </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 305,
    height: 159,
  },
  header: {
    color: "#888",
    textAlign: "center",
    fontSize: 18,
    marginTop: 5,
    marginHorizontal: 15,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "blue",
    padding: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
    color: "#fff",
  },
  thumbnail: {
    width: 300,
    height: 300,
    resizeMode: "contain",
  },
});
