import { Image, StyleSheet, Text, View } from "react-native";

const TrackingListItem = ({ trackItem }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: trackItem.product.image }} style={styles.image} />
      <View style={styles.contentContainer}>
        <Text style={styles.name}>{trackItem.product.name}</Text>
        <Text style={styles.size}>Size: {trackItem.sizes}</Text>
        <Text style={styles.size}>Price: {trackItem.product.price} USD</Text>
        <Text style={styles.size}>Quantity ordered: {trackItem.quantity}</Text>
      </View>
    </View>
  );
};

export default TrackingListItem;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
  },
  contentContainer: {
    flex: 1,
    marginLeft: 10,
  },
  image: {
    width: "40%",
    aspectRatio: 1,
  },
  name: {
    fontWeight: "500",
    fontSize: 18,
  },
  size: {
    fontSize: 16,
    color: "gray",
  },
  quantity: {
    marginHorizontal: 10,
    fontWeight: "bold",
    color: "gray",
  },
});
