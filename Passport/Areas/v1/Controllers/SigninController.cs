using Microsoft.AspNetCore.Mvc;
using Passport.DTOs;
using Passport.Interfaces;
using Svalbard;
using System.Threading.Tasks;

namespace Passport.Areas.v1.Controllers
{
  [Area("v1")]
  [Route("api/[area]/[controller]")]
  [ApiController]
  public class SigninController : ControllerBase
  {
    private readonly IPassportService passport;

    public SigninController(IPassportService passport)
    {
      this.passport = passport;
    }

    [HttpPost]
    public async Task<OperationResult> Index([FromBody] Signin model)
    {
      if (model == null)
      {
        return BadRequest();
      }

      Utility.ServiceResult result = await passport.SigninAsync(model.Email, model.Password, model.ReturnUrl, model.RememberMe);
      if (result.Successful)
      {
        return Ok();
      }

      foreach (Utility.ServiceResult.Error error in result.Errors)
      {
        ModelState.AddModelError(error.Key, error.Message);
      }

      return BadRequest();
    }

    [HttpDelete]
    public async Task<OperationResult<Signout>> Index([FromQuery] string logoutId)
    {
      Utility.ServiceResult<string> result = await passport.SignoutAsync(logoutId);
      if (result.Successful)
      {
        Signout signout = new Signout
        {
          PostLogoutRedirectUri = result.Data
        };

        return signout;
      }

      return BadRequest();
    }
  }
}