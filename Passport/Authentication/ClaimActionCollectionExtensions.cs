using IdentityModel;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.OAuth.Claims;

namespace Passport.Authentication
{
  public static class ClaimActionCollectionExtensions
  {
    public static void MapBattleNetClaims(this ClaimActionCollection collection)
    {
      collection.MapJsonKey(JwtClaimTypes.Subject, JwtClaimTypes.Subject);
      collection.MapJsonKey(ExternalClaimTypes.BattleNet.Name, "battletag");
    }

    public static void MapDiscordClaims(this ClaimActionCollection collection)
    {
      collection.MapJsonKey(JwtClaimTypes.Subject, "id");
      collection.MapJsonKey(ExternalClaimTypes.Discord.Name, "username");
      collection.MapJsonKey(ExternalClaimTypes.Discord.Discriminator, "discriminator");
    }
  }
}
