using backend.IdentityServer.Dtos;
using backend.IdentityServer.Models;
using IdentityServer4.Hosting.LocalApiAuthentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using static IdentityServer4.IdentityServerConstants;

namespace backend.IdentityServer.Controllers
{

    //[Authorize(LocalApi.PolicyName)]
    [Route("api/[controller]")]
    [ApiController]
    public class RegisterController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;

        public RegisterController(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            _userManager = userManager;
            _roleManager = roleManager;
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

                if (!await _roleManager.RoleExistsAsync("SympthonAIVisitor"))
                {
                    var role = new IdentityRole("SympthonAIVisitor");
                    await _roleManager.CreateAsync(role);
                }
                await _userManager.AddToRoleAsync(user, "SympthonAIVisitor");



                return Ok("User başarıyla eklendi");
            }
            return BadRequest(result.Errors);



        }



    }
}
