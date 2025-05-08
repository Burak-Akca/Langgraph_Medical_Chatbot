using backend.EmailService.Models;
using SendGrid.Helpers.Mail;
using SendGrid;

namespace backend.EmailService.Services.EmailServices
{
    public class EmailService : IEmailService
    {
        private readonly IConfiguration _config;

        public EmailService(IConfiguration config)
        {
            _config = config;
        }

        public async Task SendEmailAsync(EmailRequest request) // Add 'async' keyword
        {
            var apiKey = _config["SendGrid:ApiKey"];

            var client = new SendGridClient(apiKey);
            var from = new EmailAddress("burakakca51@gmail.com", "Example User");
            var subject = "Sending with SendGrid is Fun";
            var to = new EmailAddress("burak07akca@gmail.com", "Example User");
            var plainTextContent = "and easy to do anywhere, even with C#";
            var htmlContent = "<strong>and easy to do anywhere, even with C#</strong>";
            var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);

            var response = await client.SendEmailAsync(msg); // Await the async call
            if ((int)response.StatusCode >= 400)
            {
                var error = await response.Body.ReadAsStringAsync();
                throw new Exception($"SendGrid Error: {error}");
            }
        }
    }
}
