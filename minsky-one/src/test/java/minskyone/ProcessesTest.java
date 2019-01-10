package minskyone;

import static org.junit.Assert.assertTrue;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Ignore;
import org.junit.Test;

public class ProcessesTest{

    @Before
    public void setUp() {
    }

    @Test
    public void WhenILaunchAProcessThenICanStopTheProcess(){
        String os = System.getProperty("os.name");
        String id = "dummy.id";

        if (os.contains("Linux"))
            Processes.launch(id,"yes hello");
        else if (os.contains("Windows"))
            Processes.launch(id, "cmd hello");
        else
            Assert.fail(String.format("Operating system %s is not supported", os));

        Processes.stop(id);
        assertTrue(true);
    }
}
