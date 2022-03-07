package com.uttam.restaurant.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.uttam.restaurant.dao.UserDao;
import com.uttam.restaurant.model.User;
import com.uttam.restaurant.service.UserService;

public class UserDetailsServiceImpl implements UserDetailsService {

	@Autowired
	private UserService userService;
	
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		
		// fetching user from database
		System.err.println("fetching from db for username="+username);
		
		User user=userService.getUserByEmail(username);
		if(user==null) {
			System.err.println("user null for "+username);
			throw new UsernameNotFoundException("no user found with username/email "+ username);
		}
		
		System.err.println("user not null");
		
		CustomUserDetails customUserDetails=new CustomUserDetails(user);
		return customUserDetails;
	}

}
