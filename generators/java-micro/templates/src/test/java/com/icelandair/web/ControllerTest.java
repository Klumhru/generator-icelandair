package com.icelandair.web;


import com.icelandair.Application;
import com.icelandair.domain.Model;
import com.icelandair.service.implementation.ServiceImpl;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 *
 */
@RunWith(MockitoJUnitRunner.class)
@SpringApplicationConfiguration(classes = Application.class)
@WebAppConfiguration
public class ControllerTest {

  @Mock
  ServiceImpl service;

  @InjectMocks
  Controller controller;

  @Bean
  public MockMvc controlMock() {
    return MockMvcBuilders.standaloneSetup(this.controller).build();
  }

  @Test
  public void isHelloOK() throws Exception {
    Model model = new Model();
    model.setWelcome("Hello");
    when(service.getHello()).thenReturn(model);
    controlMock()
      .perform(
        get("/hello")
      )
      .andExpect(
        status().isOk()
      )
      .andExpect(
        content().string("{\"welcome\":\"Hello\"}")
      );
  }

  @Test
  public void notHello() throws Exception {
    Model model = new Model();
    model.setWelcome("By");
    when(service.getHello()).thenReturn(model);
    controlMock()
      .perform(
        get("/")
      )
      .andExpect(
        status().isNotFound()
      );
  }

}
