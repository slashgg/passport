using IdentityModel;
using IdentityServer4.Models;
using Passport.Utility.Authentication;
using System.Collections.Generic;

namespace Passport
{
  public static class InMemoryIdentityResources
  {
    public static List<IdentityResource> IdentityResources { get; } = new List<IdentityResource>
    {
      new IdentityResources.OpenId(),
      new IdentityResources.Profile(),
      new IdentityResources.Email(),
      new IdentityResource{Name = "roles", UserClaims = { JwtClaimTypes.Role }}
    };
  }
}
