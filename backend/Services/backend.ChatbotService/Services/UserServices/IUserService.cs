using backend.ChatbotService.Dtos.User;

namespace backend.ChatbotService.Services.UserServices
{
    public interface IUserService
    {
        Task<List<ResultUserDto>> GetAllUserAsync();

        Task CreateUserAsync(CreateUserDto createUserDto);

        Task UpdateUserAsync(UpdateUserDto updateUserDto);

        Task DeleteUserAsync(string userId);

        Task<GetByIdUserDto> GetByIdUserAsync(string id);
    }
}
