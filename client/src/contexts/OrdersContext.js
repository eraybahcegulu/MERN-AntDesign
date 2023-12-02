import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const OrdersContext = createContext();
const GET_ORDERS_API_URL = process.env.REACT_APP_API_URL + "/api/orders/get-all";

export const OrdersProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  const fetchOrdersData = async (url, setData) => {
    try {
      const response = await axios.get(url);
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchOrdersData(GET_ORDERS_API_URL, setOrders);
  }, []);

  return (
    <OrdersContext.Provider
      value={{
        orders,
        getOrders: () => fetchOrdersData(GET_ORDERS_API_URL, setOrders),
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
};

export const useOrdersData = () => {
  return useContext(OrdersContext);
};