package com.icelandair.web;


import com.icelandair.domain.Model;
import com.icelandair.service.IService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 */
@RestController
@RequestMapping(value = {"/"})
public class Controller {

  @Autowired
  IService service;

  @RequestMapping(value = "/hello",
    method = RequestMethod.GET,
    produces = MediaType.APPLICATION_JSON_VALUE)
  public Model getHello(){
    return service.getHello();
  }
}
