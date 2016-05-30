package com.icelandair;

import io.github.robwin.swagger.test.SwaggerAssertions;
import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.IntegrationTest;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;

import java.io.File;

@Ignore
@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = Application.class)
@IntegrationTest
@WebAppConfiguration
public class ApplicationTests {

  private static String CONTRACT_PATH = System.getProperty("user.dir") + "/contracts/downstream/SomeConsumer/";
  private static String API_DOC_URL = "http://localhost:10000/v2/api-docs";

  @Test
  public void testAllContractsSatisfySpecs(){
    File contractsFolder = new File(CONTRACT_PATH);
    File[] contracts = contractsFolder.listFiles();

    if (contracts != null) {
      for (File contract : contracts) {
        SwaggerAssertions.assertThat(API_DOC_URL).satisfiesContract(CONTRACT_PATH + contract.getName());
      }
    }
  }
}
