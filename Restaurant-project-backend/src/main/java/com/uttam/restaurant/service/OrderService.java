package com.uttam.restaurant.service;

import java.util.List;

import org.springframework.transaction.annotation.Transactional;

import com.uttam.restaurant.model.Order;

public interface OrderService {

	List<Order> getAllOrders();

	void addOrder(Order order);

	List<Order> getOrdersByUsername(String username);

	@Transactional
	void updateOrder(Order order);

	@Transactional
	void deleteOrder(Order order);

	@Transactional
	void deleteOrderByUsername(String username);

}
