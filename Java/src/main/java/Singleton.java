import sun.reflect.generics.reflectiveObjects.NotImplementedException;

/**
 * Created by vladimir_afanasiev on 24.04.2017.
 */
public abstract class Singleton<T extends Object>  {
    private static volatile Object _instance;
    private static Object lock = new Object();

    protected static <T extends Object> T get_instance_internal(Class<T> clazz) throws IllegalAccessException, InstantiationException {
        if(_instance == null) {
            synchronized (lock) {
                if (_instance == null) {
                    _instance = clazz.newInstance();
                }
            }
        }
        return (T) _instance;
    }

    public static  <T extends Object> T get_instance() throws Exception {
        throw new NotImplementedException(); //Instancing is not defined in child
    };
}
