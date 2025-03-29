using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace backend.ChatbotService.Entities
{
    public class Message
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("conversation_id")]
        public string ConversationId { get; set; }

        [BsonIgnore]
        public Conversation Conversation { get; set; }

        [BsonElement("user_message")]
        public string UserMessage { get; set; }

        [BsonElement("chatbot_response")]
        public string ChatbotResponse { get; set; }

        [BsonElement("sent_at")]
        public DateTime SentAt { get; set; }
    }
}

