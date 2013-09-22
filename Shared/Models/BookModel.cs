using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shared.Models
{
    public class BookModel
    {
        public Int32 Id { get; set; }
        public String Name { get; set; }
        public String AuthorName { get; set; }
        public String PublisherName { get; set; }
        public Int32 Price { get; set; }
        public Decimal Discount { get; set; }
        public Int32 Rating { get; set; }
        public String Language { get; set; }
        public Int32 PublicationYear { get; set; }
        public String ISBN13 { get; set; }
        public String ISBN10 { get; set; }
        public String Category { get; set; }
        public String Image { get; set; }
        public String Details { get; set; }
    }
}
