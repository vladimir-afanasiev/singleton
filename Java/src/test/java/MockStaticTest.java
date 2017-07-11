import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.powermock.api.mockito.PowerMockito;
import org.powermock.core.classloader.annotations.PrepareForTest;
import org.powermock.modules.junit4.PowerMockRunner;

/**
 * Created by vladimir_afanasiev on 24.04.2017.
 */
@RunWith(PowerMockRunner.class)
@PrepareForTest({ClassForMock.class})
public class MockStaticTest {

    private String mockedValue = "This value is mocked !!!!";

    @Mock
    private ClassForMock classForMock;

    @Before
    public void setup() throws Exception{
        PowerMockito.mockStatic(ClassForMock.class);

        classForMock = Mockito.mock(ClassForMock.class);
        Mockito.when(classForMock.getValue()).thenReturn(mockedValue);
        PowerMockito.when(ClassForMock.get_instance()).thenReturn(classForMock);
    }

    @Test
    public void checkStaticInstanceMock() throws Exception{
        Assert.assertEquals(mockedValue, ClassForMock.get_instance().getValue());
    }

    @Test
    public void checkStaticInstanceMockThoughContainer() throws Exception{
        Assert.assertEquals(mockedValue, Container.getValue());
    }

}
