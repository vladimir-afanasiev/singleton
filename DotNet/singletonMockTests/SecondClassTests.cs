using FluentAssertions;
using Microsoft.VisualStudio.TestTools.UnitTesting;


namespace singletonMock.Tests
{
    [TestClass()]
    public class SecondClassTests
    {
        [TestMethod()]
        public void DifferentSingletons_ShouldReturnDifferentValues()
        {
            ClassForMock.Instance.GetValue().Should().NotBe(SecondClass.Instance.ReturnValue());
        }
    }
}