using System;
using System.Collections.Generic;
using System.Text;

namespace Passport.Services.Helpers
{
  public class PasswordResetTemplateData
  {
    public string UserName { get; set; }
    public string ResetLink { get; set; }
  }
}
