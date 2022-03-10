package com.uttam.restaurant.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.uttam.restaurant.dao.UserDao;
import com.uttam.restaurant.model.User;

@Service
public class UserServiceImpl implements UserService{

	@Autowired
	private UserDao userDao;
	
	@Override
	public List<User> getAllUsers() {
		return (List<User>) userDao.findAll();
	}

	@Override
	public void addUser(User user) {
		userDao.save(user);
	}

	@Override
	public User getUserByUname(String username) {
		return userDao.findByUsername(username);
	}

	@Override
	public User getAuthenticatedUser(String username, String password) {
		return userDao.getAuthenticatedUser(username, password);
	}

	@Override
	public void delete(User user) {
		userDao.delete(user);
	}

	@Override
	public User getUserByEmail(String email) {
		return userDao.getUserByEmail(email);
	}

}
