using AutoMapper;
using backend.ChatbotService.Dtos.Message;
using backend.ChatbotService.Entities;
using backend.ChatbotService.Settings;
using MongoDB.Driver;

namespace backend.ChatbotService.Services.MessageServices
{
    public class MessageService : IMessageService
    {
        private readonly IMongoCollection<Message> _messageCollection;
        private readonly IMapper _mapper;

        public MessageService(IMapper mapper, IDatabaseSettings databaseSettings)
        {
            var client = new MongoClient(databaseSettings.ConnectionString);
            var database = client.GetDatabase(databaseSettings.DatabaseName);
            _messageCollection = database.GetCollection<Message>(databaseSettings.MessageCollectionName);
            _mapper = mapper;
        }

        public async Task CreateMessageAsync(CreateMessageDto createMessageDto)
        {
            var value = _mapper.Map<Message>(createMessageDto);
            await _messageCollection.InsertOneAsync(value);
        }

        public async Task DeleteMessageAsync(string messageId)
        {
            await _messageCollection.DeleteOneAsync(x => x.Id == messageId);
        }

        public async Task<List<ResultMessageDto>> GetAllMessagesAsync()
        {
            var value = await _messageCollection.Find(x => true).ToListAsync();
            return _mapper.Map<List<ResultMessageDto>>(value);
        }

        public async Task<GetByIdMessageDto> GetByIdMessageAsync(string id)
        {
            var values = await _messageCollection.Find(x => x.Id == id).FirstOrDefaultAsync();
            return _mapper.Map<GetByIdMessageDto>(values);
        }

        public async Task UpdateMessageAsync(UpdateMessageDto updateMessageDto)
        {
            var values = _mapper.Map<Message>(updateMessageDto);
            await _messageCollection.FindOneAndReplaceAsync(x => x.Id == updateMessageDto.Id, values);
        }
    }
}
