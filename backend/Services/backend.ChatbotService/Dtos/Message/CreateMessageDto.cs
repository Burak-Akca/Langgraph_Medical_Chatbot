using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace backend.ChatbotService.Dtos.Message
{
    public class CreateMessageDto
    {

        public string ConversationId { get; set; }


        public string MessageText { get; set; }

        public string sender { get; set; }

        public DateTime timestamp { get; set; }
    }
}
