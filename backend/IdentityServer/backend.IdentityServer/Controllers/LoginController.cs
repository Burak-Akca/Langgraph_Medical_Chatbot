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
    public class LoginController : ControllerBase
    {
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;

        // UserManager ve RoleManager'ı ctor'ya ekleyin
        public LoginController(SignInManager<ApplicationUser> signInManager, UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _roleManager = roleManager;
        }

        [HttpPost]
        public async Task<ActionResult> UserLogin(UserLoginDto userLoginDto)
        {
            // Kullanıcıyı giriş yapmaya çalışın
            var result = await _signInManager.PasswordSignInAsync(userLoginDto.Username, userLoginDto.Password, false, false);

            if (result.Succeeded)
            {
                // Giriş başarılıysa, kullanıcıyı bul
                var user = await _userManager.FindByNameAsync(userLoginDto.Username);

                if (user != null)
                {
                    // Kullanıcının rollerini al
                    var roles = await _userManager.GetRolesAsync(user);

                    // 'SympthonAIVisitor' rolünü kontrol et, yoksa oluştur
                    if (!roles.Contains("SympthonAIVisitor"))
                    {
                        var roleExist = await _roleManager.RoleExistsAsync("SympthonAIVisitor");
                        if (!roleExist)
                        {
                            var role = new IdentityRole("SympthonAIVisitor");
                            await _roleManager.CreateAsync(role); // Rolü oluştur
                        }

                        // Kullanıcıya 'SympthonAIVisitor' rolünü ekle
                        await _userManager.AddToRoleAsync(user, "SympthonAIVisitor");
                    }

                    // Rolleri ve diğer bilgileri döndür
                    return Ok(new
                    {
                        Message = "Giriş Başarılı",
                        Username = user.UserName,
                        Roles = roles
                    });
                }
                else
                {
                    return BadRequest("Kullanıcı bulunamadı.");
                }
            }
            else
            {
                return BadRequest("Kullanıcı adı veya şifre yanlış");
            }
        }
    }
}
