using Microsoft.AspNetCore.Mvc;
using Passport.DTOs;
using Passport.Interfaces;
using Passport.Utility;
using Svalbard;
using System.Threading.Tasks;

namespace Passport.Areas.v1.Controllers
{
  [Area("v1")]
  [Route("api/[area]/[controller]")]
  [ApiController]
  public class PasswordController : ControllerBase
  {
    private readonly IPassportService passportService;
    private readonly IEmailService emailService;

    public PasswordController(IPassportService passport, IEmailService email)
    {
      passportService = passport;
      emailService = email;
    }

    [HttpGet]
    public async Task<OperationResult> Index([FromQuery] string email)
    {
      var token = await passportService.GeneratePasswordResetTokenAsync(email);
      await emailService.SendPasswordResetEmailAsync(token, email);

      // We say Ok no matter what. We don't reveal that a user doesn't exist.
      return Ok();
    }

    [HttpPut]
    public async Task<OperationResult> Index([FromBody] PasswordReset model)
    {
      ServiceResult result = await passportService.ResetPasswordAsync(model);
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