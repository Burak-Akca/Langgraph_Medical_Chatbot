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
    public class UserController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;

        public UserController(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            _userManager = userManager;
            _roleManager = roleManager;
        }

       
          [HttpGet("{id}")]
        public async Task<ActionResult> GetUserById(string id)
        {
            var user = await _userManager.FindByIdAsync(id);

            if (user == null)
            {
                return NotFound("Kullanıcı bulunamadı.");
            }

            var roles = await _userManager.GetRolesAsync(user);

            return Ok(new
            {
                Id = user.Id,
                Username = user.UserName,
                Email = user.Email,
                Name = user.Name,
                Surname = user.Surname,
                Roles = roles
            });
        }

        [HttpPut("update")]
        public async Task<IActionResult> UpdateUser(UserUpdateDto dto)
        {
            var user = await _userManager.FindByIdAsync(dto.id);
            if (user == null)
            {
                return NotFound("Kullanıcı bulunamadı.");
            }

            // Kullanıcı adı ve e-posta güncelleniyor
            user.UserName = dto.Username;
            user.Email = dto.Email;

            // Şifre güncellenmesi gerekiyorsa
            if (!string.IsNullOrEmpty(dto.CurrentPassword) &&
                !string.IsNullOrEmpty(dto.NewPassword) &&
                !string.IsNullOrEmpty(dto.ConfirmPassword))
            {
               

                if (dto.NewPassword != dto.ConfirmPassword)
                {
                    return BadRequest("Yeni şifre ve tekrar şifre uyuşmuyor.");
                }

                var passwordResult = await _userManager.ChangePasswordAsync(user, dto.CurrentPassword, dto.NewPassword);
                if (!passwordResult.Succeeded)
                {
                    return BadRequest(passwordResult.Errors);
                }
            }

            // Şifre alanları boş olsa bile, kullanıcı bilgileri güncellenir
            var updateResult = await _userManager.UpdateAsync(user);
            if (!updateResult.Succeeded)
            {
                return BadRequest(updateResult.Errors);
            }

            return Ok("Kullanıcı bilgileri başarıyla güncellendi.");
        }


    }
}

