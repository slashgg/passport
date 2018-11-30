using System.Runtime.Serialization;

namespace Passport.DTOs
{
  [DataContract]
  public class Register
  {
    [DataMember(Name = "email")]
    public string Email { get; set; }
    [DataMember(Name = "username")]
    public string Username { get; set; }
    [DataMember(Name = "password")]
    public string Password { get; set; }
  }
}
