package com.icelandair.service.implementation;

import com.icelandair.domain.Model;
import com.icelandair.service.IService;
import org.springframework.stereotype.Service;

/**
 *
 */
@Service
public class ServiceImpl implements IService {

  public Model getHello(){
    Model model = new Model();
    model.setWelcome("Hello");
    return model;
  }
}

