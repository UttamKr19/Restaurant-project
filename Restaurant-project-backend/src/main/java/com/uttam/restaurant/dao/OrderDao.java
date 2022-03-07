package com.uttam.restaurant.dao;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.uttam.restaurant.model.Order;

public interface OrderDao extends CrudRepository<Order, Long>{
	
	@Query("select order from Order order where order.user.email= :email")
	public List<Order> getOrdersByEmail(@Param("email") String email);
	
//	public List<Order> findByUser_User(@Param("email") String email);
	

}
