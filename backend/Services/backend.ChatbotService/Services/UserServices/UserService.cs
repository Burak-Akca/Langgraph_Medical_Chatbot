using AutoMapper;
using backend.ChatbotService.Dtos.User;
using backend.ChatbotService.Entities;
using backend.ChatbotService.Settings;
using MongoDB.Driver;

namespace backend.ChatbotService.Services.UserServices
{
    public class UserService : IUserService
    {
        private readonly IMongoCollection<User> _userCollection;
        private readonly IMapper _mapper;

        public UserService(IMapper mapper,IDatabaseSettings _databaseSettings)
        {

            var client = new MongoClient(_databaseSettings.ConnectionString);
            var database = client.GetDatabase(_databaseSettings.DatabaseName);
            _userCollection = database.GetCollection<User>(_databaseSettings.UserCollectionName);
            _mapper = mapper;

        }

        public async Task CreateUserAsync(CreateUserDto createUserDto)
        {
                var value = _mapper.Map<User>(createUserDto);
            await _userCollection.InsertOneAsync(value);

        }

        public async Task DeleteUserAsync(string userId)
        {
            await _userCollection.DeleteOneAsync(x => x.Id == userId);
        }

        public async Task<List<ResultUserDto>> GetAllUserAsync()
        {
            var value = await _userCollection.Find(x => true).ToListAsync();
            return _mapper.Map<List<ResultUserDto>>(value);
        }

        public async Task<GetByIdUserDto> GetByIdUserAsync(string id)
        {
               var values=await _userCollection.Find(x => true).FirstOrDefaultAsync();
            return _mapper.Map<GetByIdUserDto>(values);

        }

        public async Task UpdateUserAsync(UpdateUserDto updateUserDto)
        {
                var values = _mapper.Map<User>(updateUserDto);
            await _userCollection.FindOneAndReplaceAsync(x => x.Id == updateUserDto.Id, values);
        }
    }
}
