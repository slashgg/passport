using System.Runtime.Serialization;

namespace Passport.DTOs
{
  [DataContract]
  public class PasswordReset
  {
    [DataMember(Name = "password")]
    public string Password { get; set; }
    [DataMember(Name = "token")]
    public string Token { get; set; }
    [DataMember(Name = "userId")]
    public string UserId { get; set; }
  }
}
