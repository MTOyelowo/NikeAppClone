import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { useKeepAwake } from "expo-keep-awake";
import Navigation from "./src/navigation";
import { Provider } from "react-redux";
import { store } from "./src/store";

export default function App() {
  useKeepAwake();
  return (
    <Provider store={store}>
      <Navigation />
      <StatusBar style="auto" />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
