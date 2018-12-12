package minskyOne;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;


import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.server.handler.ContextHandler;
import org.eclipse.jetty.webapp.WebAppContext;

// See https://www.eclipse.org/jetty/documentation/9.4.x/embedded-examples.html

public class SimpleWebappTest {

    private Server server;
  
    @Before
    public void setUp() throws Exception {
      server = new Server(8080);
      server.setStopAtShutdown(true);

      //ContextHandler context = new ContextHandler();
      //context.setContextPath( "/hello" );
      //context.setResourceBase("github/ExeterBScDTS/ECM3432-minsky/minsky-one/src/main/webapp");
      //context.setClassLoader(getClass().getClassLoader());
      //context.setHandler( new HelloHandler() );

      // Can be accessed using http://localhost:8080/hello

      //server.setHandler( context );
      WebAppContext webAppContext = new WebAppContext();
      webAppContext.setContextPath("/webapp");
      webAppContext.setResourceBase("github/ExeterBScDTS/ECM3432-minsky/minsky-one/src/main/webapp");
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
        URL url = new URL("http://localhost:8080/webapp/index.html");
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
}

