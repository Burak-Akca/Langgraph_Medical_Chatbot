using MongoDB.Bson.Serialization.Attributes;

namespace backend.ChatbotService.Dtos.Message
{
    public class CreateMessageDto
    {

        public string ConversationId { get; set; }

        public string UserMessage { get; set; }

        public string ChatbotResponse { get; set; }

        public DateTime SentAt { get; set; }
    }
}
