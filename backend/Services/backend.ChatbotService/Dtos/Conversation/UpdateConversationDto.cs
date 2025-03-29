namespace backend.ChatbotService.Dtos.Conversation
{
    public class UpdateConversationDto
    {
        public string Id { get; set; }

        public string UserId { get; set; }

        public DateTime StartedAt { get; set; }


        public DateTime? EndedAt { get; set; }


        public String Status { get; set; }
    }
}
