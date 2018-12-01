using Passport.Utility;
using System.Threading.Tasks;

namespace Passport.Interfaces
{
  public interface IEmailService
  {
    Task<ServiceResult> SendPasswordResetEmail(string token, string email);
  }
}
