namespace singletonMock
{
    public class SecondClass: Singleton<SecondClass>
    {
        public string ReturnValue()
        {
            return "ThisIs second Singleton";
        }
    }
}