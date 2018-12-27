package minskyOne.servlet;

import javax.servlet.http.HttpServlet;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import minskyOne.Utils;

public class Camera extends HttpServlet {

    private static final long serialVersionUID = 1L;
    int frame_num = 5;

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException
    {
        resp.setContentType("image/png");
        resp.setContentLength(-1);
        OutputStream out = resp.getOutputStream();
        ServletContext cntx= req.getServletContext();
        boolean copy_image = false;

        if(copy_image){
        // Get the absolute path of the image
        String filename = cntx.getRealPath("sample.apng");

        File file = new File(filename);
        FileInputStream in = new FileInputStream(file);

        // Copy the contents of the file to the output stream
         byte[] buf = new byte[1024];
         int count = 0;
         while ((count = in.read(buf)) >= 0) {
           out.write(buf, 0, count);
        }

        in.close();
        }else{
        String param = Utils.getParameter(req, "minsky.camera.tirpath");    
        // Get the absolute path of the image
        String path = String.format("tir-samples/frame%03d.bin", frame_num);
        frame_num++;
        if(frame_num > 60) frame_num=5;
        String filename = cntx.getRealPath(path);
        File file = new File(filename);
        FileInputStream in = new FileInputStream(file);
        Rawtopng.writePNG(in, out);
        }

        out.close();
    }

}
