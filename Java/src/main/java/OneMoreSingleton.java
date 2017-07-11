/**
 * Created by Vladimir_Afanasiev on 03.07.2017.
 */
public abstract class OneMoreSingleton<T extends Object> {
    private  static volatile Object _instance;

    public interface Creator{
        Object create();
    }



}
