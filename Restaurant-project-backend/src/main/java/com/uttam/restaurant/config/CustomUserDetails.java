package com.uttam.restaurant.config;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.uttam.restaurant.model.User;

public class CustomUserDetails implements UserDetails{

	private static final long serialVersionUID = 1L;

	@Autowired
	private User user;
	
	public CustomUserDetails(User user) {
		super();
		this.user=user;
	}
	
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		List<GrantedAuthority> grantedAuthorities=new ArrayList<GrantedAuthority>();
		System.err.println("getAuthorities "+user.getRole());
		SimpleGrantedAuthority simpleGrantedAuthority=new SimpleGrantedAuthority(user.getRole());
		grantedAuthorities.add(simpleGrantedAuthority);
		return grantedAuthorities;
	}

	@Override
	public String getPassword() {
		System.err.println("user.getPass "+user.getPassword());
		return user.getPassword();
	}

	@Override
	public String getUsername() {
		System.err.println("user.getEmail "+user.getEmail());
		return user.getEmail();
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

}
