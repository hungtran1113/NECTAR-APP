import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useCart } from '../CartContext';

export const ProductDetailScreen = ({ route, navigation }) => {
  const { product } = route.params;
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product, quantity);
    // Gọi tên Stack chứa Tab trước, sau đó trỏ vào màn hình Cart bên trong
    navigation.navigate('Home', { screen: 'Cart' }); 
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.backIcon}>{"<"}</Text>
          </TouchableOpacity>
          <Image source={product.image || { uri: product.img }} style={styles.productImage} resizeMode="contain" />
        </View>

        <View style={styles.infoSection}>
          <View style={styles.titleRow}>
            <Text style={styles.title}>{product.name}</Text>
            <TouchableOpacity><Text style={styles.heartIcon}>♡</Text></TouchableOpacity>
          </View>
          <Text style={styles.subtitle}>{product.desc}</Text>

          <View style={styles.priceRow}>
            <View style={styles.quantityControl}>
              <TouchableOpacity onPress={() => setQuantity(Math.max(1, quantity - 1))}>
                <Text style={styles.qtyBtn}>-</Text>
              </TouchableOpacity>
              <View style={styles.qtyBox}><Text style={styles.qtyText}>{quantity}</Text></View>
              <TouchableOpacity onPress={() => setQuantity(quantity + 1)}>
                <Text style={[styles.qtyBtn, {color: '#53B175'}]}>+</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.price}>{product.price}</Text>
          </View>

          <View style={styles.detailSection}>
            <View style={styles.accordionHeader}>
                <Text style={styles.sectionTitle}>Product Detail</Text>
                <Text>˅</Text>
            </View>
            <Text style={styles.description}>
              Sản phẩm {product.name} tươi ngon, đạt tiêu chuẩn chất lượng. Phù hợp cho chế độ ăn uống lành mạnh và đảm bảo an toàn.
            </Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.addToCartBtn} onPress={handleAddToCart}>
          <Text style={styles.addToCartText}>Add To Basket</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  imageContainer: { height: 300, backgroundColor: '#F2F3F2', borderBottomLeftRadius: 25, borderBottomRightRadius: 25, justifyContent: 'center', alignItems: 'center' },
  backButton: { position: 'absolute', top: 50, left: 20, zIndex: 1 },
  backIcon: { fontSize: 30, fontWeight: 'bold', color: '#181725' },
  productImage: { width: 250, height: 250 },
  infoSection: { padding: 20 },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#181725' },
  heartIcon: { fontSize: 24, color: '#7C7C7C' },
  subtitle: { fontSize: 16, color: '#7C7C7C', marginTop: 5 },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 30 },
  quantityControl: { flexDirection: 'row', alignItems: 'center' },
  qtyBtn: { fontSize: 30, paddingHorizontal: 15, color: '#B3B3B3' },
  qtyBox: { borderWidth: 1, borderColor: '#E2E2E2', borderRadius: 15, paddingVertical: 10, paddingHorizontal: 18 },
  qtyText: { fontSize: 18, fontWeight: 'bold' },
  price: { fontSize: 24, fontWeight: 'bold', color: '#181725' },
  detailSection: { borderTopWidth: 1, borderColor: '#E2E2E2', paddingTop: 20 },
  accordionHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10},
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#181725' },
  description: { fontSize: 13, color: '#7C7C7C', lineHeight: 21 },
  bottomBar: { padding: 20, backgroundColor: '#fff' },
  addToCartBtn: { backgroundColor: '#53B175', borderRadius: 19, paddingVertical: 18, alignItems: 'center' },
  addToCartText: { color: '#fff', fontSize: 18, fontWeight: 'bold' }
});