using System;
using System.Reflection;

namespace singletonMock
{
    public class Singleton<T> where T: class
    {
        private static volatile T _instance;
        private static object syncRoot = new object();

        protected Singleton(){}

        public static T Instance
        {
            get
            {
                if ( _instance == null )
                {
                    lock (syncRoot)
                    {
                        if (_instance == null)
                        {
                            _instance = Activator.CreateInstance<T>();
                        }
                    }
                }
                return _instance;
            }
        } 

    }
}