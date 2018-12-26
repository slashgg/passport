using System.Runtime.Serialization;

namespace Passport.DTOs
{
  [DataContract]
  public class Signout
  {
    [DataMember(Name = "postLogoutRedirectUri")]
    public string PostLogoutRedirectUri { get; set; }
  }
}
