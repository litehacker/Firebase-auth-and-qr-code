import { StyleSheet } from "react-native";

export const mainStyle = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
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
  button: {
    width: "45%",
    textAlign: "center",
    borderRadius: 4,
    alignItems: "center",
    height: 48,
    justifyContent: "center",
    marginBottom: 10,
  },
  buttonOutline: {
    width: "45%",
    textAlign: "center",
    borderRadius: 4,
    alignItems: "center",
    height: 48,
    marginBottom: 10,
    borderColor: "#404CB2",
    borderWidth: 1,
    justifyContent: "center",
  },
  buttonPrimaryTitle: { fontSize: 18, color: "white" },
  buttonSecondaryTitle: { fontSize: 18, color: "#404CB2" },
  buttonContainer: {
    width: "100%",
    height: 48,
    alignContent: "space-between",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    fontSize: 18,
  },
  input_splited: {
    borderBottomWidth: 1,
    borderBottomColor: "#DDDDDD",
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: 5,
    fontSize: 18,
  },
  inputWrapper: {
    padding: 10,
    marginHorizontal: 10,
    backgroundColor: "white",
    borderRadius: 5,
  },
});
