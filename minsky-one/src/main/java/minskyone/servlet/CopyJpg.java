package minskyone.servlet;

import java.awt.image.BufferedImage;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;
import javax.imageio.ImageIO;

public class CopyJpg {

    public static void writeJPG(FileInputStream in,  OutputStream out){
        try {
            BufferedImage image = ImageIO.read(in);
            ImageIO.write(image, "JPG", out);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}