using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Passport.Interfaces;
using Svalbard;
using System;
using System.Threading.Tasks;

namespace Passport.Areas.v1.Controllers
{
  [Area("v1")]
  [Route("api/[area]/users")]
  [ApiController]
  public class AccountsController : ControllerBase
  {
    private readonly IPassportService passportService;
    public AccountsController(IPassportService passportService)
    {
      this.passportService = passportService;
    }

    [HttpPut("{accountId}")]
    [Authorize("Backchannel")]
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