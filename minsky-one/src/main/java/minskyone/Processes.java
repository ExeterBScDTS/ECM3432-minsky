package minskyone;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class Processes {

    static Map<String, Process> myprocs = new HashMap<String, Process>();

    public static void launch(String id, String cmd) {
        try {
            Process proc = new ProcessBuilder().command(cmd.split("\\s+")).inheritIO().start();
            myprocs.put(id, proc);
        } catch (IOException e) {
            // TODO Auto-generated catch block
			e.printStackTrace();
        }
        //myproc.destroy();
    }
    
    
    public static void stop(String id) {
        myprocs.get(id).destroy();
    }
}