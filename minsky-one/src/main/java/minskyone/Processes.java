package minskyone;

import java.io.IOException;

public class Processes {

    public static void launch(String cmd) {
        Process myproc;
        try {
            myproc = new ProcessBuilder().command(cmd.split("\\s+")).inheritIO().start();
        } catch (IOException e) {
            // TODO Auto-generated catch block
			e.printStackTrace();
		}
        //myproc.destroy();
    }    
}