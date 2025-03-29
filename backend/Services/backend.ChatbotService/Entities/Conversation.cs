using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace backend.ChatbotService.Entities
{
    public class Conversation
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("user_id")]
        public string UserId { get; set; }

        [BsonIgnore]
        public User User { get; set; }

        [BsonElement("started_at")]
        public DateTime StartedAt { get; set; }

        [BsonElement("ended_at")]
        public DateTime? EndedAt { get; set; }


        [BsonElement("status")]
        public String Status { get; set; }
    }
}
