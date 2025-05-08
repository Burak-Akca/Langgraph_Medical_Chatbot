using backend.EmailService.Models;
using backend.EmailService.Services.EmailServices;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace backend.EmailService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmailController : ControllerBase
    {

        private readonly IEmailService _emailService;

        public EmailController(IEmailService emailService)
        {
            _emailService = emailService;
        }
        [HttpPost]
        public async Task<IActionResult> Send([FromBody] EmailRequest request)
        {
            await _emailService.SendEmailAsync(request);
            return Ok(new { message = "Email başarıyla gönderildi." });
        }


    }
}
