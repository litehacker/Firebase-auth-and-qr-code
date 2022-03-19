import React from "react";
import {
  KeyboardAvoidingView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useAuth } from "../firebaseConfig/context/AuthProvider";
import { HandleError } from "../functions/HandleErrors";
import { mainStyle } from "../styles/main";
import { RootStackScreenProps } from "../types";
import { SafeAreaView } from "react-native-safe-area-context";

export const LoginScreen = ({ navigation }: RootStackScreenProps<"Login">) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const { signIn, currentUser } = useAuth();

  const handleSubmit = (e: any) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    console.log("submitted");
    signIn(email, password)
      .then(() => {
        console.log("successful Login");
      })
      .catch((e) => {
        setLoading(false);
        setError(HandleError(e));
      });
  };

  return (
    <SafeAreaView style={{ height: "100%" }}>
      <KeyboardAvoidingView>
        <View style={{ height: "50%" }}>
          <View
            style={{
              height: "100%",
              marginTop: 0,
            }}
          >
            <Text style={[mainStyle.title, { textAlign: "center" }]}>
              Login Screen
            </Text>
            <Text style={{ color: "red" }}>
              {error ? error : currentUser && currentUser?.email}
            </Text>
            <View style={[mainStyle.inputWrapper, { marginTop: 40 }]}>
              <TextInput
                value={email}
                placeholder="E-mail"
                autoCompleteType="email"
                autoCapitalize="none"
                autoCorrect={false}
                autoFocus={true}
                keyboardType="email-address"
                style={[mainStyle.input, mainStyle.input_splited]}
                onChangeText={(input) => setEmail(input)}
              />
              <TextInput
                placeholder="Password"
                autoCompleteType="off"
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry
                style={mainStyle.input}
                value={password}
                onChangeText={(input) => setPassword(input)}
              />
            </View>
          </View>

          <View
            style={[
              mainStyle.buttonContainer,
              {
                marginTop: 60,
                marginBottom: 20,
                flexDirection: "row",
                paddingHorizontal: 10,
                justifyContent: "space-between",
              },
            ]}
          >
            <TouchableOpacity
              disabled={loading}
              style={[mainStyle.button, { backgroundColor: "#404CB2" }]}
              accessibilityLabel="Login"
              onPress={handleSubmit}
            >
              <Text style={mainStyle.buttonPrimaryTitle}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={loading}
              style={[mainStyle.buttonOutline]}
              onPress={(e) => {
                e.preventDefault();
                navigation.navigate("Register");
              }}
              accessibilityLabel="Register"
            >
              <Text style={mainStyle.buttonSecondaryTitle}>Register</Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: "row",
              paddingHorizontal: 10,
            }}
          >
            <TouchableOpacity
              disabled={loading}
              onPress={() => {
                navigation.navigate("ForgotPassword");
              }}
              accessibilityLabel="Reset Password"
            >
              <Text style={mainStyle.buttonSecondaryTitle}>
                Forgot Password?
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
