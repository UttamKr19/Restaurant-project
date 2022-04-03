package com.uttam.restaurant.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
public class HomeController {

	@GetMapping(value={"/","/home"})
	public String home() {
		return "server-home-running";
	}
	
	@GetMapping(value={"/test-user-privileges"})
	public String testUserPrev() {
		return "testUserPrivileges";
	}
	
}
