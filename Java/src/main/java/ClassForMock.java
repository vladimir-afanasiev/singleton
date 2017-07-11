/**
 * Created by vladimir_afanasiev on 24.04.2017.
 */
public class ClassForMock extends Singleton<ClassForMock> {

    // Singleton workarround
    public static ClassForMock get_instance() throws Exception {
        return (ClassForMock) get_instance_internal(ClassForMock.class);
    }

    public String getValue(){
        return "This is non-mocked value";
    }

}
