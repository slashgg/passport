using System;
using System.Collections.Generic;
using System.Text;

namespace Passport.Interfaces
{
  public interface IBackchannelTokenAccessor
  {
    string Token { get; }
  }
}
