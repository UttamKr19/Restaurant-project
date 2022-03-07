package com.uttam.restaurant.dao;

import org.springframework.data.repository.CrudRepository;

import com.uttam.restaurant.model.Feedback;

public interface FeedbackDao extends CrudRepository<Feedback, Long>{

}
