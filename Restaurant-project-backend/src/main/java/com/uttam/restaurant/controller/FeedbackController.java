package com.uttam.restaurant.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.uttam.restaurant.model.Feedback;
import com.uttam.restaurant.service.FeedbackService;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class FeedbackController {
	
	@Autowired
	private FeedbackService feedbackService;
	
	@GetMapping("/feedback")
	public String homeFeedback() {
		return "feedback-controller-running";
	}
	
	@GetMapping("/feedback/all")
	public ResponseEntity<List<Feedback>> getAllFeedbacks() {
		List<Feedback> feedbacks= feedbackService.getAllFeedbacks();
		if(feedbacks.size()<=0) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}
		return ResponseEntity.of(Optional.of(feedbacks));
	}
	
	@PostMapping("/feedback/add")
	public void addFeedback(@RequestBody Feedback feedback) {
		System.out.println(feedback);
		feedbackService.addFeedback(feedback);
	}

}
