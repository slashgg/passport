using Passport.DTOs;
using Passport.Utility;
using System;
using System.Threading.Tasks;

namespace Passport.Interfaces
{
  public interface IPassportService
  {
    Task<ServiceResult> RegisterAsync(Register model);
    Task<ServiceResult> SigninAsync(string email, string password, string returnUrl, bool rememberMe = false);
    Task<ServiceResult<string>> SignoutAsync(string logoutId);
    Task<string> GeneratePasswordResetTokenAsync(string email);
    Task<ServiceResult> ResetPasswordAsync(PasswordReset model);
    Task<string> GenerateEmailVerificationTokenAsync(string emailAddress);
    Task<ServiceResult> VerifyEmailAsync(VerifyEmail model);
    Task<ServiceResult> UpdateUserAccount(Guid userId, DTOs.UpdateAccount account);
  }
}
