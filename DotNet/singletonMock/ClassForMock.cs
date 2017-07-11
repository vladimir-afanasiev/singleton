namespace singletonMock
{
    public class ClassForMock: Singleton<ClassForMock>
    {
        public virtual string GetValue()
        {
            return "ThisIs not mocked class";
        }
    }
}