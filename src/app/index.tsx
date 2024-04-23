import { useState, useRef } from "react";
import { FlatList, SectionList, Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";

import { Button, CategoryButton, Header, Product } from "@/components";
import { useCartStore } from "@/stores/cart-stores";
import { CATEGORIES, MENU, ProductProps } from "@/utils/data/products";

export default function Home() {
  const cartStore = useCartStore();
  const [category, setCategory] = useState(CATEGORIES[0]);
  const router = useRouter();

  const sectionListRef = useRef<SectionList<ProductProps>>(null);

  const cartQuantityItems = cartStore.products.reduce(
    (acc, product) => acc + product.quantity,
    0
  );

  function handleCategorySelect(selectedCategory: string) {
    setCategory(selectedCategory);
    const sectionIndex = CATEGORIES.findIndex(
      (category) => category === selectedCategory
    );
    if (sectionListRef.current) {
      sectionListRef.current.scrollToLocation({
        animated: true,
        sectionIndex,
        itemIndex: 0,
      });
    }
  }

  return (
    <View className="flex-1">
      <Header title="Cardápio" cartQuantityItems={cartQuantityItems} />
      <FlatList
        data={CATEGORIES}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <CategoryButton
            title={item}
            isSelected={item === category}
            onPress={() => handleCategorySelect(item)}
          />
        )}
        horizontal
        className="max-h-10 mt-5"
        contentContainerStyle={{ gap: 12, paddingHorizontal: 20 }}
        showsHorizontalScrollIndicator={false}
      />
      <SectionList
        className="flex-1 p-5"
        ref={sectionListRef}
        sections={MENU}
        keyExtractor={(item) => item.id}
        stickySectionHeadersEnabled={false}
        renderItem={({ item }) => (
          <Link href={`/product/${item.id}`} asChild>
            <Product data={item} />
          </Link>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text className="text-xl text-white font-heading mt-8 mb-3">
            {title}
          </Text>
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
      <View className="p-5 gap-5">
        <Button onPress={() => router.push("/cart")}>
          <Button.Text>Finalizar Pedido</Button.Text>
          <Button.Icon>
            <Feather name="shopping-bag" size={20} />
          </Button.Icon>
        </Button>
      </View>
    </View>
  );
}
