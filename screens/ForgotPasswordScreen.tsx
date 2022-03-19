import React from "react";
import {
  KeyboardAvoidingView,
  SafeAreaView,
  Text,
  View,
  TextInput,
  ScrollView,
  Button,
  TouchableOpacity,
} from "react-native";
import { Alert } from "../components/Alert";
import { useAuth } from "../firebaseConfig/context/AuthProvider";
import { HandleError } from "../functions/HandleErrors";
import { mainStyle } from "../styles/main";
import { RootStackScreenProps } from "../types";

export const ForgotPasswordScreen = ({
  navigation,
}: RootStackScreenProps<"Login">) => {
  //const { signIn, currentUser } = useAuth();
  const [email, setEmail] = React.useState("");
  const [code, setCode] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const { resetPassword, currentUser } = useAuth();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");
    await resetPassword(email)
      .then(() => {
        setLoading(false);
        setMessage("Check your Email for futher instructions");
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
            <Text>{error ? error : currentUser && currentUser?.email}</Text>
            <Text>{message}</Text>
            <View style={[mainStyle.inputWrapper, { marginTop: 40 }]}>
              <TextInput
                value={email}
                placeholder="E-mail"
                autoCompleteType="email"
                autoCapitalize="none"
                autoCorrect={false}
                autoFocus={true}
                keyboardType="email-address"
                style={[mainStyle.input]}
                onChangeText={(input) => setEmail(input)}
              />
              {/* <TextInput
                placeholder="Code"
                autoCompleteType="off"
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry
                style={mainStyle.input}
                value={code}
                onChangeText={(input) => setCode(input)}
              /> */}
            </View>
          </View>

          <View
            style={[
              mainStyle.buttonContainer,
              {
                marginTop: 60,
                marginBottom: 45,

                flexDirection: "row",
                paddingHorizontal: 10,
                justifyContent: "space-between",
              },
            ]}
          >
            <TouchableOpacity
              style={[mainStyle.button, { backgroundColor: "#404CB2" }]}
              accessibilityLabel="Login"
              onPress={handleSubmit}
            >
              <Text style={mainStyle.buttonPrimaryTitle}>Reset</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[mainStyle.buttonOutline]}
              onPress={() => {
                navigation.navigate("Login");
              }}
              accessibilityLabel="Login"
            >
              <Text style={mainStyle.buttonSecondaryTitle}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
