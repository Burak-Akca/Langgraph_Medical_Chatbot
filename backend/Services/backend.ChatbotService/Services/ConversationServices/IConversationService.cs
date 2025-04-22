using backend.ChatbotService.Dtos.Conversation;
using backend.ChatbotService.Entities;

namespace backend.ChatbotService.Services.ConversationServices
{
    public interface IConversationService
    {
        Task<List<ResultConversationDto>> GetAllConversationsAsync();
        Task<Conversation> CreateConversationAsync(CreateConversationDto createConversationDto);
        Task UpdateConversationAsync(UpdateConversationDto updateConversationDto);
        Task DeleteConversationAsync(string conversationId);
        Task<GetByIdConversationDto> GetByIdConversationAsync(string conversationId);
        Task<List<ResultConversationDto>> GetConversationsByUserIdAsync(string userId); // Yeni metod

    }
}

