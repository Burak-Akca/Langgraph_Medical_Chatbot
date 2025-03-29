namespace backend.ChatbotService.Dtos.ChatbotResponse
{
    
        public class CreateChatbotResponseDto
        {
            public string MessageId { get; set; }
            public string ResponseText { get; set; }
            public DateTime SentAt { get; set; } = DateTime.UtcNow;
        }
    }

