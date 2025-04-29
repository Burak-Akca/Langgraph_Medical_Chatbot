using backend.ChatbotService.Dtos.User;
using backend.ChatbotService.Dtos.UserImage;

namespace backend.ChatbotService.Services.UserImageServices
{
    public interface IUserImageService
    {

        Task<List<ResultUserImageDto>> GetAllUserImageAsync();

        Task<string> CreateOrUpdateUserImageAsync(IFormFile file, string userId);

        Task UpdateUserImageAsync(UpdateUserImageDto updateUserImageDto);

        Task<bool> DeleteUserImageAsync(string userId);

        Task<GetByIdUserImageDto> GetByIdUserImageAsync(string id);

        Task<string> GetUserImagePathByUserIdAsync(string userId);
        

    }
}
