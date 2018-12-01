using Microsoft.AspNetCore.Mvc;
using Passport.Interfaces;
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
      string token = await passportService.GeneratePasswordResetToken(email);
      await emailService.SendPasswordResetEmail(token, email);

      return Ok();
    }
  }
}