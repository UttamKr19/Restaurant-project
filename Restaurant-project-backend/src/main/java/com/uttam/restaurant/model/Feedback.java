package com.uttam.restaurant.model;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;


@Entity
@Table(name="feedback_table")
public class Feedback implements Serializable{
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long feedbackId;
	private String userName;
	private String email;
	private String feedbackContent;

	public Feedback() {
		super();
	}

	public Feedback(long feedbackId, String userName, String email, String feedbackContent) {
		super();
		this.feedbackId = feedbackId;
		this.userName = userName;
		this.email = email;
		this.feedbackContent = feedbackContent;
	}


	public long getFeedbackId() {
		return feedbackId;
	}

	public void setFeedbackId(long feedbackId) {
		this.feedbackId = feedbackId;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getFeedbackContent() {
		return feedbackContent;
	}

	public void setFeedbackContent(String feedbackContent) {
		this.feedbackContent = feedbackContent;
	}


}
