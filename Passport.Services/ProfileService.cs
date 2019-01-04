using IdentityServer4.Models;
using IdentityServer4.Services;
using Microsoft.AspNetCore.Identity;
using Passport.Models;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Passport.Services
{
  public class ProfileService : IProfileService
  {
    private readonly UserManager<PassportUser> manager;

    public ProfileService(UserManager<PassportUser> manager)
    {
      this.manager = manager;
    }
    public async Task GetProfileDataAsync(ProfileDataRequestContext context)
    {
      PassportUser user = await manager.GetUserAsync(context.Subject);

      if (user != null)
      {
        System.Collections.Generic.IEnumerable<string> scopes = context.RequestedResources.ToScopeNames();

        if (scopes.Any(s => s.Equals("email")))
        {
          context.IssuedClaims.Add(new Claim(ClaimTypes.Email, user.Email));
        }

        if (scopes.Any(s => s.Equals("profile")))
        {
          context.IssuedClaims.Add(new Claim(ClaimTypes.Name, user.UserName));
          System.Collections.Generic.IList<UserLoginInfo> logins = await manager.GetLoginsAsync(user);

          foreach (UserLoginInfo login in logins)
          {
            context.IssuedClaims.Add(new Claim(login.LoginProvider, login.ProviderDisplayName));
          }
        }
      }
    }

    public async Task IsActiveAsync(IsActiveContext context)
    {
      PassportUser user = await manager.GetUserAsync(context.Subject);
      context.IsActive = user?.EmailConfirmed ?? false;
    }
  }
}
