package com.uttam.restaurant.service;

import java.util.List;

import com.uttam.restaurant.model.Order;

public interface OrderService {

	List<Order> getAllOrders();

	void addOrder(Order order);

	List<Order> getOrdersByEmail(String username);

}
