package com.icelandair.service;

import com.icelandair.domain.Model;
import com.icelandair.service.implementation.ServiceImpl;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.mockito.runners.MockitoJUnitRunner;

import static org.junit.Assert.assertTrue;

/**
 *
 */
@RunWith(MockitoJUnitRunner.class)
public class ServiceTestCase {

  IService service = new ServiceImpl();

  @Before
  public void setUp() {
    MockitoAnnotations.initMocks(this);
  }


  @Test
  public void isHelloOK(){
    Model welcome = service.getHello();
    assertTrue("Should be ok", "Hello".equalsIgnoreCase(welcome.getWelcome()));
  }

}
