using System.Collections.Generic;

namespace Passport.Utility
{
  public class ServiceResult
  {
    public int Code { get; set; }
    public ICollection<Error> Errors { get; } = new HashSet<Error>();
    public bool Successful => Errors.Count == 0;

    public class Error
    {
      public string Key { get; set; }
      public string Message { get; set; }
    }
  }

  public class ServiceResult<T> : ServiceResult where T : class
  {
    public T Data { get; set; }
  }
}
