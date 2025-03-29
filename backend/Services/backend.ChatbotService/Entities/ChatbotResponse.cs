using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace backend.ChatbotService.Entities
{
    public class ChatbotResponse
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("message_id")]
        public string MessageId { get; set; }

        [BsonElement("response_text")]
        public string ResponseText { get; set; }

        [BsonElement("sent_at")]
        public DateTime SentAt { get; set; }
    }
}


