using backend.ChatbotService.Dtos.Conversation;
using backend.ChatbotService.Services.ConversationServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace backend.ChatbotService.Controllers
{
    [Authorize(Policy = "ConversationFullAccess")]

    [Route("api/[controller]")]
    [ApiController]
    public class ConversationsController : ControllerBase
    {
        private readonly IConversationService _conversationService;

        public ConversationsController(IConversationService conversationService)
        {
            _conversationService = conversationService;
        }

        [HttpGet]
        public async Task<ActionResult> GetAllConversationsAsync()
        {
            var values = await _conversationService.GetAllConversationsAsync();
            return Ok(values);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetByIdConversationAsync(string id)
        {
            var conversation = await _conversationService.GetByIdConversationAsync(id);
            if (conversation == null)
            {
                return NotFound();
            }
            return Ok(conversation);
        }

        [HttpPost]
        public async Task<ActionResult> CreateConversationAsync(CreateConversationDto createConversationDto)
        {
            await _conversationService.CreateConversationAsync(createConversationDto);
            return Ok("Conversation başarıyla eklendi");
        }

        [HttpDelete]
        public async Task<ActionResult> DeleteConversationAsync(string id)
        {
            await _conversationService.DeleteConversationAsync(id);
            return Ok("Conversation başarıyla silindi");
        }
        [HttpPut]

        public async Task<ActionResult> UpdateConversationAsync(UpdateConversationDto updateConversationDto)
        {

            await _conversationService.UpdateConversationAsync(updateConversationDto);
            return Ok("Conversation başarıyla güncellendi");
        }
    }
}

