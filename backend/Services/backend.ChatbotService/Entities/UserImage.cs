using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace backend.ChatbotService.Entities
{
    public class UserImage
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]

        public string Id { get; set; }

        [BsonElement("userId")]
        public string UserId { get; set; }

        [BsonElement("imagePath")]
        public string ImagePath { get; set; }
    }
}
