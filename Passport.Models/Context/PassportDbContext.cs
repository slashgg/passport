using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Passport.Models.Context
{
  public class PassportDbContext : IdentityDbContext<PassportUser>
  {
    public PassportDbContext(DbContextOptions<PassportDbContext> options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
      base.OnModelCreating(builder);

      builder.HasDefaultSchema("passport");
    }
  }
}
