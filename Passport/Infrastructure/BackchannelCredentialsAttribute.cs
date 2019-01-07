using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.DependencyInjection;
using Passport.Interfaces;
using System.Threading.Tasks;

namespace Passport.Infrastructure
{
  public class BackchannelCredentialsAttribute : ActionFilterAttribute
  {
    public override async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
    {
      var provider = context.HttpContext.RequestServices.GetRequiredService<IBackchannelTokenProvider>();
      await provider.LoadClientTokenForRequest(context.HttpContext.RequestAborted);

      await base.OnActionExecutionAsync(context, next);
    }
  }
}
