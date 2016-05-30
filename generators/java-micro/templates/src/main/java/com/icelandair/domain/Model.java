package com.icelandair.domain;

/**
 * Model object for
 */
public class Model {
	private String welcome;

  public String getWelcome() {
    return welcome;
  }

  public void setWelcome(String welcome) {
    this.welcome = welcome;
  }

  @Override
	public String toString() {
		return "Model{" +
				"welcome='" + welcome + '\'' +
				'}';
	}
}
