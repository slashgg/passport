using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace Passport.Models.Context
{
  public class PassportDbContext : IdentityDbContext<PassportUser>
  {
  }
}
