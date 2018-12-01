using System.Runtime.Serialization;

namespace Passport.DTOs
{
  [DataContract]
  public class Signin
  {
    [DataMember(Name = "email")]
    public string Email { get; set; }
    [DataMember(Name = "password")]
    public string Password { get; set; }
    [DataMember(Name = "rememberMe")]
    public bool RememberMe { get; set; }
    [DataMember(Name = "returnUrl")]
    public string ReturnUrl { get; set; }
  }
}
