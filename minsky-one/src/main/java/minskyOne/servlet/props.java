package minskyOne.servlet;

import javax.servlet.http.HttpServlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Enumeration;
import java.util.Properties;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class props extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException
    {
        resp.setContentType("text/plain");

        PrintWriter out = resp.getWriter();
        context(out, req);
        info(out,req.getPathInfo());
    }

    private void context(PrintWriter out, HttpServletRequest req)
    {
        ServletContext sc = req.getServletContext();
        Enumeration<String> a = sc.getInitParameterNames();
        while(a.hasMoreElements()){
            String n = a.nextElement();
            out.printf("{%s}%n",n);
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
