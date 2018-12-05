using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Newtonsoft.Json;
using Passport.Interfaces;
using Passport.Models;
using Passport.Services.Extensions;
using Passport.Services.Helpers;
using Passport.Utility;
using SendGrid;
using SendGrid.Helpers.Mail;
using System.Threading.Tasks;
using System.Web;

namespace Passport.Services
{
  public class EmailService : IEmailService
  {
    private const string PASSWORD_RESET_TEMPLATE_ID = "d-f2c609fbe43540ea99fa781515b999e7";
    private const string VERIFY_EMAIL_TEMPLATE_ID = "d-bb4f14f523ea4ac88903802aca26d9c4";

    private readonly ISendGridClient client;
    private readonly IHostingEnvironment hosting;
    private readonly UserManager<PassportUser> users;

    public EmailService(ISendGridClient client, IHostingEnvironment hosting, UserManager<PassportUser> users)
    {
      this.client = client;
      this.hosting = hosting;
      this.users = users;
    }

    public async Task<ServiceResult> SendPasswordResetEmailAsync(string token, string email)
    {
      var result = new ServiceResult();

      var user = await users.FindByEmailAsync(email);
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

      // We need to encode the token since it will be used in a reset link.
      var encodedToken = HttpUtility.UrlEncode(token);
      var baseUrl = hosting.IsDevelopment() ? "https://localhost:5001" : "https://passport.slash.gg";
      var link = $"{baseUrl}/password-reset?token={encodedToken}&id={user.Id}";
      var model = new PasswordResetTemplateData {
        ResetLink = link,
        UserName = user.UserName
      };

      var message = new SendGridMessage();
      message.SetupNoReplyMessage(PASSWORD_RESET_TEMPLATE_ID, email, model);

      var response = await client.SendEmailAsync(message);
      if (response.StatusCode != System.Net.HttpStatusCode.Accepted)
      {
        var raw = await response.Body.ReadAsStringAsync();
        var data = JsonConvert.DeserializeObject<SendGridError>(raw);

        foreach (var error in data.Errors)
        {
          result.Errors.Add(new ServiceResult.Error
          {
            Key = error.Field,
            Message = error.Message
          });
        }

        result.Code = 500;
      }

      return result;
    }

    public async Task<ServiceResult> SendWelcomeEmailAsync(string token, string email)
    {
      var result = new ServiceResult();

      var user = await users.FindByEmailAsync(email);
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

      var encodedToken = HttpUtility.UrlEncode(token);
      var baseUrl = hosting.IsDevelopment() ? "https://localhost:5001" : "https://passport.slash.gg";
      var link = $"{baseUrl}/verify-email?token={encodedToken}&id={user.Id}";
      var model = new VerifyEmailTemplateData
      {
        VerifyEmailLink = link,
        UserName = user.UserName
      };

      var message = new SendGridMessage();
      message.SetupNoReplyMessage(VERIFY_EMAIL_TEMPLATE_ID, email, model);

      var response = await client.SendEmailAsync(message);
      if (response.StatusCode != System.Net.HttpStatusCode.Accepted)
      {
        var raw = await response.Body.ReadAsStringAsync();
        var data = JsonConvert.DeserializeObject<SendGridError>(raw);

        foreach (var error in data.Errors)
        {
          result.Errors.Add(new ServiceResult.Error
          {
            Key = error.Field,
            Message = error.Message
          });
        }

        result.Code = 500;
      }

      return result;
    }
  }
}
