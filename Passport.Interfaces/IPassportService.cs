using Passport.DTOs;
using Passport.Utility;
using System.Threading.Tasks;

namespace Passport.Interfaces
{
  public interface IPassportService
  {
    Task<ServiceResult> RegisterAsync(Register model);
    Task<ServiceResult> SigninAsync(string email, string password, string returnUrl, bool rememberMe = false);
    Task<string> GeneratePasswordResetTokenAsync(string email);
    Task<ServiceResult> ResetPasswordAsync(PasswordReset model);
  }
}
