using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Newtonsoft.Json;
using Passport.Interfaces;
using Passport.Models;
using Passport.Services.Helpers;
using Passport.Utility;
using SendGrid;
using SendGrid.Helpers.Mail;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Passport.Services
{
  public class EmailService : IEmailService
  {
    private const string PASSWORD_RESET_TEMPLATE_ID = "d-f2c609fbe43540ea99fa781515b999e7";
    private static readonly EmailAddress FROM = new EmailAddress("no-reply@slash.gg", "slashgg");

    private readonly ISendGridClient client;
    private readonly IHostingEnvironment hosting;
    private readonly UserManager<PassportUser> users;

    public EmailService(ISendGridClient client, IHostingEnvironment hosting, UserManager<PassportUser> users)
    {
      this.client = client;
      this.hosting = hosting;
      this.users = users;
    }

    public async Task<ServiceResult> SendPasswordResetEmail(string token, string email)
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

      var baseUrl = hosting.IsDevelopment() ? "https://localhost:5001" : "https://passport.slash.gg";
      var link = $"{baseUrl}/password-reset?token={token}&id={user.Id}";

      // Setup the personalization
      var templateData = new PasswordResetTemplateData
      {
        UserName = user.UserName,
        ResetLink = link
      };

      var personalization = new Personalization
      {
        TemplateData = templateData,
        Tos = new List<EmailAddress>()
      };

      personalization.Tos.Add(new EmailAddress(email));

      var message = new SendGridMessage
      {
        From = FROM,
        ReplyTo = FROM,
        TemplateId = PASSWORD_RESET_TEMPLATE_ID,
        Personalizations = new List<Personalization>()
      };

      message.Personalizations.Add(personalization);

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
