import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, settext] = useState("Not yet scanned");

  const askForcameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status == "granted");
    })();
  };
  // Request Camera Permission
  useEffect(() => {
    askForcameraPermission();
  }, []);

  // What Happens when we scane barcode
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    settext(data);
    console.log("Type : " + type + "\nData : " + data);
  };

  // check permission and Return the Screens
  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting for Camera Permission</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text>No Access to Camera...</Text>
        <Button
          title={"Allow Camera"}
          onPress={() => askForcameraPermission()}
        />
      </View>
    );
  }

  // Return the View
  return (
    <View style={styles.container}>
      <View style={styles.barcodeBox}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{ height: 400, width: 400 }}
        ></BarCodeScanner>
        <Taxt style={styles.mainText}>{text}</Taxt>

        {scanned && (
          <Button
            title={"Scan again"}
            onPress={() => setScanned(false)}
            color="tomato"
          />
        )}
      </View>
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
  barcodeBox: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    height: 300,
    width: 300,
    overflow: "hidden",
    borderRadius: 30,
    backgroundColor: "tomato",
  },

  mainText: {
    fontSize: 16,
    margin: 20,
  },
});
