package minskyone;

import java.io.DataInputStream;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;


//import minskyone.ByteSwapper;
//import minskyone.Utils;

public class HistogramData {

    public static void getDdata(String filename)
    {   
 
        try {
            DataInputStream in;
            in = new DataInputStream(new FileInputStream(filename));
            Float[] f = new Float[24 * 32];

            for(int y=0; y <24; y++){
                for(int x=0; x<32; x++){
                    f[y * 32 + x] = ByteSwapper.swap(in.readFloat());
                }
            }
            in.close();


            List<Float>  ir = Arrays.asList(f);
            float ir_min = Collections.min(Arrays.asList(f));
            float ir_max = Collections.max(Arrays.asList(f));

            double start = Math.floor(ir_min / 10.0) * 10.0;
            double end = Math.ceil(ir_max / 10.0) * 10.0; 
            double bin_width = (end-start) / 20.0;

            int[] hist = new int[20];

            for( double el : ir){
                double v = el - start;
                int bin = (int)Math.abs(v / bin_width);
                hist[bin]++;
            }

            for( int n = 0; n < hist.length; n++  ){
                //out.printf("%d %d %n", n, hist[n]);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

}
