using Microsoft.AspNetCore.Authentication.OAuth;
using Newtonsoft.Json.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace Passport.Authentication
{
  public static class DefaultExternalHandler
  {
    public static async Task TicketHandler(OAuthCreatingTicketContext context)
    {
      HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Get, context.Options.UserInformationEndpoint);
      request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
      request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", context.AccessToken);

      HttpResponseMessage response = await context.Backchannel.SendAsync(request, HttpCompletionOption.ResponseHeadersRead, context.HttpContext.RequestAborted);
      response.EnsureSuccessStatusCode();

      JObject user = JObject.Parse(await response.Content.ReadAsStringAsync());

      context.RunClaimActions(user);
    }
  }
}
