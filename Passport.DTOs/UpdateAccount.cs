using System.Runtime.Serialization;

namespace Passport.DTOs
{
  [DataContract]
  public class UpdateAccount
  {
    [DataMember(Name = "email")]
    public string Email { get; set; }
    [DataMember(Name = "username")]
    public string UserName { get; set; }
  }
}
