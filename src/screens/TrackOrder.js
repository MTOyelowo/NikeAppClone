import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ActivityIndicator,
  ScrollView,
  Image,
  FlatList,
} from "react-native";
import TrackingListItem from "../components/TrackingListItem";
import { useGetOrderQuery } from "../store/apiSlice";

const TrackOrder = () => {
  const [ref, setRef] = useState("");
  const { data, isLoading, error } = useGetOrderQuery(ref);

  return (
    <View style={styles.root}>
      <TextInput
        style={styles.input}
        value={ref}
        onChangeText={setRef}
        placeholder="Enter your order reference"
      />

      {isLoading && <ActivityIndicator />}
      {data?.status !== "OK" && ref !== "" && <Text>Order not found</Text>}
      {data?.status === "OK" && (
        <>
          <FlatList
            data={data.data.items}
            renderItem={({ item }) => <TrackingListItem trackItem={item} />}
          />
          <View style={styles.totalsContainer}>
            <View style={styles.row}>
              <Text style={styles.text}>Subtotal</Text>
              <Text style={styles.text}>{data.data.subtotal}US$</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.text}>Delivery</Text>
              <Text style={styles.text}>{data.data.deliveryFee} US$</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.textBold}>Total</Text>
              <Text style={styles.textBold}>{data.data.total} US$</Text>
            </View>
          </View>
        </>
      )}
    </View>
  );
};

export default TrackOrder;

const styles = StyleSheet.create({
  root: {
    padding: 10,
  },
  input: {
    borderColor: "lightgray",
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  totalsContainer: {
    margin: 20,
    paddingTop: 10,
    borderColor: "gainsboro",
    borderTopWidth: 1,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    fontSize: 16,
    color: "gray",
  },
  textBold: {
    fontSize: 16,
    fontWeight: "500",
  },
});
