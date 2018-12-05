using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;

namespace Passport.DTOs
{
  [DataContract]
  public class VerifyEmail
  {
    [Required]
    [DataMember(Name = "token")]
    public string Token { get; set; }
    [Required]
    [DataMember(Name = "userId")]
    public string UserId { get; set; }
  }
}
