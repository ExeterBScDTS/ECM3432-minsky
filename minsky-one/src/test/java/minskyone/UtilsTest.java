package minskyone;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import static org.junit.Assert.*;

import static org.mockito.Mockito.*;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;

public class UtilsTest{

    HttpServletRequest req; 

    @Before
    public void setUp() {
        ServletContext sc = mock(ServletContext.class);
        req = mock(HttpServletRequest.class);
        when(req.getServletContext()).thenReturn(sc);
        when(sc.getInitParameter( "mock.init.parameter" )).thenReturn("boo");

        // A parameter with default value
        when(sc.getInitParameter( "mock.init.defaulttest0" )).thenReturn("result");
        when(sc.getInitParameter( "mock.init.defaulttest0.default" )).thenReturn("hidden value");
        // A parameter with only a default
        when(sc.getInitParameter( "mock.init.defaulttest1.default" )).thenReturn("visible");
    }

    @Test
    public void testGetParameterNotSet(){

        String p = Utils.getParameter(req, "no.such.init.parameter");
        assertNull(p);
    }

    @Test
    public void testGetParameterSet(){

        String p = Utils.getParameter(req, "mock.init.parameter");
        assertTrue(p.equals("boo"));
    }

    @Test
    public void testGetParameterDefaultOnly(){

        String p = Utils.getParameter(req, "mock.init.defaulttest1");
        assertTrue(p.equals("visible"));
    }

    @Test
    public void testGetParameterDefaultMasked(){

        String p = Utils.getParameter(req, "mock.init.defaulttest0");
        assertTrue(p.equals("result"));
    }

    @Test
    public void testGetPathRelative(){
        // Example paths
        String realPath;
        realPath = java.nio.file.Paths.get(".").toAbsolutePath().toString();
        System.out.printf("file.Paths.get for . =%s%n", realPath);
        realPath = java.nio.file.Paths.get("/").toAbsolutePath().toString();
        System.out.printf("file.Paths.get for / =%s%n", realPath);

    }
}
