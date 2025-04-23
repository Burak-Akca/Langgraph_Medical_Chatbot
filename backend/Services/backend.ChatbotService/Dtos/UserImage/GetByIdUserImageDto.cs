using MongoDB.Bson.Serialization.Attributes;

namespace backend.ChatbotService.Dtos.UserImage
{
    public class GetByIdUserImageDto
    {
        public string Id { get; set; }

        public string UserId { get; set; }

        public string ImagePath { get; set; }
    }
}
