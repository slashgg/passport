using Microsoft.AspNetCore.Identity;
using Svalbard.Utils;

namespace Passport.Models
{
  public class PassportUser : IdentityUser
  {
    public PassportUser()
    {
    }

    public PassportUser(string email, string username)
    {
      Email = email;
      UserName = username + $"#{MurmurHash2.ComputeHash(email) % 100000}";
    }
  }
}
