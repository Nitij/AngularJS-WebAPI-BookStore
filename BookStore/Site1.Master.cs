using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

using Controller;

namespace BookStore
{
    public partial class Site1 : System.Web.UI.MasterPage
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            #region Initialize Controller

            CommonController commonController;
            if (Session.IsNewSession)
            {
                commonController = new CommonController();
                Session.Add("CommonController", commonController);
            }

            #endregion Initialize Controller
        }
    }
}