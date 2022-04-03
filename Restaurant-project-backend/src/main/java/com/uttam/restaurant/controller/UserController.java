package com.uttam.restaurant.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.uttam.restaurant.model.LoginCredentials;
import com.uttam.restaurant.model.User;
import com.uttam.restaurant.service.OrderService;
import com.uttam.restaurant.service.UserService;

@RestController
@CrossOrigin(origins = {"http://localhost:3000"}, 
			allowedHeaders = {"GET", "HEAD", "POST", "PUT", "DELETE", "TRACE", "OPTIONS", "PATCH"}, 
			allowCredentials="")
public class UserController {

	@Autowired
	private BCryptPasswordEncoder passwordEncoder;

	@Autowired
	private UserService userService;
	
	@Autowired
	private OrderService orderService;

	@GetMapping("/user")
	public ResponseEntity<User> getUserByUsername(@RequestParam("username") String username) {
		try {
			User user = userService.getUserByUname(username);
			if (user != null) {
				return ResponseEntity.ok().body(user); // 200
			}
			return ResponseEntity.status(HttpStatus.NO_CONTENT).build(); // 204
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).build(); // 400
		}
	}

	
	@GetMapping("/users")
	public ResponseEntity<List<User>> getAllUsers() {
		try {
			List<User> users = userService.getAllUsers();
			if (users != null && users.size() > 0) {
				return ResponseEntity.ok().body(users);
			}
			return ResponseEntity.status(HttpStatus.NO_CONTENT).build(); //204
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).build(); // 400
		}
	}

	
	@PostMapping("/user")
	public ResponseEntity<User> addUser(@RequestBody User user) {
		try {
			if (userService.getUserByUname(user.getUsername()) != null
					|| userService.getUserByEmail(user.getEmail()) != null) {

				return ResponseEntity.status(HttpStatus.CONFLICT).build(); // 409
			}
			user.setPassword(passwordEncoder.encode(user.getPassword()));
			userService.addUser(user);
			return ResponseEntity.ok().body(user); // 200
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).build(); // 400
		}
	}

	
	@PutMapping("/user")
	public ResponseEntity<User> updateUser(@RequestBody User user) {
		try {
			User existingUser=userService.getUserByUname(user.getUsername());
			user.setPassword(passwordEncoder.encode(user.getPassword()));
			user.setUserId(existingUser.getUserId());

			userService.addUser(user);
			return ResponseEntity.ok().body(user); // 200
		} catch (Exception e) {
			System.err.println(e);
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).build(); // 400
		}
	}
	
	
	@DeleteMapping("/user")
	public ResponseEntity<HttpStatus.Series> deleteUser(@RequestBody User credentials) {
		try {
			String username = credentials.getUsername();
			String password = credentials.getPassword();
			User user = userService.getUserByUname(username);
			System.out.println(user);
			if (user != null && passwordEncoder.matches(password, user.getPassword())) {
				orderService.deleteOrderByUsername(username);
				userService.delete(user);				
				return ResponseEntity.status(HttpStatus.OK).build(); // 200
			}
			return ResponseEntity.status(HttpStatus.NOT_MODIFIED).build(); // 304
		} catch (Exception e) {
			System.out.println(e);
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).build(); // 400
		}
	}
	
	@PostMapping("/user/delete")
	public ResponseEntity<HttpStatus.Series> deleteUser2(@RequestBody LoginCredentials credentials) {
		try {
			String username = credentials.getUsername();
			String password = credentials.getPassword();
			User user = userService.getUserByUname(username);
			System.out.println(user);
			if (user != null && passwordEncoder.matches(password, user.getPassword())) {
				orderService.deleteOrderByUsername(username);
				userService.delete(user);				
				return ResponseEntity.status(HttpStatus.OK).build(); // 200
			}
			return ResponseEntity.status(HttpStatus.NOT_MODIFIED).build(); // 304
		} catch (Exception e) {
			System.out.println(e);
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).build(); // 400
		}
	}
	

	@PostMapping("/user/login")
	public ResponseEntity<HttpStatus.Series> userLogin(@RequestBody LoginCredentials credentials) {
		try {
			String username = credentials.getUsername();
			String password = credentials.getPassword();

			User user = userService.getUserByUname(username);
			if (user != null && passwordEncoder.matches(password, user.getPassword())) {
				return ResponseEntity.status(HttpStatus.ACCEPTED).build(); // 202
			}
			return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).build(); // 406
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).build(); // 400
		}
	}
	
	@PostMapping("/auth")
	public ResponseEntity<HttpStatus.Series> authenticateUser(@RequestBody LoginCredentials credentials) {
		try {
			String username = credentials.getUsername();
			String password = credentials.getPassword();

			User user = userService.getUserByUname(username);
			if (user != null && passwordEncoder.matches(password, user.getPassword())) {
				return ResponseEntity.status(HttpStatus.ACCEPTED).build(); // 202
			}
			return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).build(); // 406
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).build(); // 400
		}
	}
	
}
