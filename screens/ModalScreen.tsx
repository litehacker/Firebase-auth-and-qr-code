import React, { useState, useEffect } from "react";
import { Button, StyleSheet } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";

import { Text, View } from "../components/Themed";

export default function ModalScreen() {
  const [hasPermission, setHasPermission] = useState("");
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState("დაასკანერეთ ბარკოდი");

  const askForCameraPermission = async () => {
    await BarCodeScanner.requestPermissionsAsync().then((data) => {
      console.log(data);
      setHasPermission(data.status);
    });
  };

  // Request Camera Permission
  useEffect(() => {
    askForCameraPermission();
  }, []);

  // What happens when we scan the bar code
  const handleBarCodeScanned = ({ type, data }: any) => {
    setScanned(true);
    setText(data);
  };
  // Check permissions and return the screens
  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>კამერა ირთვება...</Text>
      </View>
    );
  }
  if (hasPermission === "") {
    return (
      <View style={styles.container}>
        <Text style={{ margin: 10 }}>კამერასთან წვდომა არაა ნებადართული</Text>
        <Button
          title={"დაასკანერე ბარკოდი"}
          onPress={() => askForCameraPermission()}
        />
      </View>
    );
  }

  // Return the View
  return (
    <View style={styles.container}>
      <View style={styles.barcodebox}>
        {
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={{ height: "200%", width: "100%" }}
          />
        }
      </View>
      <Text style={styles.maintext}>{text}</Text>
      <Button
        title="askForCameraPermission Manually"
        onPress={() => askForCameraPermission()}
      />
      {scanned && (
        <>
          <Button
            title={"Scan again?"}
            onPress={() => {
              setScanned(false);
              setText("");
            }}
            color="tomato"
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 30,
  },
  maintext: {
    fontSize: 16,
    margin: 20,
  },
  barcodebox: {
    alignItems: "center",
    justifyContent: "center",
    height: 300,
    width: 300,
    overflow: "hidden",
    borderRadius: 30,
    backgroundColor: "tomato",
  },
});
