﻿using IdentityServer4.Models;
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
          "@slashgg/alexandria.full_access"
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
          "https://localhost:3001/signin-callback",
          "https://slash.gg/signin-callback"
        },
        RequireConsent = false,
        AllowedScopes = new HashSet<string>
        {
          "openid",
          "profile",
          "@slashgg/alexandria.full_access"
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
    };
  }
}