package com.uttam.restaurant.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.uttam.restaurant.model.Feedback;
import com.uttam.restaurant.service.FeedbackService;

@RestController
@RequestMapping(value = "/api/v1")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class FeedbackController {

	@Autowired
	private FeedbackService feedbackService;

	@GetMapping("/feedback-home")
	public String homeFeedback() {
		return "feedback-controller-running";
	}

	// get feedback by email/id missing, because no need

	@GetMapping("/feedbacks")
	public ResponseEntity<List<Feedback>> getAllFeedbacks() {
		try {
			List<Feedback> feedbacks = feedbackService.getAllFeedbacks();
			if (feedbacks.size() <= 0) {
				return ResponseEntity.status(HttpStatus.NO_CONTENT).build(); // 204
			}
			return ResponseEntity.ok().body(feedbacks);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).build(); // 400
		}

	}

	@PostMapping("/feedback")
	public ResponseEntity<Feedback> addFeedback(@RequestBody Feedback feedback) {
		try {
			feedbackService.addFeedback(feedback);
			return ResponseEntity.ok().body(feedback); //200
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).build(); // 400
		}
	}

	@PutMapping("/feedback")
	public ResponseEntity<Feedback> updateFeedback(@RequestBody Feedback feedback) {
		try {
			feedbackService.updateFeedback(feedback);
			return ResponseEntity.ok().body(feedback);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).build(); // 400
		}
	}

	@DeleteMapping("/feedback")
	public ResponseEntity<HttpStatus.Series> deleteFeedback(@RequestBody Feedback feedback) {
		try {
			System.err.println(feedback);
			feedbackService.deleteFeedback(feedback);
			System.out.println("deleted feedback");
			return ResponseEntity.status(HttpStatus.OK).build(); // 200
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).build(); // 400
		}
	}

}
