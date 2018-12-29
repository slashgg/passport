using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Passport.Interfaces;
using Svalbard;

namespace Passport.Areas.v1.Controllers
{
  [Route("api/users")]
  [ApiController]
  public class AccountsController : ControllerBase
  {
    private readonly IPassportService passportService;
    public AccountsController(IPassportService passportService)
    {
      this.passportService = passportService;
    }

    [HttpPut("{accountId}")]
    [Authorize(Policy = "Backchannel")]
    public async Task<OperationResult> UpdateUserAccount([FromRoute] Guid accountId, [FromBody] DTOs.UpdateAccount payload)
    {
      var result = await this.passportService.UpdateUserAccount(accountId, payload);
      if (result.Successful)
      {
        return Ok();
      }
      return BadRequest();
    }
  }
}