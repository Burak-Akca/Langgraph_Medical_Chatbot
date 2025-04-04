using backend.ChatbotService.Dtos.User;
using backend.ChatbotService.Services.UserServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace backend.ChatbotService.Controllers
{
    [Authorize]

    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;

        public UsersController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        public async Task<ActionResult> GetAllUsersAsync()
        {
            var values = await _userService.GetAllUserAsync();
            return Ok(values);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetByIdUserAsync(string id)
        {
            var user = await _userService.GetByIdUserAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        [HttpPost]
        public async Task<ActionResult> CreateUserAsync(CreateUserDto createUserDto)
        {
            await _userService.CreateUserAsync(createUserDto);
            return Ok("User başarıyla eklendi");
        }

        [HttpDelete]
        public async Task<ActionResult> DeleteUserAsync(string id)
        {
            await _userService.DeleteUserAsync(id);
            return Ok("User başarıyla silindi");
        }
        [HttpPut]

        public async Task<ActionResult> UpdateUserAsync( UpdateUserDto updateUserDto)
        {

            await _userService.UpdateUserAsync(updateUserDto);
            return Ok("User başarıyla güncellendi");
        }
    }
}

