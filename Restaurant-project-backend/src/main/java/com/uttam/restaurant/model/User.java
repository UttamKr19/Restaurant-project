package com.uttam.restaurant.model;

import java.io.Serializable;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "user_table")
public class User implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="u_id")
	private Long userId;
	
	private String name;
	
	@Column(unique=true,nullable=false)
	private String username;
	
	@Column(unique = true, nullable=false)
	private String email;
	
	private String password;

	private String address;

	private String role;

	private boolean enabled;

	@OneToMany(mappedBy = "orderId",  fetch = FetchType.EAGER, cascade = { CascadeType.ALL })
	private List<Order> orders;

	public User() {
		super();
	}

	public User(Long userId, String name, String username, String email, String password, String address, String role,
			boolean enabled, List<Order> orders) {
		super();
		this.userId = userId;
		this.name = name;
		this.username = username;
		this.email = email;
		this.password = password;
		this.address = address;
		this.role = role;
		this.enabled = enabled;
		this.orders = orders;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public boolean isEnabled() {
		return enabled;
	}

	public void setEnabled(boolean enabled) {
		this.enabled = enabled;
	}

	public List<Order> getOrders() {
		return orders;
	}

	public void setOrders(List<Order> orders) {
		this.orders = orders;
	}

	
	
}
