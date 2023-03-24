import {
  StyleSheet,
  View,
  Image,
  FlatList,
  ScrollView,
  useWindowDimensions,
  Pressable,
  Text,
  Modal,
} from "react-native";
import products from "../data/products";
import { useSelector, useDispatch } from "react-redux";
import { cartSlice } from "../store/cartSlice";
import { useEffect, useRef, useState } from "react";
import { useGetProductQuery } from "../store/apiSlice";
import { ActivityIndicator } from "react-native";

const ProductDetailsScreen = ({ route }) => {
  const [showAlert, setShowAlert] = useState(false);
  const timerId = useRef(null);
  const dispatch = useDispatch();
  const { width } = useWindowDimensions();

  const id = route.params.id;

  const { data, isLoading, error } = useGetProductQuery(id);

  const addToCart = () => {
    dispatch(cartSlice.actions.addCartItem({ product }));

    setShowAlert(true);
  };

  useEffect(() => {
    if (showAlert) {
      timerId.current = setTimeout(() => {
        setShowAlert(false);
      }, 1000);
    }

    return () => {
      clearTimeout(timerId.current);
    };
  }, [showAlert]);

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Error fetching product info: {error.error}</Text>;
  }

  const product = data.data;

  return (
    <View>
      {/* Image Carousel */}
      <ScrollView>
        <FlatList
          data={product.images}
          renderItem={({ item }) => (
            <Image source={{ uri: item }} style={{ width, aspectRatio: 1 }} />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
        />

        <View style={{ padding: 20 }}>
          {/* Title */}
          <Text style={styles.title}>{product.name}</Text>

          {/* Price */}
          <Text style={styles.price}>${product.price}</Text>

          {/* Description */}
          <Text style={styles.description}>{product.description}</Text>
        </View>
      </ScrollView>

      {/* Add to cart button */}
      <Pressable onPress={addToCart} style={styles.button}>
        <Text style={styles.buttonText}>Add to cart</Text>
      </Pressable>
      <Modal animationType="fade" transparent={true} visible={showAlert}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>1 {product.name} added to cart</Text>
        </View>
      </Modal>

      {/* Navigation icon */}
    </View>
  );
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({
  title: {
    fontSize: 34,
    fontWeight: "500",
    marginVertical: 10,
  },
  price: {
    fontWeight: "500",
    fontSize: 16,
    letterSpacing: 1.5,
  },
  description: {
    marginVertical: 10,
    fontSize: 18,
    lineHeight: 30,
    fontWeight: "300",
  },
  button: {
    position: "absolute",
    bottom: 30,
    padding: 10,
    width: "90%",
    alignSelf: "center",
    backgroundColor: "black",
    borderRadius: 15,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 20,
    textAlign: "center",
  },
  modalView: {
    backgroundColor: "#EDEDED",
    width: "75%",
    height: 50,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
    borderRadius: 9999,
  },
  modalText: {
    fontSize: 16,
    fontWeight: "700",
  },
});
