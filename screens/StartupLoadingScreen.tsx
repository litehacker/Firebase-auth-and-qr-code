import React, { useEffect, useState } from "react";
import { Button, SafeAreaView } from "react-native";
import { PercentageBar } from "../components/progressBar";
import { View, Text } from "../components/Themed";
import { mainStyle } from "../styles/main";
import { RootStackScreenProps } from "../types";

export const StartupLoadingScreen = ({
  navigation,
}: RootStackScreenProps<"StartupLoadingScreen">) => {
  const [loading, setLoading] = React.useState(true);
  const [percentage, setPercentage] = React.useState(0);

  React.useEffect(() => {
    for (let i = 0; i < 100; i++)
      setTimeout(() => {
        setPercentage((prev) => prev + 1);
      }, 0);
  }, []);

  React.useEffect(() => {
    if (percentage === 100) {
      console.log("renavigate to LOGIN 2");
    }
  }, [percentage]);

  return (
    <SafeAreaView style={mainStyle.container}>
      <View>
        <Text
          lightColor="#3D6670"
          style={{
            textAlign: "center",
            marginBottom: "50%",
            fontWeight: "bold",
            fontSize: 34,
          }}
        >
          საფულე
        </Text>
        <PercentageBar
          key={percentage}
          style={{ minWidth: "80%", maxWidth: 500 }}
          percentage={percentage}
        />
        <Text
          lightColor="#3D6670"
          style={{ textAlign: "center", marginTop: 30 }}
        >
          2022 ყველა უფლება დაცულია
        </Text>
        <Button
          onPress={() => {
            console.log("Pressed");
            navigation.navigate("Login");
          }}
          title="Login"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
      </View>
    </SafeAreaView>
  );
};
