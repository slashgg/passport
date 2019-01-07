using IdentityServer4;
using IdentityServer4.Services;
using Passport.Interfaces;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Passport.Services
{
  public class BackchannelTokenProvider : IBackchannelTokenProvider
  {
    private string accessToken = string.Empty;
    private readonly IdentityServerTools tools;

    public BackchannelTokenProvider(IdentityServerTools tools)
    {
      this.tools = tools;
    }

    public IBackchannelTokenAccessor CreateAccessor()
    {
      return new BackchannelTokenAccessor(this.accessToken);
    }

    public async Task LoadClientTokenForRequest(CancellationToken cancellationToken)
    {
      var scopes = new HashSet<string>
      {
        "@slashgg/alexandria.backchannel"
      };

      var audiences = new HashSet<string>
      {
        "Alexandria"
      };

      this.accessToken = await this.tools.IssueClientJwtAsync("slashgg-backchannel", 60 * 60 * 1000, scopes, audiences);
    }
  }
}
