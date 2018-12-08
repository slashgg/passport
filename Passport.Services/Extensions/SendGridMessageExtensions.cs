using SendGrid.Helpers.Mail;
using System.Collections.Generic;

namespace Passport.Services.Extensions
{
  public static class SendGridMessageExtensions
  {
    public static void SetupNoReplyMessage<T>(this SendGridMessage message, string templateId, string to, T model)
    {
      var from = new EmailAddress("no-reply@e.slash.gg", "slashgg");
      var personalization = new Personalization
      {
        TemplateData = model,
        Tos = new List<EmailAddress>()
      };

      personalization.Tos.Add(new EmailAddress(to));

      message.SetFrom(from);
      message.SetTemplateId(templateId);
      message.Personalizations = message.Personalizations ?? new List<Personalization>();

      message.Personalizations.Add(personalization);
    }
  }
}
