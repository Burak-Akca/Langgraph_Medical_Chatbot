using AutoMapper;
using backend.ChatbotService.Dtos.ChatbotResponse;
using backend.ChatbotService.Entities;
using backend.ChatbotService.Settings;
using MongoDB.Driver;

namespace backend.ChatbotService.Services.ChatbotResponseServices
{
    public class ChatbotResponseService : IChatbotResponseService
    {
        private readonly IMongoCollection<ChatbotResponse> _chatbotResponseCollection;
        private readonly IMapper _mapper;

        public ChatbotResponseService(IMapper mapper, IDatabaseSettings databaseSettings)
        {
            var client = new MongoClient(databaseSettings.ConnectionString);
            var database = client.GetDatabase(databaseSettings.DatabaseName);
            _chatbotResponseCollection = database.GetCollection<ChatbotResponse>(databaseSettings.ChatbotResponseCollectionName);
            _mapper = mapper;
        }

        public async Task CreateChatbotResponseAsync(CreateChatbotResponseDto createChatbotResponseDto)
        {
            var value = _mapper.Map<ChatbotResponse>(createChatbotResponseDto);
            await _chatbotResponseCollection.InsertOneAsync(value);
        }

        public async Task DeleteChatbotResponseAsync(string chatbotResponseId)
        {
            await _chatbotResponseCollection.DeleteOneAsync(x => x.Id == chatbotResponseId);
        }

        public async Task<List<ResultChatbotResponseDto>> GetAllChatbotResponsesAsync()
        {
            var value = await _chatbotResponseCollection.Find(x => true).ToListAsync();
            return _mapper.Map<List<ResultChatbotResponseDto>>(value);
        }

        public async Task<GetByIdChatbotResponseDto> GetByIdChatbotResponseAsync(string id)
        {
            var values = await _chatbotResponseCollection.Find(x => x.Id == id).FirstOrDefaultAsync();
            return _mapper.Map<GetByIdChatbotResponseDto>(values);
        }

        public async Task UpdateChatbotResponseAsync(UpdateChatbotResponseDto updateChatbotResponseDto)
        {
            var values = _mapper.Map<ChatbotResponse>(updateChatbotResponseDto);
            await _chatbotResponseCollection.FindOneAndReplaceAsync(x => x.Id == updateChatbotResponseDto.Id, values);
        }
    }
}
