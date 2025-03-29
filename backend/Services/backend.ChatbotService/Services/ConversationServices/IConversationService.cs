using backend.ChatbotService.Dtos.Conversation;

namespace backend.ChatbotService.Services.ConversationServices
{
    public interface IConversationService
    {
        Task<List<ResultConversationDto>> GetAllConversationsAsync();
        Task CreateConversationAsync(CreateConversationDto createConversationDto);
        Task UpdateConversationAsync(UpdateConversationDto updateConversationDto);
        Task DeleteConversationAsync(string conversationId);
        Task<GetByIdConversationDto> GetByIdConversationAsync(string conversationId);
    }
}

