using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Http.WebHost;
using System.Web.Security;
using System.Web.SessionState;
using System.Web.Routing;

namespace BookStore
{
    public class Global : System.Web.HttpApplication
    {
        #region Classes To Provide Session Support For WebApi
        public class MyHttpControllerHandler : HttpControllerHandler, IRequiresSessionState
        {
            public MyHttpControllerHandler(RouteData routeData)
                : base(routeData)
            { }
        }

        public class MyHttpControllerRouteHandler : HttpControllerRouteHandler
        {
            protected override IHttpHandler GetHttpHandler(RequestContext requestContext)
            {
                return new MyHttpControllerHandler(requestContext.RouteData);
            }
        }
        #endregion Classes To Provide Session Support For WebApi

        protected void Application_Start(object sender, EventArgs e)
        {
            RouteTable.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            ).RouteHandler = new MyHttpControllerRouteHandler();
        }

        protected void Session_Start(object sender, EventArgs e)
        {

        }

        protected void Application_BeginRequest(object sender, EventArgs e)
        {

        }

        protected void Application_AuthenticateRequest(object sender, EventArgs e)
        {

        }

        protected void Application_Error(object sender, EventArgs e)
        {

        }

        protected void Session_End(object sender, EventArgs e)
        {

        }

        protected void Application_End(object sender, EventArgs e)
        {

        }
    }
}