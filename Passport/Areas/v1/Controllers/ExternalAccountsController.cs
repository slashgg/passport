using IdentityServer4;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Passport.Interfaces;
using System.Threading.Tasks;

namespace Passport.Areas.v1.Controllers
{
  [Area("v1")]
  [Authorize]
  public class ExternalAccountsController : ControllerBase
  {
    private readonly IPassportService passport;
    private readonly ILogger<ExternalAccountsController> logger;

    public ExternalAccountsController(IPassportService passport, ILogger<ExternalAccountsController> logger)
    {
      this.passport = passport;
      this.logger = logger;
    }

    [HttpGet("[area]/external/{scheme}")]
    public async Task Index([FromRoute] string scheme)
    {

      await HttpContext.ChallengeAsync(scheme, new AuthenticationProperties
      {
        RedirectUri = "/external-callback",
        Items =
        {
          { "sub", User.FindFirst("sub").Value },
        }
      });
    }

    [AllowAnonymous]
    [HttpGet("external-callback")]
    public async Task<StatusCodeResult> Callback()
    {
      AuthenticateResult authResult = await HttpContext.AuthenticateAsync(IdentityServerConstants.ExternalCookieAuthenticationScheme);
      if (authResult?.Succeeded != true)
      {
        return Unauthorized();
      }

      string userId = User.FindFirst("sub")?.Value;

      var result = await passport.AddExternalLink(userId, authResult.Principal);
      if (!result.Successful)
      {
        logger.LogError($"Failed to link account {userId}", result.Errors);
        return new StatusCodeResult(result.Code);
      }

      // Sign out of the temp account
      await HttpContext.SignOutAsync(IdentityServerConstants.ExternalCookieAuthenticationScheme);

      return Ok();
    }
  }
}