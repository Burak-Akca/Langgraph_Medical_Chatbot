namespace backend.ChatbotService.Settings
{
    public class DatabaseSettings : IDatabaseSettings
    {
        public string ChatbotResponseCollectionName { get; set; }
        public string MessageCollectionName { get; set; }
        public string ConversationCollectionName { get; set; }
        public string UserCollectionName { get; set; }
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
    }
}
