package minskyOne;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import static org.junit.Assert.*;

import java.util.Properties;

public class SensorTest{

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
