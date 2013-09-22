using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shared
{
    /// <summary>
    /// OperationType Class
    /// </summary>
    public static class OperationType
    {
        //add the mappings for operation type and its corresponding sql query text
        public static readonly Dictionary<String, String> Map
            = new Dictionary<String, String>
            {
                {Read, OperationText.Read},
                {ReadByCategory, OperationText.ReadByCategory},
                {ReadById, OperationText.ReadById}
            };

        public const String Read = "Read";
        public const String ReadByCategory = "ReadByCategory";
        public const String ReadById = "ReadById";
    }

    /// <summary>
    /// Class to provide custom exception messages
    /// </summary>
    public static class Exceptions
    {
        public const String Error = "Some error has occured";
    }

    /// <summary>
    /// OperationText Class
    /// </summary>
    public static class OperationText
    {
        public const String Read = "SELECT * FROM tblBook";
        public const String ReadByCategory = "SELECT * FROM tblBook WHERE Category = @category";
        public const String ReadById = "SELECT * FROM tblBook WHERE Id = @id";
    }

}
