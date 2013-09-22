using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using System.Web;

using Shared;
using Shared.Models;

namespace DataAccess
{
    public class DataManager
    {
        private String connectionString = ConfigurationManager.ConnectionStrings["BookData"].ToString();

        #region Sql Methods

        /// <summary>
        /// Returns a new sql parameter with the given paramenters.
        /// </summary>
        /// <param name="parameterName"></param>
        /// <param name="value"></param>
        /// <param name="dbtype"></param>
        /// <returns></returns>
        private SqlParameter GetParameter(String parameterName, Object value, DbType dbtype)
        {
            SqlParameter param = new SqlParameter();
            param.ParameterName = parameterName;
            param.Value = value;
            param.DbType = dbtype;
            return param;
        }

        /// <summary>
        /// Returns the connection string.
        /// </summary>
        /// <returns></returns>
        private String GetConnectionString()
        {
            return connectionString;
        }

        /// <summary>
        /// Returns a new sql connection.
        /// </summary>
        /// <returns></returns>
        private SqlConnection GetConnection()
        {
            SqlConnection connection = new SqlConnection(GetConnectionString());
            connection.Open();
            return connection;
        }

        /// <summary>
        /// Closes the provided sql connection.
        /// </summary>
        /// <param name="connection"></param>
        private void CloseConnection(SqlConnection connection)
        {
            connection.Close();
        }

        /// <summary>
        /// Returns the SqlCommand object based on the type of operation passed
        /// </summary>
        /// <param name="operationType"></param>
        /// <returns></returns>
        private SqlCommand GetCommand(String operationType)
        {
            String dataQuery = OperationType.Map[operationType];
            SqlConnection connection = GetConnection();
            SqlCommand command = new SqlCommand(dataQuery, connection);

            return command;
        }

        #endregion Sql Methods

        #region CRUD

        /// <summary>
        /// Get book data for a particular catagory
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public List<BookModel> ReadBookByCategory(Dictionary<String, Object> data)
        {
            BookModel bookModel;
            SqlDataReader dataReader;
            List<BookModel> returnData = new List<BookModel>();
            SqlCommand command = GetCommand(OperationType.ReadByCategory);
            String category = data["category"].ToString().ToUpper();

            command.Parameters.Add(GetParameter("@category", category, DbType.String));
            dataReader = command.ExecuteReader();
            while (dataReader.Read())
            {
                bookModel = GetBookModel((Int32)dataReader["Id"],
                                dataReader["Name"].ToString(),
                                dataReader["AuthorName"].ToString(),
                                dataReader["PublisherName"].ToString(),
                                (Int32)dataReader["Price"],
                                Convert.ToDecimal(dataReader["Discount"]),
                                (Int32)dataReader["Rating"],
                                dataReader["Language"].ToString(),
                                (Int32)dataReader["PublicationYear"],
                                dataReader["ISBN13"].ToString(),
                                dataReader["ISBN10"].ToString(),
                                dataReader["Category"].ToString(),
                                dataReader["Image"].ToString(),
                                dataReader["Details"].ToString());

                returnData.Add(bookModel);
            }
            CloseConnection(command.Connection);
            return returnData;
        }

        /// <summary>
        /// Read book by its Id
        /// </summary>
        /// <param name="operationType"></param>
        /// <param name="data"></param>
        /// <returns></returns>
        public List<BookModel> ReadBookById(Dictionary<String, Object> data)
        {
            BookModel bookModel;
            SqlDataReader dataReader;
            List<BookModel> returnData = new List<BookModel>();
            SqlCommand command = GetCommand(OperationType.ReadById);
            Int32 id = Convert.ToInt32(data["id"]);

            command.Parameters.Add(GetParameter("@id", id, DbType.Int32));
            dataReader = command.ExecuteReader();
            while (dataReader.Read())
            {
                bookModel = GetBookModel((Int32)dataReader["Id"],
                                dataReader["Name"].ToString(),
                                dataReader["AuthorName"].ToString(),
                                dataReader["PublisherName"].ToString(),
                                (Int32)dataReader["Price"],
                                Convert.ToDecimal(dataReader["Discount"]),
                                (Int32)dataReader["Rating"],
                                dataReader["Language"].ToString(),
                                (Int32)dataReader["PublicationYear"],
                                dataReader["ISBN13"].ToString(),
                                dataReader["ISBN10"].ToString(),
                                dataReader["Category"].ToString(),
                                dataReader["Image"].ToString(),
                                dataReader["Details"].ToString());

                returnData.Add(bookModel);
            }
            CloseConnection(command.Connection);
            return returnData;
        }

        /// <summary>
        /// Read Books Data
        /// </summary>
        /// <returns></returns>
        public List<BookModel> ReadBooksData()
        {
            BookModel bookModel;
            List<BookModel> returnData = new List<BookModel>();
            SqlDataReader dataReader;
            SqlCommand command = GetCommand(OperationType.Read);

            dataReader = command.ExecuteReader();

            while (dataReader.Read())
            {
                bookModel = GetBookModel((Int32)dataReader["Id"],
                                dataReader["Name"].ToString(),
                                dataReader["AuthorName"].ToString(),
                                dataReader["PublisherName"].ToString(),
                                (Int32)dataReader["Price"],
                                Convert.ToDecimal(dataReader["Discount"]),
                                (Int32)dataReader["Rating"],
                                dataReader["Language"].ToString(),
                                (Int32)dataReader["PublicationYear"],
                                dataReader["ISBN13"].ToString(),
                                dataReader["ISBN10"].ToString(),
                                dataReader["Category"].ToString(),
                                dataReader["Image"].ToString(),
                                dataReader["Details"].ToString());
                returnData.Add(bookModel);
            }

            CloseConnection(command.Connection);
            return returnData;
        }

        #endregion CRUD

        #region Helper Methods

        /// <summary>
        /// Returns new BookModel object with the passed parameters
        /// </summary>
        /// <param name="id"></param>
        /// <param name="name"></param>
        /// <param name="authorName"></param>
        /// <param name="publisherName"></param>
        /// <param name="price"></param>
        /// <param name="discount"></param>
        /// <param name="rating"></param>
        /// <param name="language"></param>
        /// <param name="publicationYear"></param>
        /// <param name="iSBN13"></param>
        /// <param name="iSBN10"></param>
        /// <param name="category"></param>
        /// <param name="image"></param>
        /// <param name="details"></param>
        /// <returns></returns>
        private BookModel GetBookModel(Int32 id, String name, String authorName, String publisherName, Int32 price,
                                        Decimal discount, Int32 rating, String language, Int32 publicationYear,
                                        String iSBN13, String iSBN10, String category, String image, String details)
        {
            return new BookModel
            {
                Id = id,
                Name = name,
                AuthorName = authorName,
                PublisherName = publisherName,
                Price = price,
                Discount = discount,
                Rating = rating,
                Language = language,
                PublicationYear = publicationYear,
                ISBN13 = iSBN13,
                ISBN10 = iSBN10,
                Category = category,
                Image = image,
                Details = details,
            };
        }

        #endregion Helper Methods
    }
}
