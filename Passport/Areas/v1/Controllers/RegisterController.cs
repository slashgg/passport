using Microsoft.AspNetCore.Mvc;
using Passport.DTOs;

namespace Passport.Areas.v1.Controllers
{
  [Area("v1")]
  public class RegisterController : Controller
  {
    [HttpPost]
    public ActionResult Index([FromForm] Register model)
    {
      return LocalRedirect("/registration-complete");
    }
  }
}