namespace backend.ChatbotService.Dtos.User
{
    public class GetByIdUserDto
    {
        public string Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }

        public string Password { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

    }
}
