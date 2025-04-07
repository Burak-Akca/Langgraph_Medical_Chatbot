namespace backend.ChatbotService.Dtos.Message
{
    public class ResultMessageDto
    {
        public string Id { get; set; }

        public string ConversationId { get; set; }


        public string MessageText { get; set; }

        public string sender { get; set; }

        public DateTime timestamp { get; set; }
    }
}
