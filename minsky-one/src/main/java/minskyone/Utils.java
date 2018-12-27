package minskyone;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;

public class Utils {

    public static String getParameter(HttpServletRequest req, String name){

        ServletContext sc = req.getServletContext();
        String v = sc.getInitParameter( name );
        if(v == null){
            v = sc.getInitParameter( name + ".default" );
        }
        return v;
    }
    
}