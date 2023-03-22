import { useNavigation } from "@react-navigation/native";
import { FlatList, Image, Pressable } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { productsSlice } from "../store/productSlice";

const ProductsScreen = () => {
  const products = useSelector((state) => state.products.products);

  const dispatch = useDispatch();
  const navigation = useNavigation();
  return (
    <FlatList
      data={products}
      renderItem={({ item }) => (
        <Pressable
          onPress={() => {
            //update selected product
            dispatch(productsSlice.actions.setSelectedProduct(item.id));

            navigation.navigate("Product Details");
          }}
          style={styles.itemContainer}
        >
          <Image
            source={{
              uri: item.image,
            }}
            style={styles.image}
          />
        </Pressable>
      )}
      numColumns={2}
    />
  );
};

export default ProductsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  itemContainer: {
    width: "50%",
    padding: 1,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
});
