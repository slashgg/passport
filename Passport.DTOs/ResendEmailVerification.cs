using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Text;

namespace Passport.DTOs
{
  [DataContract]
  public class ResendEmailVerification
  {
    [DataMember(Name = "email")]
    public string Email { get; set; }
  }
}
