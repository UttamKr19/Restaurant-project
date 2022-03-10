package com.uttam.restaurant.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.uttam.restaurant.model.Order;
import com.uttam.restaurant.model.User;
import com.uttam.restaurant.service.OrderService;
import com.uttam.restaurant.service.UserService;

@RestController
@RequestMapping(value = "/api/v1")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class OrderController {

	@Autowired
	private OrderService orderService;
	
	@Autowired
	private UserService userService;
	
	@GetMapping("/order-home")
	public String homeOrder() {
		return "server-order-controller-running";
	}

	@GetMapping("/orders")
	public ResponseEntity<List<Order>> getAllOrders() {
		try {
			List<Order> orders = orderService.getAllOrders();
			if (orders.size() <= 0) {
				return ResponseEntity.status(HttpStatus.NO_CONTENT).build(); //204
			}
			return ResponseEntity.ok().body(orders); // 200
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).build(); // 400
		}
	}

	@PostMapping("/order")
	public ResponseEntity<Order> addOrder(@RequestBody Order order) {
		try {
			System.out.println(order);
			User user=userService.getUserByUname(order.getUser().getUsername());
			order.setUser(user);
			orderService.addOrder(order);
			return ResponseEntity.ok().body(order); // 200
		} catch (Exception e) {
			System.out.println(e);
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).build(); // 400
		}
	}

	@PutMapping("/order")
	public ResponseEntity<Order> updateOrder(@RequestBody Order order) {
		try {
			User user=userService.getUserByUname(order.getUser().getUsername());
			order.setUser(user);
			orderService.updateOrder(order);
			return ResponseEntity.ok().body(order); // 200
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).build(); // 400
		}
	}

	@DeleteMapping("/order")
	public ResponseEntity<HttpStatus.Series> deleteOrder(@RequestBody Order order) {
		try {
			orderService.deleteOrder(order);
			return ResponseEntity.ok().build(); //202
		}
		catch(Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).build(); //400
		}
	}

	@GetMapping("/order")
	public ResponseEntity<List<Order>> getOrdersByUserUsername(@RequestParam("username") String username) {

		try {
			List<Order> orders = orderService.getOrdersByUsername(username);
			if (orders != null) {
				return ResponseEntity.ok().body(orders); // 200
			}
			return ResponseEntity.status(HttpStatus.NO_CONTENT).build(); // 204
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).build(); // 400
		}
	}

}
