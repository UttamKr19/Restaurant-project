package com.uttam.restaurant.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.uttam.restaurant.dao.OrderDao;
import com.uttam.restaurant.model.Order;

@Service
public class OrderServiceImpl implements OrderService{

	@Autowired
	private OrderDao orderDao;
	
	@Override
	public List<Order> getAllOrders() {
		return (List<Order>) orderDao.findAll();
	}

	@Override
	public void addOrder(Order order) {
		orderDao.save(order);
	}

	@Override
	public List<Order> getOrdersByUsername(String username) {
		return orderDao.getOrdersByUsername(username);
	}

	@Override
	public void updateOrder(Order order) {
		orderDao.save(order);
	}

	@Override
	public void deleteOrder(Order order) {
		orderDao.delete(order);
	}

	@Override
	public void deleteOrderByUsername(String username) {
		orderDao.deleteOrderByUsername(username);
	}

}
