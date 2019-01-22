using IdentityServer4.Models;
using System.Collections.Generic;

namespace Passport
{
  public static class InMemoryClients
  {
    public static ICollection<Client> Clients => new HashSet<Client>
    {
      new Client
      {
        Enabled = true,
        ClientId = "alexandria-direct",
        ClientSecrets = new HashSet<Secret>
        {
          new Secret("aTPZWLR9awVV9RdCP6i4UcyBb4XBZ4".Sha256()),
        },
        AllowedGrantTypes = new HashSet<string>
        {
          GrantType.ClientCredentials,
        },
       RequireClientSecret = true,
       RequireConsent = false,
       AllowedScopes = new HashSet<string>
       {
         "openId",
         "profile",
         "@slashgg/passport.full_access"
       }
      },
      new Client
      {
        Enabled = true,
        ClientId = "slashgg-backchannel",
        ClientSecrets = new HashSet<Secret>
        {
          new Secret("a1c697ad88b0190e34aebbcf8d020cd0f528e3abf865aa172b58cc1ef026941e".Sha256()),
        },
        AllowedGrantTypes = new HashSet<string>
        {
          GrantType.ClientCredentials,
          GrantType.ResourceOwnerPassword
        },
        RequireConsent = false,
        AllowedScopes = new HashSet<string>
        {
          "openid",
          "profile",
          "@slashgg/alexandria.backchannel"
        }
      },
      new Client
      {
        Enabled = true,
        ClientId = "slashgg-marrakech",
        AllowedGrantTypes = new HashSet<string>
        {
          GrantType.Implicit,
        },
        AllowAccessTokensViaBrowser = true,
        RedirectUris = new HashSet<string>
        {
          "http://localhost:3000/oauth/signin-callback",
          "http://localhost:3000/oauth/silent-callback",
          "https://slash.gg/oauth/signin-callback",
          "https://slash.gg/oauth/silent-callback",
        },
        RequireConsent = false,
        AllowedScopes = new HashSet<string>
        {
          "openid",
          "profile",
          "email",
          "@slashgg/alexandria.full_access",
        },
        AllowedCorsOrigins = new HashSet<string>
        {
          "https://slash.gg",
          "https://dt4zju0m7ok3d.cloudfront.net/",
          "http://staging.slash.gg.s3-website-us-east-1.amazonaws.com/",
          "http://localhost:3000",
        },
        PostLogoutRedirectUris = new HashSet<string>
        {
          "https://slash.gg/oauth/signout-callback",
          "http://localhost:3000/oauth/signout-callback",
        }
      },
      new Client
      {
        Enabled = true,
        ClientId = "slashgg-alexandria-swagger",
        AllowedGrantTypes = new HashSet<string>
        {
          GrantType.Implicit,
        },
        AllowAccessTokensViaBrowser = true,
        RedirectUris = new HashSet<string>
        {
          "http://localhost:5000/swagger/oauth2-redirect.html",
          "https://api.slash.gg/swagger/oauth2-redirect.html",
        },
        RequireConsent = false,
        AllowedScopes = new HashSet<string>
        {
          "openid",
          "profile",
          "email",
          "@slashgg/alexandria.full_access",
        },
        AllowedCorsOrigins = new HashSet<string>
        {
          "https://api.slash.gg",
          "http://localhost:5000",
        },
        PostLogoutRedirectUris = new HashSet<string>
        {
          "https://api.slash.gg/swagger/index.html",
          "http://localhost:5000/swagger/index.html",
        }
      },
      new Client
      {
        Enabled = true,
        ClientId = "diwali",
        AllowedGrantTypes = new HashSet<string>
        {
          GrantType.Implicit,
        },
        AllowAccessTokensViaBrowser = true,
        RedirectUris = new HashSet<string>
        {
          "https://localhost:3001/signin-callback",
          "https://diwali.slash.gg/signin-callback"
        },
        RequireConsent = false,
        AllowedScopes = new HashSet<string>
        {
          "openid",
          "profile"
        }
      },
      new Client
      {
        Enabled = true,
        ClientId = "constantinople",
        AllowedGrantTypes = new HashSet<string>
        {
          GrantType.Implicit,
        },
        AllowAccessTokensViaBrowser = true,
        RedirectUris = new HashSet<string>
        {
          "http://localhost:8080/signin-callack",
          "https://admin.slash.gg/signin-callback",
        },
        RequireConsent = false,
        AllowedScopes = new HashSet<string>
        {
          "openid",
          "profile",
          "@slashgg/alexandria.admin",
        }
      }
    };
  }
}
