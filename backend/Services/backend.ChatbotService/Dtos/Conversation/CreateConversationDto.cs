using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace backend.ChatbotService.Dtos.Conversation

{
    public class CreateConversationDto
    {



        public string UserId { get; set; }

        

        public string Title { get; set; }


        public DateTime StartedAt { get; set; }




        public String Status { get; set; }
    }
}
