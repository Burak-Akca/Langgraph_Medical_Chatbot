using backend.IdentityServer.Dtos;
using backend.IdentityServer.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace backend.IdentityServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegisterController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;

        public RegisterController(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        [HttpPost]
        public async Task<ActionResult> RegisterAsync(UserRegisterDto userRegisterDto1)
        {
            var user = new ApplicationUser
            {
                UserName = userRegisterDto1.Username,
                Email = userRegisterDto1.Email,
                Name = userRegisterDto1.Name,
                Surname = userRegisterDto1.Surname,

            };
            var result = await _userManager.CreateAsync(user, userRegisterDto1.Password);
            if (result.Succeeded)
            {
                return Ok("User başarıyla eklendi");
            }
            return BadRequest(result.Errors);



        }



    }
}
