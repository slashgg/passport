using Passport.Utility.Clients.Alexandria;
using System;
using System.Collections.Generic;
using System.Text;

namespace Passport.Interfaces
{
  public interface IClientFactory
  {
    UserProfileConnectionsClient GetProfileConnectionClient();
    UserProfileClient GetProfileClient();
  }
}
