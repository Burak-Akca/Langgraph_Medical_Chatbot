using backend.ChatbotService.Dtos.Message;
using backend.ChatbotService.Services.MessageServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace backend.ChatbotService.Controllers
{
    [Authorize(Policy = "ChatbotReadAccess")]

    [Route("api/[controller]")]
    [ApiController]
    public class MessagesController : ControllerBase
    {
        private readonly IMessageService _messageService;

        public MessagesController(IMessageService messageService)
        {
            _messageService = messageService;
        }

        [HttpGet]
        public async Task<ActionResult> GetAllMessagesAsync()
        {
            var values = await _messageService.GetAllMessagesAsync();
            return Ok(values);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetByIdMessageAsync(string id)
        {
            var message = await _messageService.GetByIdMessageAsync(id);
            if (message == null)
            {
                return NotFound();
            }
            return Ok(message);
        }
        [HttpGet("user/{userId}")]
        public async Task<ActionResult> GetConversationsByUserIdAsync(string userId)
        {
                var messages = await _messageService.GetConversationsByUserIdAsync(userId);
            if (messages == null || !messages.Any())
            {
                return NotFound(new { Message = "No message found for this user." });
            }
            return Ok(messages);
        }


        [HttpPost]
        public async Task<ActionResult> CreateMessageAsync(CreateMessageDto createMessageDto)
        {
            await _messageService.CreateMessageAsync(createMessageDto);
            return Ok("Message başarıyla eklendi");
        }

        [HttpDelete]
        public async Task<ActionResult> DeleteMessageAsync(string id)
        {
            await _messageService.DeleteMessageAsync(id);
            return Ok("Message başarıyla silindi");
        }

        [HttpPut]
        public async Task<ActionResult> UpdateMessageAsync(UpdateMessageDto updateMessageDto)
        {
           

            await _messageService.UpdateMessageAsync(updateMessageDto);
            return Ok("Message başarıyla güncellendi");
        }
    }
}

