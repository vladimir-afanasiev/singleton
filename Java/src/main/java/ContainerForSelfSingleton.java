/**
 * Created by vladimir_afanasiev on 24.04.2017.
 */
public class ContainerForSelfSingleton {
    public static String getValue() {
        return ClassForMockSelfSingleton.getInstance().getValue();
    }

}
