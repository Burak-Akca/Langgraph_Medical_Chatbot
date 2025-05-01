namespace backend.IdentityServer.Dtos
{
    public class UserUpdateDto
    {

        public string id { get; set; }
        public string Username { get; set; }  // Kullanıcıyı bulmak için
        public string Email { get; set; }
        public string CurrentPassword { get; set; }
        public string NewPassword { get; set; }
        public string ConfirmPassword { get; set; }
    }
}
