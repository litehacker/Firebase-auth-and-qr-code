import { doc, setDoc } from "firebase/firestore/lite";
import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useAuth } from "../firebaseConfig/context/AuthProvider";
import { db } from "../firebaseConfig/context/firebase";
import { HandleError } from "../functions/HandleErrors";
import { validatePhoneNumber } from "../functions/Validations";
import { mainStyle } from "../styles/main";
import { RootStackScreenProps } from "../types";
import { SafeAreaView } from "react-native-safe-area-context";

export const RegisterScreen = ({
  navigation,
}: RootStackScreenProps<"Register">) => {
  const { signUp, currentUser } = useAuth();

  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(1);
    if (validatePhoneNumber(phoneNumber)) {
      console.log(2);

      if (password1 === password2) {
        console.log(3);

        setLoading(true);
        setError("");
        signUp(email, password1)
          //.then((data) => console.log(data))
          .then(async (cred) => {
            await setDoc(doc(db, "Users", cred.user.uid), {
              ID: cred.user.uid,
              Email: email,
              Name: null,
              Balance: 0,
              Cards: [],
              SubscriptionExpDate: false,
              Payments: [],
              Terminals: [],
              Owner: false,
              PhoneNumber: phoneNumber,
            })
              .then(() => {
                setLoading(false);
              })
              .catch((e) => {
                setLoading(false);
                console.log(e);
                setError(HandleError(e));
              });
          })
          .catch((e) => {
            setLoading(false);
            console.log(e);
            setError(HandleError(e));
          });
      } else {
        setError("Passwords don't match");
      }
    } else {
      setError("Georgian Phone number wrong");
    }
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
              Register screen
            </Text>
            <Text>{error}</Text>
            <View style={[mainStyle.inputWrapper, { marginTop: 40 }]}>
              <TextInput
                placeholder="E-mail"
                autoCompleteType="email"
                autoCapitalize="none"
                autoCorrect={false}
                autoFocus={true}
                keyboardType="email-address"
                style={[mainStyle.input, mainStyle.input_splited]}
                value={email}
                onChangeText={(email) => setEmail(email)}
              />
              <TextInput
                keyboardType="numeric"
                autoCompleteType="tel"
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Phone"
                style={[mainStyle.input, mainStyle.input_splited]}
                value={phoneNumber}
                onChangeText={(tel) => setPhoneNumber(tel)}
              />
              <TextInput
                autoCompleteType="off"
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Password"
                secureTextEntry
                style={[mainStyle.input, mainStyle.input_splited]}
                value={password1}
                onChangeText={(pass) => setPassword1(pass)}
              />
              <TextInput
                autoCompleteType="off"
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Repeat Password"
                secureTextEntry
                style={mainStyle.input}
                value={password2}
                onChangeText={(pass) => setPassword2(pass)}
              />
            </View>
          </View>

          <View
            style={[
              mainStyle.buttonContainer,
              {
                marginTop: 90,
                flexDirection: "row",
                paddingHorizontal: 10,
                justifyContent: "space-between",
              },
            ]}
          >
            <TouchableOpacity
              style={[mainStyle.buttonOutline]}
              onPress={() => {
                navigation.navigate("Login");
              }}
              accessibilityLabel="Learn more about this purple button"
            >
              <Text style={mainStyle.buttonSecondaryTitle}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[mainStyle.button, { backgroundColor: "#404CB2" }]}
              onPress={handleSubmit}
            >
              <Text style={mainStyle.buttonPrimaryTitle}>Register</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              paddingHorizontal: 10,
              paddingTop: 20,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("ForgotPassword");
              }}
              accessibilityLabel="Learn more about this purple button"
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
