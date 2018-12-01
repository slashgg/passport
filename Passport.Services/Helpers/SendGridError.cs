using System.Collections.Generic;
using System.Runtime.Serialization;

namespace Passport.Services.Helpers
{
  [DataContract]
  public class SendGridError
  {
    [DataMember(Name = "errors")]
    public ICollection<Error> Errors { get; set; } = new HashSet<Error>();

    public class Error
    {
      [DataMember(Name = "message")]
      public string Message { get; set; }
      [DataMember(Name = "field")]
      public string Field { get; set; }
    }
  }
}
