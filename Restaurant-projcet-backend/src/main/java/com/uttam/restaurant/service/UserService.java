package com.uttam.restaurant.service;

import java.util.List;

import com.uttam.restaurant.model.User;

public interface UserService {

	List<User> getAllUsers();

	void addUser(User user);
	
	User getUserByEmail(String email);
	
	User getAuthenticatedUser(String username, String password);

}
