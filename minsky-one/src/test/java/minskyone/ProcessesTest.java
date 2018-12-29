package minskyone;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import static org.junit.Assert.*;

import static org.mockito.Mockito.*;

public class ProcessesTest{

    @Before
    public void setUp() {
    }

    @Test
    public void testA(){
        Processes.launch("ls -l");
        assertTrue(true);
    }
}
