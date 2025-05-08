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

            var to = new EmailAddress("info@burakakca.com.tr", "SymptomAI");
            var subject = request.Subject;
            var from = new EmailAddress("contact@burakakca.com.tr", "contact");
            var plainTextContent = $"{request.Message}\n\nGönderen: {request.Email}";  // Göndereni plain text'e ekle
            var htmlContent = $"<strong>{request.Message}</strong><br><br><strong>Gönderen: {request.Email}</strong>"; // Göndereni HTML'ye ekle
            var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);

            // Fix: Create an EmailAddress object for the ReplyTo property
            msg.ReplyTo = new EmailAddress(request.Email, request.Name);

            var response = await client.SendEmailAsync(msg); // Await the async call
            if ((int)response.StatusCode >= 400)
            {
                var error = await response.Body.ReadAsStringAsync();
                throw new Exception($"SendGrid Error: {error}");
            }
        }
    }
}
