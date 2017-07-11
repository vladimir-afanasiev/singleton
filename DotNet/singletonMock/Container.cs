namespace singletonMock
{
    public class Container
    {
        public static string GetValue()
        {
            return ClassForMock.Instance.GetValue();
        } 
    }
}