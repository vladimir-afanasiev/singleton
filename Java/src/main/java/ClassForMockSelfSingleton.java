/**
 * Created by vladimir_afanasiev on 24.04.2017.
 */
public class ClassForMockSelfSingleton {
    private static ClassForMockSelfSingleton _instance;
    private static Object sync = new Object();


    public static ClassForMockSelfSingleton getInstance() {

        if(_instance == null) {
            synchronized (sync) {
                if(_instance == null) {
                    _instance = new ClassForMockSelfSingleton();
                }
            }
        }
        return  _instance;
    }


    public String getValue(){
        return "this is non-mocked value";
    }
}
