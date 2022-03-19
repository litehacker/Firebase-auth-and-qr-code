import React from "react";
import { View, Text } from "react-native";

export const Alert = ({
  variant,
  children,
}: {
  variant: "danger";
  children: string;
}) => {
  return (
    <View>
      <Text>{children}</Text>
    </View>
  );
};
