import React, { useEffect, useState } from "react";

import { FlexStyle, StyleSheet, Text, View } from "react-native";

export const PercentageBar = ({
  percentage,
  style,
}: {
  style?: FlexStyle;
  percentage?: any;
}) => {
  return (
    <View>
      <View
        style={{
          justifyContent: "center",
          minWidth: 300,
        }}
      >
        <View
          style={{
            width: "100%",
            height: 16,
            borderRadius: 8,
            borderColor: "#DDDDDD",
            borderWidth: 5,
          }}
        >
          <View
            style={{
              width: percentage ? percentage + "%" : 0 + "%",
              height: 6,
              borderRadius: 5,
              backgroundColor: "#404CB2",
            }}
          />
        </View>
      </View>
    </View>
  );
};
