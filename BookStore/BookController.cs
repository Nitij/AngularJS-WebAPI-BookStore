using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.SessionState;

using Controller;
using Shared;
using Shared.Models;

namespace BookStore
{
    public class BookController : ApiController
    {
        /// <summary>
        /// Get all books
        /// </summary>
        /// <returns></returns>
        public List<BookModel> GetBooks()
        {
            CommonController commonController = HttpContext.Current.Session["CommonController"] as CommonController;
            List<BookModel> returnData = commonController.ExecuteOperation(OperationType.Read, null) as List<BookModel>;

            return returnData;
        }

        /// <summary>
        /// Get book by its id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public List<BookModel> GetBookById(Int32 id)
        {
            CommonController commonController = HttpContext.Current.Session["CommonController"] as CommonController;
            Dictionary<String, Object> data = new Dictionary<String, Object>();
            data.Add("id", id);
            List<BookModel> returnData = commonController.ExecuteOperation(OperationType.ReadById, data) as List<BookModel>;

            return returnData;
        }

        /// <summary>
        /// Get all books of the required category.
        /// </summary>
        /// <param name="category"></param>
        /// <returns></returns>
        public List<BookModel> Post([FromBody] String category)
        {
            CommonController commonController = HttpContext.Current.Session["CommonController"] as CommonController;
            Dictionary<String, Object> data = new Dictionary<String, Object>();
            data.Add("category", category);
            List<BookModel> returnData = commonController.ExecuteOperation(OperationType.ReadByCategory, data) as List<BookModel>;

            return returnData;
        }
    }
}