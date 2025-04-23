using MongoDB.Bson.Serialization.Attributes;

namespace backend.ChatbotService.Dtos.UserImage
{
    public class CreateUserImageDto
    {
    
        public string UserId { get; set; }

       
        public string ImagePath { get; set; }
    }
}
