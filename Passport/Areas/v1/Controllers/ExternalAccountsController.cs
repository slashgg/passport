using IdentityModel;
using IdentityServer4;
using IdentityServer4.Services;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Passport.Authentication;
using Passport.Models;
using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Passport.Areas.v1.Controllers
{
  [Area("v1")]
  [Authorize]
  public class ExternalAccountsController : ControllerBase
  {
    private readonly IEventService events;
    private readonly IIdentityServerInteractionService interaction;
    private readonly SignInManager<PassportUser> signInManager;
    private readonly UserManager<PassportUser> userManager;

    public ExternalAccountsController(IEventService events, IIdentityServerInteractionService interaction, SignInManager<PassportUser> signInManager, UserManager<PassportUser> userManager)
    {
      this.events = events;
      this.interaction = interaction;
      this.signInManager = signInManager;
      this.userManager = userManager;
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
          { "name", User.Identity.Name },
          { "provider", scheme },
        }
      });
    }

    [AllowAnonymous]
    [HttpGet("external-callback")]
    public async Task Callback()
    {
      AuthenticateResult result = await HttpContext.AuthenticateAsync(IdentityServerConstants.ExternalCookieAuthenticationScheme);
      if (result?.Succeeded != true)
      {
        throw new Exception("External authentication error");
      }

      string userId = User.FindFirst("sub")?.Value;
      string userName = User.Identity?.Name;

      if (string.IsNullOrEmpty(userId) || string.IsNullOrEmpty(userName))
      {
        // We can unpack the information from the return ticket
      }

      AuthenticationProperties signInProps = new AuthenticationProperties();
      Claim externalIdClaim = result.Principal.FindFirst(JwtClaimTypes.Subject) ??
                            result.Principal.FindFirst(ClaimTypes.NameIdentifier) ??
                            throw new Exception("Unable to find external user id");

      string provider;
      if (!result.Properties.Items.TryGetValue("provider", out provider))
      {
        throw new Exception("Unable to find the povider");
      }

      PassportUser user = await userManager.FindByIdAsync(userId);
      if (user == null)
      {
        throw new Exception("User not found");
      }

      System.Collections.Generic.IList<UserLoginInfo> logins = await userManager.GetLoginsAsync(user);

      if (!logins.Any(l => l.LoginProvider.Equals(provider) && l.ProviderKey.Equals(externalIdClaim.Value)))
      {
        string displayName = GetDisplayNameForProvider(provider, result);

        IdentityResult identityResult = await userManager.AddLoginAsync(user, new UserLoginInfo(provider, externalIdClaim.Value, displayName));
        if (!identityResult.Succeeded)
        {
          throw new Exception("Failed to link accounts");
        }
      }

      // Sign out of the temparary account
      await HttpContext.SignOutAsync(IdentityServerConstants.ExternalCookieAuthenticationScheme);

      await signInManager.SignInAsync(user, true);
    }

    public string GetDisplayNameForProvider(string provider, AuthenticateResult result)
    {
      if (result == null || result.Principal == null)
      {
        throw new ArgumentNullException(nameof(result));
      }

      switch (provider)
      {
        case "battlenet":
          return result.Principal.FindFirstValue(ExternalClaimTypes.BattleNet.Name);
        case "discord":
          string username = result.Principal.FindFirstValue(ExternalClaimTypes.Discord.Name);
          string discriminator = result.Principal.FindFirstValue(ExternalClaimTypes.Discord.Discriminator);
          return $"{username}#{discriminator}";
      }

      return string.Empty;
    }
  }
}