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
@PrepareForTest (ClassForMockSelfSingleton.class)
public class MockConstructorTest {
    private String mockedValue = "This value is mocked !!!!";
    @Mock
    private ClassForMockSelfSingleton classForMock;
    @Before
    public void setup() throws Exception{

        classForMock = Mockito.mock(ClassForMockSelfSingleton.class);
        Mockito.when(classForMock.getValue()).thenReturn(mockedValue);

        PowerMockito.mock(ClassForMockSelfSingleton.class);
        PowerMockito.whenNew(ClassForMockSelfSingleton.class)
                .withAnyArguments()
                .thenReturn(classForMock);
    }
    @Test
    public void checkConstructorMock() throws Exception{
        Assert.assertEquals(mockedValue, ClassForMockSelfSingleton.getInstance().getValue());
    }
    @Test
    public void checkConstructorMockThoughContainer() throws Exception{
        Assert.assertEquals(mockedValue, ContainerForSelfSingleton.getValue());
    }
}
