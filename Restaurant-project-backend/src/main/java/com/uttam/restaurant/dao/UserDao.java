package com.uttam.restaurant.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.uttam.restaurant.model.User;

public interface UserDao extends JpaRepository<User, Integer>{
	
	@Query("select u from User u where u.email= :email")
	public User getUserByEmail(@Param("email") String email);
	
	@Query("select u from User u where u.username= :username")
	public User getUserByUname(@Param("username") String username);
	
	@Query("select u from User u where u.username= :username and u.password= :password")
	public User getAuthenticatedUser(@Param("username") String username, @Param("password") String password);

	public User findByUsername(String username);


}
