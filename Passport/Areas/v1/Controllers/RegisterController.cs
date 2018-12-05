using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
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
    private readonly IEmailService email;
    private readonly ILogger<RegisterController> logger;

    public RegisterController(IPassportService passport, IEmailService email, ILogger<RegisterController> logger)
    {
      this.passport = passport;
      this.email = email;
      this.logger = logger;
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
        // Send our welcome email
        var token = await passport.GenerateEmailVerificationTokenAsync(model.Email);
        result = await email.SendWelcomeEmailAsync(token, model.Email);

        // We log email verification errors but we don't report them to the user.
        if (!result.Successful)
        {
          logger.LogError("Failed to send verify email", result);
        }

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

    [HttpPut]
    public async Task<OperationResult> Index([FromBody] VerifyEmail model)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest();
      }

      var result = await passport.VerifyEmailAsync(model);
      if (result.Successful)
      {
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