package minskyone;

import static org.junit.Assert.assertTrue;

import org.junit.Before;
import org.junit.Ignore;
import org.junit.Test;

public class ProcessesTest{

    @Before
    public void setUp() {
    }

    @Test @Ignore
    public void testA(){
        Processes.launch("dummy.id","yes hello");
        Processes.stop("dummy.id");
        assertTrue(true);
    }
}
