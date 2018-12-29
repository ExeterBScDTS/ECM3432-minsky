package minskyone;

import java.io.IOException;

public class Processes {

    static Process myproc = null;

    public static void launch(String id, String cmd) {
        try {
            myproc = new ProcessBuilder().command(cmd.split("\\s+")).inheritIO().start();
        } catch (IOException e) {
            // TODO Auto-generated catch block
			e.printStackTrace();
        }
        //myproc.destroy();
    }
    
    
    public static void stop(String id) {
        myproc.destroy();
    }
}