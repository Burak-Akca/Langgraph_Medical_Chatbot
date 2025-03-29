using backend.ChatbotService.Dtos.Message;

namespace backend.ChatbotService.Services.MessageServices
{
    public interface IMessageService
    {
        Task<List<ResultMessageDto>> GetAllMessagesAsync();
        Task CreateMessageAsync(CreateMessageDto createMessageDto);
        Task UpdateMessageAsync(UpdateMessageDto updateMessageDto);
        Task DeleteMessageAsync(string messageId);
        Task<GetByIdMessageDto> GetByIdMessageAsync(string messageId);
    }
}

