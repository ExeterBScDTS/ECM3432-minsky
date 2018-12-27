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
    public void setUp() throws Exception {
        ServletContext sc = mock(ServletContext.class);
        req = mock(HttpServletRequest.class);
        when(req.getServletContext()).thenReturn(sc);
        when(sc.getInitParameter( "mock.init.parameter" )).thenReturn("boo");
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
}
