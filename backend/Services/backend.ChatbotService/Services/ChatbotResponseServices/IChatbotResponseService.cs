using backend.ChatbotService.Dtos.ChatbotResponse;

namespace backend.ChatbotService.Services.ChatbotResponseServices
{
    public interface IChatbotResponseService
    {
        Task<List<ResultChatbotResponseDto>> GetAllChatbotResponsesAsync();
        Task CreateChatbotResponseAsync(CreateChatbotResponseDto createChatbotResponseDto);
        Task UpdateChatbotResponseAsync(UpdateChatbotResponseDto updateChatbotResponseDto);
        Task DeleteChatbotResponseAsync(string chatbotResponseId);
        Task<GetByIdChatbotResponseDto> GetByIdChatbotResponseAsync(string chatbotResponseId);
    }
}

