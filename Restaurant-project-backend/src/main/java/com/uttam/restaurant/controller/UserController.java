package com.uttam.restaurant.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.uttam.restaurant.model.LoginCredentials;
import com.uttam.restaurant.model.Order;
import com.uttam.restaurant.model.User;
import com.uttam.restaurant.service.OrderService;
import com.uttam.restaurant.service.UserService;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class UserController {

	@Autowired
	private BCryptPasswordEncoder passwordEncoder;
	
	@Autowired
	private OrderService orderService;
	
	@Autowired
	private UserService userService;
	

	@PostMapping("/user/add")
	public ResponseEntity<HttpStatus.Series> addUser(@RequestBody User user) {
		try {
			user.setPassword(passwordEncoder.encode(user.getPassword()));
			userService.addUser(user);
			return ResponseEntity.status(HttpStatus.CREATED).build();  //201
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_MODIFIED).build(); //304
		}
	}
	
	@GetMapping("/user")
	public ResponseEntity<User> getUser(@RequestParam("username") String username) {
		User user=userService.getUserByEmail(username);
		if(user!=null) {
			return ResponseEntity.of(Optional.of(user));
		}
		return ResponseEntity.status(HttpStatus.NO_CONTENT).build(); //204
	}
	
	@GetMapping("/user/order")
	public ResponseEntity<List<Order>> getUserOrders(@RequestParam("username") String username){
		List<Order> orders=orderService.getOrdersByEmail(username);
		if(orders!=null) {
			return ResponseEntity.of(Optional.of(orders));
		}
		return ResponseEntity.status(HttpStatus.NO_CONTENT).build(); //204
	}
	
	@PostMapping("/user/login")
	public ResponseEntity<HttpStatus.Series> userLogin(@RequestBody LoginCredentials credentials) {
		try {
			String username=credentials.getUsername();
			String password=credentials.getPassword();
			
			User user=userService.getUserByEmail(username);
			
			if(user!=null && passwordEncoder.matches(password, user.getPassword())) {
				return ResponseEntity.status(HttpStatus.ACCEPTED).build();  //202
			}
			
			return ResponseEntity.status(HttpStatus.NO_CONTENT).build();  //204
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); //404
		}
	}
	
}
