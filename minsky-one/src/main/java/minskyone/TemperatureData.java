package minskyone;

import java.io.DataInputStream;
import java.io.FileInputStream;
import java.io.IOException;

public class TemperatureData {

    public static String[] getData(String filename)
    { 
        try {
            DataInputStream in;
            in = new DataInputStream(new FileInputStream(filename));
            String[] f = new String[24 * 32];

            for(int y=0; y < 24; y++){
                for(int x=0; x < 32; x++){
                    Float v = ByteSwapper.swap(in.readFloat());
                    f[y * 32 + x] = v.toString();
                }
            }
            in.close();

            return f;

        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }
}
