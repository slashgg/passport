using Microsoft.AspNetCore.Hosting;
using Passport.Interfaces;
using Passport.Utility.Clients.Alexandria;
using System;
using System.Net.Http;
using System.Net.Http.Headers;

namespace Passport.Services
{
  public class ClientFactory : IClientFactory
  {
    private readonly IBackchannelTokenProvider tokenProvider;
    private readonly IHostingEnvironment hosting;

    public ClientFactory(IBackchannelTokenProvider tokenProvider, IHostingEnvironment hosting)
    {
      this.tokenProvider = tokenProvider;
      this.hosting = hosting;
    }

    public UserProfileClient GetProfileClient()
    {
      var bachchannel = CreateBackchannel();
      return new UserProfileClient(bachchannel);
    }

    public UserProfileConnectionsClient GetProfileConnectionClient()
    {
      var backchannel = CreateBackchannel();
      return new UserProfileConnectionsClient(backchannel);
    }

    private HttpClient CreateBackchannel()
    {
      var backchannel = new HttpClient();
      var tokenAccessor = tokenProvider.CreateAccessor();

      backchannel.BaseAddress = new Uri(hosting.IsProduction() ? "https://api.slash.gg" : "http://localhost:5000");

      if (!string.IsNullOrEmpty(tokenAccessor.Token))
      {
        backchannel.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", tokenAccessor.Token);
      }

      return backchannel;
    }
  }
}
