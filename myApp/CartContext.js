// CartContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import { storageService } from './services/storageService';
import { useAuth } from './AuthContext'; 

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { userToken } = useAuth(); 
  const [cartItems, setCartItems] = useState([]);
  const [orders, setOrders] = useState([]);

  // Tạo "chìa khóa" tủ đồ riêng cho từng tài khoản
  const cartKey = userToken ? `@cart_${userToken}` : null;
  const ordersKey = userToken ? `@orders_${userToken}` : null;

  // 1. CHỈ LOAD DỮ LIỆU TỪ Ổ CỨNG KHI ĐĂNG NHẬP
  useEffect(() => {
    if (!userToken) {
      setCartItems([]);
      setOrders([]);
      return;
    }

    const loadData = async () => {
      const savedCart = await storageService.getData(cartKey);
      const savedOrders = await storageService.getData(ordersKey);
      setCartItems(savedCart || []);
      setOrders(savedOrders || []);
    };
    loadData();
  }, [userToken, cartKey, ordersKey]);

  // 2. CÁC HÀM XỬ LÝ (LƯU TRỰC TIẾP XUỐNG Ổ CỨNG MỖI KHI CÓ THAO TÁC)
  
  const addToCart = (product, quantity) => {
    setCartItems((prev) => {
      const existing = prev.find(item => item.id === product.id);
      let newCart;
      if (existing) {
        newCart = prev.map(item => item.id === product.id ? { ...item, qty: item.qty + quantity } : item);
      } else {
        newCart = [...prev, { ...product, qty: quantity }];
      }
      // Lưu ngay vào ổ cứng
      if (cartKey) storageService.saveData(cartKey, newCart);
      return newCart;
    });
  };

  const removeFromCart = (id) => {
    setCartItems(prev => {
      const newCart = prev.filter(item => item.id !== id);
      if (cartKey) storageService.saveData(cartKey, newCart);
      return newCart;
    });
  };

  const updateQuantity = (id, newQty) => {
    if (newQty < 1) return;
    setCartItems(prev => {
      const newCart = prev.map(item => item.id === id ? { ...item, qty: newQty } : item);
      if (cartKey) storageService.saveData(cartKey, newCart);
      return newCart;
    });
  };

  const clearCart = () => {
    setCartItems([]);
    if (cartKey) storageService.saveData(cartKey, []); // Xóa giỏ hàng sau khi checkout
  };

  const checkout = (totalAmount) => {
    if (cartItems.length === 0) return false;
    
    const newOrder = {
      id: Date.now().toString(),
      items: [...cartItems],
      total: totalAmount,
      date: new Date().toLocaleString(),
    };
    
    setOrders(prev => {
      const newOrders = [newOrder, ...prev];
      if (ordersKey) storageService.saveData(ordersKey, newOrders);
      return newOrders;
    });
    
    clearCart();
    return true;
  };

  const removeOrder = (orderId) => {
    setOrders(prev => {
      const newOrders = prev.filter(order => order.id !== orderId);
      if (ordersKey) storageService.saveData(ordersKey, newOrders);
      return newOrders;
    });
  };

  return (
    <CartContext.Provider value={{ cartItems, orders, addToCart, removeFromCart, updateQuantity, checkout, removeOrder }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);