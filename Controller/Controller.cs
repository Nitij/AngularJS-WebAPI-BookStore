using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Shared;
using DataAccess;

namespace Controller
{
    public class CommonController
    {
        #region Private Variables
        private DataManager manager;
        #endregion Private Variables

        #region Constructer
        /// <summary>
        /// Constructer
        /// </summary>
        public CommonController()
        {
            manager = new DataManager();
        }
        #endregion Constructer

        /// <summary>
        /// Execute Operation
        /// </summary>
        /// <param name="operationType"></param>
        /// <param name="data"></param>
        /// <returns></returns>
        public Object ExecuteOperation(String operationType, Dictionary<String, Object> data)
        {
            Object retVal = new Object();

            //Implementing a global try-catch block, never use this shortcut for production version 
            try
            {
                switch (operationType)
                {
                    case OperationType.Read:
                        retVal = manager.ReadBooksData();
                        break;
                    case OperationType.ReadById:
                        retVal = manager.ReadBookById(data);
                        break;
                    case OperationType.ReadByCategory:
                        retVal = manager.ReadBookByCategory(data);
                        break;
                    default:
                        break;
                }
            }
            catch (Exception exception)
            {
                throw new Exception(String.Concat(Exceptions.Error, ": ", exception.Message));
            }
            return retVal;
        }
    }
}
