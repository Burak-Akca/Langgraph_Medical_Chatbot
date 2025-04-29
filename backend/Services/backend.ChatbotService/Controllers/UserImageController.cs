using backend.ChatbotService.Services.UserImageServices;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace backend.ChatbotService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserImageController : ControllerBase
    {

        private readonly IUserImageService _userImageService;

        public UserImageController(IUserImageService userImageService)
        {
            _userImageService = userImageService;
        }

        [HttpPut("upload")]
        public async Task<IActionResult> UpdateUserImage([FromForm] IFormFile file, [FromForm] string userId)
        {
            try
            {
                var imagePath = await _userImageService.CreateOrUpdateUserImageAsync(file, userId);
                return Ok(new { message = "Image uploaded or updated successfully!", imagePath });
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }
        [HttpGet("{userId}")]
        public async Task<IActionResult> GetImage(string userId)
        {
            var relativePath = await _userImageService.GetUserImagePathByUserIdAsync(userId);
            if (relativePath == null)
                return NotFound("Image not found");

            var ext = Path.GetExtension(relativePath).ToLowerInvariant();
            var contentType = ext switch
            {
                ".jpg" or ".jpeg" => "image/jpeg",
                ".png" => "image/png",
                ".gif" => "image/gif",
                _ => "application/octet-stream"
            };

            var wwwrootPath = Directory.GetCurrentDirectory();
            var normalizedPath = relativePath.Replace("/", Path.DirectorySeparatorChar.ToString());
            var cleanedRelativePath = normalizedPath.TrimStart(Path.DirectorySeparatorChar, '/');

            var fullPath = Path.Combine(wwwrootPath, cleanedRelativePath);

           
          

            if (!System.IO.File.Exists(fullPath))
            {
                return NotFound("Image file not found");
            }

            var imageBytes = await System.IO.File.ReadAllBytesAsync(fullPath);
            return File(imageBytes, contentType);
        }


        [HttpDelete("{userId}")]
        public async Task<IActionResult> DeleteUserImage(string userId)
        {
            try
            {
                


                var relativePath = await _userImageService.GetUserImagePathByUserIdAsync(userId);
                if (relativePath == null)
                    return NotFound("Image not found");

                var wwwrootPath = Directory.GetCurrentDirectory();
                var normalizedPath = relativePath.Replace("/", Path.DirectorySeparatorChar.ToString());
                var cleanedRelativePath = normalizedPath.TrimStart(Path.DirectorySeparatorChar, '/');
                var fullPath = Path.Combine(wwwrootPath, cleanedRelativePath);

                if (!System.IO.File.Exists(fullPath))
                    return NotFound("Image file not found");

                try
                {
                    System.IO.File.Delete(fullPath);
                    var success = await _userImageService.DeleteUserImageAsync(userId);
                    if (!success) { return NotFound(new { message = "Image not found or could not be deleted." }); }

                    return Ok(new { message = "Image deleted successfully." });
                }
                catch (Exception ex)
                {
                    return StatusCode(500, new { error = ex.Message });
                }

            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }




    }
}
