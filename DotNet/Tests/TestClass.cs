using NUnit.Framework;
using FluentAssertions;
using Moq;
using singletonMock;
using TypeMock.ArrangeActAssert;

namespace Tests
{
    [TestFixture]
    public class TestClass
    {

        const string mockedValue = "Mocked value!!!!!";

        [Test]
        public void MockReturnValue()  // стандартный способ не подходит. 
        {
            var mock = new Mock<ClassForMock>();
            mock.Setup(m => m.GetValue()).Returns(mockedValue);

           // mock.Object.GetValue().ShouldBeEquivalentTo(mockedValue);

            ClassForMock.Instance.GetValue().ShouldBeEquivalentTo(mockedValue);
        }

        [Test, Isolated]
        public void MockStaticInstance()  // таки, мокаем класс и проверяем. 
        {
            var mock = new Mock<ClassForMock>();
            mock.Setup(m => m.GetValue()).Returns(mockedValue);
            Isolate.WhenCalled(() => ClassForMock.Instance).WillReturn(mock.Object);
            ClassForMock.Instance.GetValue().ShouldBeEquivalentTo(mockedValue);
        }

        [Test, Isolated]
        public void MockConstructor()  // а что у нас с конструктором? вроде работает. 
        {
            var fakeClassForMock =  Isolate.Fake.NextInstance<ClassForMock>();
            Isolate.WhenCalled(()=> fakeClassForMock.GetValue()).WillReturn(mockedValue);
            ClassForMock.Instance.GetValue().ShouldBeEquivalentTo(mockedValue);
        }


        [Test, Isolated]
        public void MockStaticInstanceAndPassedThruContainer()  // Точно рабочий способ 
        {
            var mock = new Mock<ClassForMock>();
            mock.Setup(m => m.GetValue()).Returns(mockedValue);
            Isolate.WhenCalled(() => ClassForMock.Instance).WillReturn(mock.Object);
            Container.GetValue().ShouldBeEquivalentTo(mockedValue);
        }

        [Test, Isolated]    
        public void MockConstructorAndPassedThruContainer()  // Не работает в этой библиотеке. конструктор замокать нельзя не смотря на уверения разработчиков продукта. 
        {
            var fakeClassForMock = Isolate.Fake.Instance<ClassForMock>();  // так тоже не работает. 
            Isolate.WhenCalled(() => fakeClassForMock.GetValue()).WillReturn(mockedValue);
            Container.GetValue().ShouldBeEquivalentTo(mockedValue);
        }


    }
}
