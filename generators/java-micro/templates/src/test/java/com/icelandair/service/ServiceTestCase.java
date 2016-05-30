package com.icelandair.service

import org.junit.Before;
import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.runners.MockitoJUnitRunner;
import org.springframework.beans.factory.annotation.Autowired;

import java.rmi.RemoteException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.junit.Assert.assertTrue;
import static org.mockito.Matchers.*;
import static org.mockito.Mockito.when;

/**
 * 
 */

@RunWith(MockitoJUnitRunner.class)
public class ServiceTestCase {

  //@InjectMocks
  @Autowired
  <%= projectName %>Service service;

  @Before
  public void setUp() {
    MockitoAnnotations.initMocks(this);
  }


  @Test
  public void isHelloOK(){
    String welcome = service.isHelloOK();
    assertTrue("Should be ok", "Hello".equalsIgnoreCase(welcome));
  }

}
