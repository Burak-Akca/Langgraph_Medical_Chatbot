using backend.ChatbotService.Services.ChatbotResponseServices;
using backend.ChatbotService.Services.ConversationServices;
using backend.ChatbotService.Services.MessageServices;
using backend.ChatbotService.Services.UserServices;
using backend.ChatbotService.Settings;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Cors.Infrastructure; // CORS kullanmak i�in bu namespace'i ekleyin
using System.Reflection;

var builder = WebApplication.CreateBuilder(args);

// CORS yap�land�rmas�
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:3000") // Frontend'in bulundu�u domain'i burada belirtin
              .AllowAnyHeader()  // T�m header'lara izin verir
              .AllowAnyMethod()
              .AllowCredentials(); // T�m HTTP metodlar�na (GET, POST, vb.) izin verir
    });
});

// JWT kimlik do�rulama ve yetkilendirme yap�land�rmas�
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

// CORS politikalar�n� uygulamak
app.UseCors("AllowFrontend"); // CORS politikalar�n� burada kullan�yoruz

// Swagger ve di�er geli�tirme ara�lar� yaln�zca geli�tirme ortam�nda
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
