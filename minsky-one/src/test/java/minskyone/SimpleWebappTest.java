package minskyone;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URI;
import java.net.URL;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.eclipse.jetty.security.HashLoginService;
import org.eclipse.jetty.security.LoginService;
import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.webapp.WebAppContext;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;


// See https://www.eclipse.org/jetty/documentation/9.4.x/embedded-examples.html

public class SimpleWebappTest {

  private Server server;

  @Before
  public void setUp() throws Exception {

    ClassLoader classLoader = getClass().getClassLoader();
    URI uri = classLoader.getResource(".").toURI(); // absolute path to target/classess
    Path projPath = Paths.get(uri).resolve("../..").normalize();
    Path webappPath = projPath.resolve("src/main/webapp"); // use minimal web.xml

      server = new Server(8082);
      server.setStopAtShutdown(true);

      LoginService loginService = new HashLoginService("Test Realm",
      Paths.get(projPath.toString(),"src/etc/realm.properties").normalize().toString());
      server.addBean(loginService);

      WebAppContext webAppContext = new WebAppContext();
      webAppContext.setContextPath("/minskyOne-0.1");  // must match contextPath in jetty-web.xml
      webAppContext.setResourceBase(webappPath.toString());
      webAppContext.setClassLoader(getClass().getClassLoader());
      server.setHandler(webAppContext);
      server.start();
    }
  
    @After
    public void tearDown() throws Exception {
      server.stop();
    }

    @Test
    public void testWebappDeploy() {
      HttpURLConnection connection = null;
      try {
        // Fetch an HTML page rather than JSP as this is easier with embedded server.
        URL url = new URL("http://localhost:8082/minskyOne-0.1/logon.html");
        connection = (HttpURLConnection) url.openConnection();
        if (connection.getResponseCode() != 200) {
          throw new RuntimeException("Failed! HTTP Error Code: " + connection.getResponseCode());
        }
        BufferedReader br = new BufferedReader(new InputStreamReader((connection.getInputStream())));
        String str;
        while ((str = br.readLine()) != null) {
          System.out.println(str);
        }
      } catch (MalformedURLException e) {
        e.printStackTrace();
      } catch (IOException e) {
        e.printStackTrace();
      } finally {
        if (connection != null) {
          connection.disconnect();
        }
      }
    }  

    /*
    @Test
    public void testWebappJsp() {
      HttpURLConnection connection = null;
      try {
        URL url = new URL("http://localhost:8080/webapp/index.jsp");
        connection = (HttpURLConnection) url.openConnection();
        if (connection.getResponseCode() != 200) {
          throw new RuntimeException("Failed! HTTP Error Code: " + connection.getResponseCode());
        }
        BufferedReader br = new BufferedReader(new InputStreamReader((connection.getInputStream())));
        String str;
        while ((str = br.readLine()) != null) {
          System.out.println(str);
        }
      } catch (MalformedURLException e) {
        e.printStackTrace();
      } catch (IOException e) {
        e.printStackTrace();
      } finally {
        if (connection != null) {
          connection.disconnect();
        }
      }
    }
    */  
}

