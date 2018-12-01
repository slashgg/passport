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

    public async Task<string> GeneratePasswordResetToken(string email)
    {
      var user = await userManager.FindByEmailAsync(email);
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

      return result;
    }

    public async Task<ServiceResult> SigninAsync(string email, string password, string returnUrl, bool rememberMe)
    {
      var result = new ServiceResult();
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

      var user = await userManager.FindByEmailAsync(email);
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

      var identityResult = await signInManager.PasswordSignInAsync(user, password, rememberMe, lockoutOnFailure: false);
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

    private async Task<bool> ValidateReturnUrlAsync(string returnUrl)
    {
      IdentityServer4.Models.AuthorizationRequest context = await interaction.GetAuthorizationContextAsync(returnUrl);
      return context != null && interaction.IsValidReturnUrl(returnUrl);
    }
  }
}
