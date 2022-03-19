import { useState } from "react";
import { Button, StyleSheet } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { useAuth } from "../firebaseConfig/context/AuthProvider";
import { HandleError } from "../functions/HandleErrors";
import { RootTabScreenProps } from "../types";

export default function Home({ navigation }: RootTabScreenProps<"Home">) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signOut, currentUser } = useAuth();
  const handleLogout = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    await signOut()
      .then(() => {
        setLoading(false);
        console.log("sign out successfully");
      })
      .catch((e) => {
        setLoading(false);
        setError(HandleError(e));
      });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Hello,{" "}
        {currentUser?.displayName
          ? currentUser?.displayName
          : currentUser?.email}
      </Text>
      <Text>{error}</Text>
      <Button title="Sign Out" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
