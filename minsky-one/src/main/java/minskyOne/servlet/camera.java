package minskyOne.servlet;

import javax.servlet.http.HttpServlet;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.util.Enumeration;
import java.util.Properties;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class camera extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException
    {
        resp.setContentType("image/png");
        resp.setContentLength(-1);


        ServletContext cntx= req.getServletContext();
        // Get the absolute path of the image
        String filename = cntx.getRealPath("sample.apng");

        File file = new File(filename);
        FileInputStream in = new FileInputStream(file);
        OutputStream out = resp.getOutputStream();
  
        // Copy the contents of the file to the output stream
         byte[] buf = new byte[1024];
         int count = 0;
         while ((count = in.read(buf)) >= 0) {
           out.write(buf, 0, count);
        }
      out.close();
      in.close();

    }

}
