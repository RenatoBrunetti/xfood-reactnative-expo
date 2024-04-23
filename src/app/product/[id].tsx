import { Image, ScrollView, Text, View } from "react-native";
import { useLocalSearchParams, useNavigation, Redirect } from "expo-router";
import { Feather } from "@expo/vector-icons";

import { Button, LinkButton } from "@/components";

import { useCartStore } from "@/stores/cart-stores";

import { PRODUCTS } from "@/utils/data/products";
import { formatCurrency } from "@/utils/functions/format-currency";

export default function Product() {
  const cartStore = useCartStore();
  const navigation = useNavigation();
  const { id } = useLocalSearchParams();

  const product = PRODUCTS.find((item) => item.id === id);

  function handleAddToCart() {
    if (product) {
      cartStore.add(product);
      navigation.goBack();
    }
  }

  if (!product) {
    return <Redirect href="/" />;
  }

  return (
    <View className="flex-1">
      <ScrollView>
        <Image
          source={product.cover}
          className="w-full h-52"
          resizeMode="cover"
        />
        <View className="p-5 my-5 flex-1">
          <Text className="text-white text-xl font-heading">
            {product.title}
          </Text>
          <Text className="text-lime-400 text-2xl font-heading my-2">
            {formatCurrency(product.price)}
          </Text>
          <Text className="text-slate-400 font-body text-base leading-6 mb-6">
            {product.description}
          </Text>
          {product.ingredients.map((ingredient) => (
            <Text
              key={ingredient}
              className="text-slate-400 font-body text-base"
            >
              {"\u2022"} {ingredient}
            </Text>
          ))}
        </View>
        <View className="px-5 pb-5 gap-5 bg-slate-800">
          <Button onPress={handleAddToCart}>
            <Button.Icon>
              <Feather name="plus-circle" size={20} />
            </Button.Icon>
            <Button.Text>Adicionar ao pedido</Button.Text>
          </Button>
          <LinkButton title="Voltar ao cardápio" href="/" />
        </View>
      </ScrollView>
    </View>
  );
}
