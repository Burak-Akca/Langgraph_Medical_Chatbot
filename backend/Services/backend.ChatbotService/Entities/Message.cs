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

        [BsonElement("message_text")]
        public string MessageText { get; set; }

        [BsonElement("sender")]
        public string sender { get; set; }

        [BsonElement("timestamp")]
        public DateTime timestamp { get; set; }
    }
}

