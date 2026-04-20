// CartContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import { storageService, storageKeys } from './services/storageService';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [isStorageLoaded, setIsStorageLoaded] = useState(false);

  // Lấy dữ liệu Cart và Orders từ Storage khi mở app
  useEffect(() => {
    const loadData = async () => {
      const savedCart = await storageService.getData(storageKeys.CART);
      const savedOrders = await storageService.getData(storageKeys.ORDERS);
      if (savedCart) setCartItems(savedCart);
      if (savedOrders) setOrders(savedOrders);
      setIsStorageLoaded(true);
    };
    loadData();
  }, []);

  // Tự động lưu Cart vào Storage mỗi khi cartItems thay đổi
  useEffect(() => {
    if (isStorageLoaded) {
      storageService.saveData(storageKeys.CART, cartItems);
    }
  }, [cartItems, isStorageLoaded]);

  // Tự động lưu Orders vào Storage mỗi khi orders thay đổi
  useEffect(() => {
    if (isStorageLoaded) {
      storageService.saveData(storageKeys.ORDERS, orders);
    }
  }, [orders, isStorageLoaded]);

  // --- CÁC HÀM XỬ LÝ GIỎ HÀNG ---
  const addToCart = (product, quantity) => {
    setCartItems((prev) => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + quantity } : item);
      return [...prev, { ...product, qty: quantity }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id, newQty) => {
    if (newQty < 1) return;
    setCartItems(prev => prev.map(item => item.id === id ? { ...item, qty: newQty } : item));
  };

  const clearCart = () => setCartItems([]);

  // --- XỬ LÝ ĐẶT HÀNG (CHECKOUT) ---
  const checkout = (totalAmount) => {
    if (cartItems.length === 0) return false;
    
    const newOrder = {
      id: Date.now().toString(),
      items: [...cartItems],
      total: totalAmount,
      date: new Date().toLocaleString(),
    };

    setOrders([newOrder, ...orders]); // Thêm đơn mới lên đầu
    clearCart(); // Đặt hàng xong thì xóa giỏ
    return true;
  };

  return (
    <CartContext.Provider value={{ cartItems, orders, addToCart, removeFromCart, updateQuantity, checkout }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);