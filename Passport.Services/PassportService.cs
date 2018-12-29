using IdentityServer4.Events;
using IdentityServer4.Services;
using Microsoft.AspNetCore.Identity;
using Passport.DTOs;
using Passport.Interfaces;
using Passport.Models;
using Passport.Utility;
using System;
using System.Threading.Tasks;

namespace Passport.Services
{
  public class PassportService : IPassportService
  {
    private readonly UserManager<PassportUser> userManager;
    private readonly SignInManager<PassportUser> signInManager;
    private readonly IIdentityServerInteractionService interaction;
    private readonly IEventService events;

    public PassportService(
      UserManager<PassportUser> userManager,
      SignInManager<PassportUser> signInManager,
      IIdentityServerInteractionService interaction,
      IEventService events)
    {
      this.userManager = userManager;
      this.signInManager = signInManager;
      this.interaction = interaction;
      this.events = events;
    }

    public async Task<string> GenerateEmailVerificationTokenAsync(string emailAddress)
    {
      PassportUser user = await userManager.FindByEmailAsync(emailAddress);
      return await userManager.GenerateEmailConfirmationTokenAsync(user);
    }

    public async Task<string> GeneratePasswordResetTokenAsync(string email)
    {
      PassportUser user = await userManager.FindByEmailAsync(email);
      return await userManager.GeneratePasswordResetTokenAsync(user);
    }

    public async Task<ServiceResult> RegisterAsync(Register model)
    {
      if (model == null)
      {
        throw new ArgumentNullException(nameof(model));
      }

      ServiceResult result = new ServiceResult();

      if (!string.IsNullOrEmpty(model.ReturnUrl) && !await ValidateReturnUrlAsync(model.ReturnUrl))
      {
        result.Errors.Add(new ServiceResult.Error
        {
          Key = nameof(Errors.InvalidReturnUrl),
          Message = Errors.InvalidReturnUrl,
        });
        result.Code = 400;

        return result;
      }

      PassportUser existingUser = await userManager.FindByEmailAsync(model.Email);
      if (existingUser != null)
      {
        result.Errors.Add(new ServiceResult.Error
        {
          Key = nameof(Errors.EmailAddressInUse),
          Message = Errors.EmailAddressInUse
        });
        result.Code = 409;

        return result;
      }

      PassportUser user = new PassportUser(model.Email, model.Username);

      IdentityResult identityResult = await userManager.CreateAsync(user, model.Password);
      if (!identityResult.Succeeded)
      {
        foreach (IdentityError error in identityResult.Errors)
        {
          result.Errors.Add(new ServiceResult.Error
          {
            Key = error.Code,
            Message = error.Description
          });
          result.Code = 400;
        }
      }

      if (identityResult.Succeeded)
      {
        var userClient = new Passport.Utility.Clients.Alexandria.UserProfileClient(new System.Net.Http.HttpClient());
        await userClient.CreateProfileAsync(new Utility.Clients.Alexandria.UserProfileCreate { Email = model.Email, DisplayName = user.UserName });
      }

      return result;
    }

    public async Task<ServiceResult> ResetPasswordAsync(PasswordReset model)
    {
      ServiceResult result = new ServiceResult();

      PassportUser user = await userManager.FindByIdAsync(model.UserId);
      if (user == null)
      {
        result.Errors.Add(new ServiceResult.Error
        {
          Key = nameof(Errors.UserNotFound),
          Message = Errors.UserNotFound
        });
        result.Code = 404;

        return result;
      }

      IdentityResult identityResult = await userManager.ResetPasswordAsync(user, model.Token, model.Password);
      if (!identityResult.Succeeded)
      {
        foreach (IdentityError error in identityResult.Errors)
        {
          result.Errors.Add(new ServiceResult.Error
          {
            Key = error.Code,
            Message = error.Description,
          });
        }
        result.Code = 400;
      }

      return result;
    }

    public async Task<ServiceResult> SigninAsync(string email, string password, string returnUrl, bool rememberMe)
    {
      ServiceResult result = new ServiceResult();
      if (!await ValidateReturnUrlAsync(returnUrl))
      {
        result.Errors.Add(new ServiceResult.Error
        {
          Key = nameof(Errors.InvalidReturnUrl),
          Message = Errors.InvalidReturnUrl
        });
        result.Code = 400;

        return result;
      }

      PassportUser user = await userManager.FindByEmailAsync(email);
      if (user == null)
      {
        result.Errors.Add(new ServiceResult.Error
        {
          Key = nameof(Errors.InvalidSignin),
          Message = Errors.InvalidSignin
        });
        result.Code = 401;

        return result;
      }

      SignInResult identityResult = await signInManager.PasswordSignInAsync(user, password, rememberMe, lockoutOnFailure: false);
      if (!identityResult.Succeeded)
      {
        result.Errors.Add(new ServiceResult.Error
        {
          Key = nameof(Errors.InvalidSignin),
          Message = Errors.InvalidSignin
        });
        result.Code = 401;

        return result;
      }

      await events.RaiseAsync(new UserLoginSuccessEvent(user.Email, user.Id, user.UserName));

      return result;
    }

    public async Task<ServiceResult<string>> SignoutAsync(string logoutId)
    {
      ServiceResult<string> result = new ServiceResult<string>();

      IdentityServer4.Models.LogoutRequest context = await interaction.GetLogoutContextAsync(logoutId);
      if (context == null)
      {
        result.Errors.Add(new ServiceResult.Error
        {
          Key = nameof(Errors.InvalidSignoutId),
          Message = Errors.InvalidSignoutId,
        });
        result.Code = 400;

        return result;
      }

      PassportUser user = await userManager.FindByIdAsync(context.SubjectId);
      if (user == null)
      {
        result.Errors.Add(new ServiceResult.Error
        {
          Key = nameof(Errors.UserNotFound),
          Message = Errors.UserNotFound
        });
        result.Code = 400;

        return result;
      }

      await signInManager.SignOutAsync();

      result.Data = context.PostLogoutRedirectUri;

      return result;
    }

    public async Task<ServiceResult> VerifyEmailAsync(VerifyEmail model)
    {
      ServiceResult result = new ServiceResult();

      PassportUser user = await userManager.FindByIdAsync(model.UserId);
      if (user == null)
      {
        result.Errors.Add(new ServiceResult.Error
        {
          Key = nameof(Errors.InvalidSignin),
          Message = Errors.InvalidSignin
        });
        result.Code = 401;

        return result;
      }

      IdentityResult identityResult = await userManager.ConfirmEmailAsync(user, model.Token);
      if (!identityResult.Succeeded)
      {
        result.Errors.Add(new ServiceResult.Error
        {
          Key = nameof(Errors.InvalidSignin),
          Message = Errors.InvalidSignin
        });
        result.Code = 401;
      }

      return result;
    }

    public async Task<ServiceResult> UpdateUserAccount(Guid userId, DTOs.UpdateAccount account)
    {
      var result = new ServiceResult();
      var user = await userManager.FindByIdAsync(userId.ToString());
      if (user == null)
      {
        result.Errors.Add(new ServiceResult.Error
        {
          Key = nameof(Errors.UserNotFound),
          Message = Errors.UserNotFound,
        });
        result.Code = 404;

        return result;
      }

      user.Update(account.Email, account.UserName);
      var updateResult = await userManager.UpdateAsync(user);

      if (!updateResult.Succeeded)
      {
        result.Errors.Add(new ServiceResult.Error
        {
          Key = nameof(Errors.UpdateFailed),
          Message = Errors.UpdateFailed,
        });

        foreach (var error in updateResult.Errors)
        {
          result.Errors.Add(new ServiceResult.Error
          {
            Key = error.Code,
            Message = error.Description,
          });
        }

        result.Code = 400;
      }

      return result;
    }

    private async Task<bool> ValidateReturnUrlAsync(string returnUrl)
    {
      IdentityServer4.Models.AuthorizationRequest context = await interaction.GetAuthorizationContextAsync(returnUrl);
      return context != null && interaction.IsValidReturnUrl(returnUrl);
    }
  }
}
