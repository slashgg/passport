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
  public class RegisterController : ControllerBase
  {
    private readonly IPassportService passport;

    public RegisterController(IPassportService passport)
    {
      this.passport = passport;
    }

    [HttpPost]
    public async Task<OperationResult> Index([FromBody] Register model)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest();
      }

      var result = await passport.RegisterAsync(model);
      if (result.Successful)
      {
        // If we have return URL here we should process a login.
        if (!string.IsNullOrEmpty(model.ReturnUrl))
        {
          await passport.SigninAsync(model.Email, model.Password, model.ReturnUrl);
        }

        return Ok();
      }

      foreach (var error in result.Errors)
      {
        ModelState.AddModelError(error.Key, error.Message);
      }

      return BadRequest();
    }
  }
}