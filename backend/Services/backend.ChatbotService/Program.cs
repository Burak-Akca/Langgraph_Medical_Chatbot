using backend.ChatbotService.Services.ChatbotResponseServices;
using backend.ChatbotService.Services.ConversationServices;
using backend.ChatbotService.Services.MessageServices;
using backend.ChatbotService.Services.UserServices;
using backend.ChatbotService.Settings;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Cors.Infrastructure; // CORS kullanmak için bu namespace'i ekleyin
using System.Reflection;

var builder = WebApplication.CreateBuilder(args);

// CORS yapýlandýrmasý
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:3000") // Frontend'in bulunduðu domain'i burada belirtin
              .AllowAnyHeader()  // Tüm header'lara izin verir
              .AllowAnyMethod()
              .AllowCredentials(); // Tüm HTTP metodlarýna (GET, POST, vb.) izin verir
    });
});

// JWT kimlik doðrulama ve yetkilendirme yapýlandýrmasý
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(opt =>
{
    opt.Authority = builder.Configuration["IdentityServerurl"];
    opt.Audience = "ResourceChatbot";
    opt.RequireHttpsMetadata = false;
});

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("ChatbotFullAccess", policy =>
        policy.RequireClaim("scope", "ChatbotFullPermission"));

    options.AddPolicy("ChatbotReadAccess", policy =>
        policy.RequireClaim("scope", "ChatbotReadPermission"));

    options.AddPolicy("ConversationFullAccess", policy =>
        policy.RequireClaim("scope", "ConversationFullPermission"));

    options.AddPolicy("ConversationReadAccess", policy =>
        policy.RequireClaim("scope", "ConversationReadPermission"));
});

// Service registrations
builder.Services.AddScoped<IConversationService, ConversationService>();
builder.Services.AddScoped<IMessageService, MessageService>();
builder.Services.AddScoped<IChatbotResponseService, ChatbotResponseService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddAutoMapper(Assembly.GetExecutingAssembly());

builder.Services.Configure<DatabaseSettings>(builder.Configuration.GetSection("DatabaseSettings"));
builder.Services.AddScoped<IDatabaseSettings>(sp => { return sp.GetRequiredService<IOptions<DatabaseSettings>>().Value; });

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// CORS politikalarýný uygulamak
app.UseCors("AllowFrontend"); // CORS politikalarýný burada kullanýyoruz

// Swagger ve diðer geliþtirme araçlarý yalnýzca geliþtirme ortamýnda
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
