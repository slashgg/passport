using Passport.Utility;
using System.Threading.Tasks;

namespace Passport.Interfaces
{
  public interface IPassportService
  {
    Task<ServiceResult> RegisterAsync(DTOs.Register model);
    Task<ServiceResult> SigninAsync(string email, string password, string returnUrl, bool rememberMe = false);
    Task<string> GeneratePasswordResetToken(string email);
  }
}
