using NUnit.Framework;
using Moq;
using singletonMock;
using FluentAssertions;
using Smocks;

namespace Tests_Moles
{
    [TestFixture]
    public class TestClass_Smokes
    {

        const string mockedValue = "Mocked value!!!!!";


        [Test]
        public void MockReturnValue()  // Нельзя замокать стандартным способом. 
        {
            var mock = new Mock<ClassForMock>();
            mock.Setup(m => m.GetValue()).Returns(mockedValue);

            // mock.Object.GetValue().ShouldBeEquivalentTo(mockedValue);  // так работает. 

            ClassForMock.Instance.GetValue().ShouldBeEquivalentTo(mockedValue); // а так - нет. 
        }

        [Test]
        public void MockStaticInstance()  // Не работает в этой библиотеке. 
        {
            Smock.Run(context =>
            {
                var mock = new Mock<ClassForMock>();
                mock.Setup(m => m.GetValue()).Returns(mockedValue);

                context.Setup(() =>
                    ClassForMock.Instance).Returns(mock.Object);

                ClassForMock.Instance.GetValue().ShouldBeEquivalentTo(mockedValue);
            });
        }

        [Test]
        public void SmokeMockValue()
        {
            Smock.Run(context =>
            {
                context.Setup(() =>
                    ClassForMock.Instance.GetValue()).Returns(mockedValue);

                ClassForMock.Instance.GetValue().ShouldBeEquivalentTo(mockedValue);

            });
        }

        [Test]
        public void SmokeMockValueAndPassedThruContainer()
        {
            Smock.Run(context =>
            {
                context.Setup(() =>
                    ClassForMock.Instance.GetValue()).Returns(mockedValue);

                Container.GetValue().ShouldBeEquivalentTo(mockedValue);

            });
        }
    }
}
