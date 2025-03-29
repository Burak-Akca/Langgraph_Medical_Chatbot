namespace backend.ChatbotService.Dtos.Message
{
    public class GetByIdMessageDto
    {
        public string Id { get; set; }

        public string ConversationId { get; set; }

        public string UserMessage { get; set; }

        public string ChatbotResponse { get; set; }

        public DateTime SentAt { get; set; }
    }
}
