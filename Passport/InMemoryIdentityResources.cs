using IdentityServer4.Models;
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
    };
  }
}
