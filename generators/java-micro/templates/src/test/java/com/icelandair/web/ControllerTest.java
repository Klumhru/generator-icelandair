package com.icelandair.web

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

import static com.icelandair.domain.Model;

/**
 *
 */

@RunWith(MockitoJUnitRunner.class)
public class ControllerTest {

  @Mock
  Serive service

  @InjectMocks
  @Autowired
  <%= projectName %>Controller controller;

  @Autowired
  AnnotationMethodHandlerAdapter handlerAdapter;

  private MockRenderRequest renderRequest;
  private MockRenderResponse renderResponse;
  private PortletPreferences portletPreferences;
  private MockActionRequest actionRequest;
  private MockActionResponse actionResponse;
  private PortletSession portletSession;
  private Model model;

  @Before
  public void setUp() {
    renderRequest = new MockRenderRequest();
    renderResponse = new MockRenderResponse();
    portletPreferences = new MockPortletPreferences();
    actionRequest = new MockActionRequest();
    actionResponse = new MockActionResponse();
    portletSession = new MockPortletSession();
    portletPreferences = actionRequest.getPreferences();
    actionRequest.setSession(portletSession);
    renderRequest.setSession(portletSession);
    model = new BindingAwareModelMap();
    MockitoAnnotations.initMocks(this);
  }


  @Test
  public void isHelloOK(){
    when(service.isHello()).thenReturn("Hello");
    String welcome = controller.isHello();
    assertTrue("Should be ok", "Hello".equalsIgnoreCase(welcome));
  }

  @Test
  public void notHello(){
    when(service.isHello()).thenReturn("By");
    String welcome = controller.isHello();
    assertFalse("Should not be ok", "Hello".equalsIgnoreCase(welcome));
  }

}
