package com.uttam.restaurant.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.uttam.restaurant.model.Order;
import com.uttam.restaurant.service.OrderService;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class OrderController {
	
	@Autowired
	private OrderService orderService;
	
	@GetMapping("/order")
	public String homeOrder() {
		return "server-order-controller-running";
	}
	
	@GetMapping("/order/all")
	public ResponseEntity<List<Order>> getAllOrders() {
		List<Order> orders= orderService.getAllOrders();
		if(orders.size()<=0) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}
		return ResponseEntity.of(Optional.of(orders));
	}
	
	@PostMapping("/user/order/add")
	public void addOrder(@RequestBody Order order) {
		System.out.println("request to add order by ");
		System.out.println(order);
		orderService.addOrder(order);
	}
	
}
