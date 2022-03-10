package com.uttam.restaurant.dao;

import java.util.List;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.uttam.restaurant.model.Order;

public interface OrderDao extends CrudRepository<Order, Long>{
	
	@Query("select order from Order order where order.user.username= :username")
	public List<Order> getOrdersByUsername(@Param("username") String username);
	
	@Transactional
	@Modifying
	@Query("delete from Order o where o.user.userId in"
			+ "(select u.userId from User u where u.username= :username)")
	public void deleteOrderByUsername(@Param("username") String username);
	
	

}
