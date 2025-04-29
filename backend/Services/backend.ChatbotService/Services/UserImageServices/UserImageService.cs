using AutoMapper;
using backend.ChatbotService.Dtos.UserImage;
using backend.ChatbotService.Entities;
using backend.ChatbotService.Settings;
using MongoDB.Driver;

namespace backend.ChatbotService.Services.UserImageServices
{
    public class UserImageService : IUserImageService
    {
        private readonly IMongoCollection<UserImage> _userCollection;
        private readonly IMapper _mapper;
        public UserImageService(IMapper mapper, IDatabaseSettings databaseSettings)
        {
            var client = new MongoClient(databaseSettings.ConnectionString);
            var database = client.GetDatabase(databaseSettings.DatabaseName);
            _userCollection = database.GetCollection<UserImage>(databaseSettings.UserImageCollectionName);
            _mapper = mapper;
        }

        public async Task<string> CreateOrUpdateUserImageAsync(IFormFile file, string userId)
        {
            if (file == null || file.Length == 0)
                throw new Exception("No file uploaded.");

            var uploadDirectory = Path.Combine(Directory.GetCurrentDirectory(), "UserImages");

            if (!Directory.Exists(uploadDirectory))
            {
                Directory.CreateDirectory(uploadDirectory);
            }

            // Aynı userId varsa, eski resmi sil
            var existingUserImage = await _userCollection
                .Find(x => x.UserId == userId)
                .FirstOrDefaultAsync();

            if (existingUserImage != null)
            {
                var existingFilePath = Path.Combine(uploadDirectory, Path.GetFileName(existingUserImage.ImagePath));
                if (File.Exists(existingFilePath))
                {
                    File.Delete(existingFilePath);
                }
            }

            var fileName = $"{userId}_{Guid.NewGuid()}{Path.GetExtension(file.FileName)}";
            var filePath = Path.Combine(uploadDirectory, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            var newImagePath = $"/UserImages/{fileName}";

            if (existingUserImage != null)
            {
                // Güncelleme
                var update = Builders<UserImage>.Update.Set(x => x.ImagePath, newImagePath);
                await _userCollection.UpdateOneAsync(x => x.UserId == userId, update);
            }
            else
            {
                // Yeni kayıt
                var userImage = new UserImage
                {
                    UserId = userId,
                    ImagePath = newImagePath
                };

                await _userCollection.InsertOneAsync(userImage);
            }

            return newImagePath;
        }


        public async Task<string> GetUserImagePathByUserIdAsync(string userId)
        {
            var userImage = await _userCollection.Find(x => x.UserId == userId).FirstOrDefaultAsync();
            return userImage?.ImagePath;
        }

        public async Task<bool> DeleteUserImageAsync(string userId)
        {
            var result = await _userCollection.DeleteOneAsync(x => x.UserId == userId);
            return result.DeletedCount > 0;
        }

        public async Task<List<ResultUserImageDto>> GetAllUserImageAsync()
        {
            var images = await _userCollection.Find(x => true).ToListAsync();
            return _mapper.Map<List<ResultUserImageDto>>(images);
        }

        public async Task<GetByIdUserImageDto> GetByIdUserImageAsync(string id)
        {
            var image = await _userCollection.Find(x => x.Id == id).FirstOrDefaultAsync();
            return _mapper.Map<GetByIdUserImageDto>(image);
        }

        public async Task UpdateUserImageAsync(UpdateUserImageDto updateUserImageDto)
        {
            var entity = _mapper.Map<UserImage>(updateUserImageDto);
            await _userCollection.ReplaceOneAsync(x => x.Id == updateUserImageDto.Id, entity);
        }
    }
}
