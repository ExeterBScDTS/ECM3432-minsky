package minskyone;

import static org.junit.Assert.assertTrue;

import java.util.Properties;

import org.junit.Test;

public class SensorTest {

    @Test
    public void testGetSensorsList(){

        Properties props = System.getProperties();
        for (Object key : props.keySet())
        {
            System.out.println(key.toString());
        }
        String slist = Sensor.getSensorsList();
        assertTrue( slist.equals("hello"));
    }
}
