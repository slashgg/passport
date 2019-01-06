using Passport.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace Passport.Services
{
  public class BackchannelTokenAccessor : IBackchannelTokenAccessor
  {
    private readonly string token;

    public BackchannelTokenAccessor(string token)
    {
      this.token = token;
    }
    public string Token => token;
  }
}
