using backend.EmailService.Models;

namespace backend.EmailService.Services.EmailServices
{
    public interface IEmailService
    {

        Task SendEmailAsync(EmailRequest request);

    }
}
