using Passport.DTOs;
using Passport.Utility;
using System.Threading.Tasks;

namespace Passport.Interfaces
{
  public interface IEmailService
  {
    Task<ServiceResult> SendPasswordResetEmailAsync(string token, string email);
    Task<ServiceResult> SendWelcomeEmailAsync(string token, string email);
  }
}
