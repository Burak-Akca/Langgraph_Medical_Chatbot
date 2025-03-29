namespace backend.ChatbotService.Dtos.ChatbotResponse
{
    public class ResultChatbotResponseDto
    {
        public string Id { get; set; }
        public string MessageId { get; set; }
        public string ResponseText { get; set; }
        public DateTime SentAt { get; set; }
    }
}


