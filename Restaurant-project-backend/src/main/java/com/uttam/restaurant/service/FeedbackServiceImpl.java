package com.uttam.restaurant.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.uttam.restaurant.dao.FeedbackDao;
import com.uttam.restaurant.model.Feedback;

@Service
public class FeedbackServiceImpl implements FeedbackService{

	@Autowired
	private FeedbackDao feedbackDao;
	

	@Override
	public List<Feedback> getAllFeedbacks() {
		return (List<Feedback>) feedbackDao.findAll();
	}

	@Override
	public void addFeedback(Feedback feedback) {
		feedbackDao.save(feedback);
	}

	@Override
	public void updateFeedback(Feedback feedback) {
		feedbackDao.save(feedback);
	}

	@Override
	public void deleteFeedback(Feedback feedback) {
		feedbackDao.delete(feedback);
	}

}
