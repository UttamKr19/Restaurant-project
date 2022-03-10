package com.uttam.restaurant.service;

import java.util.List;

import com.uttam.restaurant.model.Feedback;

public interface FeedbackService {

	List<Feedback> getAllFeedbacks();

	void addFeedback(Feedback feedback);

	void updateFeedback(Feedback feedback);

	void deleteFeedback(Feedback feedback);

}
