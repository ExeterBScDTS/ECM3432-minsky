package minskyone;

import java.io.DataInputStream;
import java.io.FileInputStream;
import java.io.IOException;

public class TemperatureData {

    public static Float[] getData(String filename, int x_from, int y_from, int x_to, int y_to)
    // 0, 0, 32, 24
    { 
        try {
            DataInputStream in;
            in = new DataInputStream(new FileInputStream(filename));
            Float[] f = new Float[(y_to - y_from) * (x_to - x_from)];

            for(int y=y_from; y < y_to; y++){
                for(int x=x_from; x < x_to; x++){
                    f[y * 32 + x] = ByteSwapper.swap(in.readFloat());
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
