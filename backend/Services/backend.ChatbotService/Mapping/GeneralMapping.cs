using AutoMapper;
using backend.ChatbotService.Dtos.Conversation;
using backend.ChatbotService.Dtos.Message;
using backend.ChatbotService.Dtos.ChatbotResponse;
using backend.ChatbotService.Dtos.User;
using backend.ChatbotService.Entities;

namespace backend.ChatbotService.Mapping
{
    public class GeneralMapping : Profile
    {
        public GeneralMapping()
        {
            // Conversation mappings
            CreateMap<CreateConversationDto, Conversation>().ReverseMap();
            CreateMap<UpdateConversationDto, Conversation>().ReverseMap();
            CreateMap<GetByIdConversationDto, Conversation>().ReverseMap();
            CreateMap<ResultConversationDto, Conversation>().ReverseMap();

            // Message mappings
            CreateMap<CreateMessageDto, Message>().ReverseMap();
            CreateMap<UpdateMessageDto, Message>().ReverseMap();
            CreateMap<GetByIdMessageDto, Message>().ReverseMap();
            CreateMap<ResultMessageDto, Message>().ReverseMap();

            // ChatbotResponse mappings
            CreateMap<CreateChatbotResponseDto, ChatbotResponse>().ReverseMap();
            CreateMap<UpdateChatbotResponseDto, ChatbotResponse>().ReverseMap();
            CreateMap<GetByIdChatbotResponseDto, ChatbotResponse>().ReverseMap();
            CreateMap<ResultChatbotResponseDto, ChatbotResponse>().ReverseMap();

            // User mappings
            CreateMap<CreateUserDto, User>().ReverseMap();
            CreateMap<UpdateUserDto, User>().ReverseMap();
            CreateMap<GetByIdUserDto, User>().ReverseMap();
            CreateMap<ResultUserDto, User>().ReverseMap();
        }
    }
}


