using System;
using System.Collections.Generic;
using System.Text;

namespace Passport.Services.Helpers
{
  public class VerifyEmailTemplateData
  {
    public string UserName { get; set; }
    public string VerifyEmailLink { get; set; }
  }
}
