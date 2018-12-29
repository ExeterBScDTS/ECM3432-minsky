package minskyone.servlet;

import javax.servlet.http.HttpServlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Enumeration;
import java.util.Properties;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class Props extends HttpServlet {
    private static final long serialVersionUID = 1L;

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException
    {
        resp.setContentType("text/plain");
        PrintWriter out = resp.getWriter();

        ServletContext cntx= req.getServletContext();
        String realPath; 
        realPath = cntx.getRealPath(".");
        out.printf("RealPath for . =%s%n", realPath);
        realPath = cntx.getRealPath("/");
        out.printf("RealPath for / =%s%n", realPath);

        realPath = java.nio.file.Paths.get(".").toAbsolutePath().toString();
        out.printf("file.Paths.get for . =%s%n", realPath);
        realPath = java.nio.file.Paths.get("/").toAbsolutePath().toString();
        out.printf("file.Paths.get for / =%s%n", realPath);
        context(out, req);
        info(out,req.getPathInfo());
    }

    private void context(PrintWriter out, HttpServletRequest req)
    {
        ServletContext sc = req.getServletContext();
        Enumeration<String> a = sc.getInitParameterNames();
        while(a.hasMoreElements()){
            String n = a.nextElement();
            String v = sc.getInitParameter(n);
            out.printf("{%s} = %s%n",n,v);
        }
    
    }
    private void info(PrintWriter out, String propName)
    {
        if ((propName == null) || (propName.length() == 0))
        {
            // dump all system properties.
            Properties props = System.getProperties();
            for (Object key : props.keySet())
            {
                info(out,key.toString());
            }
            return;
        }

        if (propName.charAt(0) == '/')
        {
            propName = propName.substring(1);
        }

        String val = System.getProperty(propName);
        if (val == null)
        {
            out.printf("[%s] = <null>%n",propName);
        }
        else
        {
            out.printf("[%s] = %s%n",propName,val);
        }
    }
}