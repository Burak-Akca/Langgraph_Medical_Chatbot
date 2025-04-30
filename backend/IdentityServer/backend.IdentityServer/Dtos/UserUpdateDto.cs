namespace backend.IdentityServer.Dtos
{
    public class UserUpdateDto
    {


        public string Username { get; set; }  // Kullanıcıyı bulmak için
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }
    }
}
