using backend.ChatbotService.Dtos.ChatbotResponse;
using backend.ChatbotService.Services.ChatbotResponseServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace backend.ChatbotService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChatbotResponsesController : ControllerBase
    {
        private readonly IChatbotResponseService _chatbotResponseService;

        public ChatbotResponsesController(IChatbotResponseService chatbotResponseService)
        {
            _chatbotResponseService = chatbotResponseService;
        }





        [HttpGet]

        public async Task<ActionResult> GetAllChatbotResponsesAsync()
        {
            var values = await _chatbotResponseService.GetAllChatbotResponsesAsync();
            return Ok(values);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetByIdChatbotResponseAsync(string id)
        {
            var values = await _chatbotResponseService.GetByIdChatbotResponseAsync(id);
            return Ok(values);
        }
        [HttpPost]
        public async Task<ActionResult> CreateChatbotResponseAsync(CreateChatbotResponseDto createChatbotResponseDto)
        {
            await _chatbotResponseService.CreateChatbotResponseAsync(createChatbotResponseDto);
            return Ok("Chatbot Response başarıyla eklendi");

        }

        [HttpDelete]
        public async Task<ActionResult> DeleteChatbotResponseAsync(string Id)
        {
            await _chatbotResponseService.DeleteChatbotResponseAsync(Id);
            return Ok("Chatbot Response başarıyla silindi");
        }

        [HttpPut]
        public async Task<ActionResult> UpdateChatbotResponseAsync(UpdateChatbotResponseDto updateChatbotResponseDto)
        {
            await _chatbotResponseService.UpdateChatbotResponseAsync(updateChatbotResponseDto);
            return Ok("Chatbot Response başarıyla güncellendi");
        }



    }
}
