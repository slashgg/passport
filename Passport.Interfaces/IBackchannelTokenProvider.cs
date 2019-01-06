using System.Threading;
using System.Threading.Tasks;

namespace Passport.Interfaces
{
  public interface IBackchannelTokenProvider
  {
    Task LoadClientTokenForRequest(CancellationToken cancellationToken);
    IBackchannelTokenAccessor CreateAccessor();
    
  }
}
