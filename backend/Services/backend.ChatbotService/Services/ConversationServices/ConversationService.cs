using AutoMapper;
using backend.ChatbotService.Dtos.Conversation;
using backend.ChatbotService.Entities;
using backend.ChatbotService.Settings;
using MongoDB.Driver;

namespace backend.ChatbotService.Services.ConversationServices
{
    public class ConversationService : IConversationService
    {
        private readonly IMongoCollection<Conversation> _conversationCollection;
        private readonly IMapper _mapper;

        public ConversationService(IMapper mapper, IDatabaseSettings databaseSettings)
        {
            var client = new MongoClient(databaseSettings.ConnectionString);
            var database = client.GetDatabase(databaseSettings.DatabaseName);
            _conversationCollection = database.GetCollection<Conversation>(databaseSettings.ConversationCollectionName);
            _mapper = mapper;
        }

        public async Task CreateConversationAsync(CreateConversationDto createConversationDto)
        {
            var value = _mapper.Map<Conversation>(createConversationDto);
            await _conversationCollection.InsertOneAsync(value);
        }

        public async Task DeleteConversationAsync(string conversationId)
        {
            await _conversationCollection.DeleteOneAsync(x => x.Id == conversationId);
        }

        public async Task<List<ResultConversationDto>> GetAllConversationsAsync()
        {
            var value = await _conversationCollection.Find(x => true).ToListAsync();
            return _mapper.Map<List<ResultConversationDto>>(value);
        }

        public async Task<GetByIdConversationDto> GetByIdConversationAsync(string id)
        {
            var values = await _conversationCollection.Find(x => x.Id == id).FirstOrDefaultAsync();
            return _mapper.Map<GetByIdConversationDto>(values);
        }

        public async Task UpdateConversationAsync(UpdateConversationDto updateConversationDto)
        {
            var values = _mapper.Map<Conversation>(updateConversationDto);
            await _conversationCollection.FindOneAndReplaceAsync(x => x.Id == updateConversationDto.Id, values);
        }
    }
}
