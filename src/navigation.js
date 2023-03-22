import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProductsScreen from "./screens/ProductsScreen";
import ProductDetailsScreen from "./screens/ProductDetailScreen";
import ShoppingCart from "./screens/ShoppingCart";
import { Pressable, Text, View } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { selectNumberOfItems } from "./store/cartSlice";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const numberOfItems = useSelector(selectNumberOfItems);
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          contentStyle: { backgroundColor: "white" },
        }}
      >
        <Stack.Screen
          name="Products"
          component={ProductsScreen}
          options={({ navigation }) => ({
            headerRight: () => (
              <Pressable
                onPress={() => navigation.navigate("Cart")}
                style={{
                  flexDirection: "row",
                  padding: 10,
                }}
              >
                <FontAwesome5 name="shopping-cart" size={18} color="gray" />
                <View
                  style={{
                    backgroundColor: "black",
                    borderRadius: 999,
                    width: 15,
                    height: 15,
                    alignItems: "center",
                    position: "absolute",
                    top: 0,
                    right: 1,
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "500",
                      flexWrap: "wrap",
                      color: "white",

                      fontSize: 10,
                    }}
                  >
                    {numberOfItems}
                  </Text>
                </View>
              </Pressable>
            ),
            headerTitleAlign: "center",
          })}
        />
        <Stack.Screen
          name="Product Details"
          component={ProductDetailsScreen}
          options={{ animation: "slide_from_bottom", animationDuration: 10 }}
        />
        <Stack.Screen
          name="Cart"
          component={ShoppingCart}
          options={{
            headerTitleAlign: "center",
            headerBackTitle: "Products",
            headerBackTitleStyle: { color: "black" },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
