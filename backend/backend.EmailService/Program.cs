using backend.EmailService.Services.EmailServices;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontendForEmailService", policy =>
    {
        policy.WithOrigins("http://localhost:3000") // Frontend'in bulundu�u domain'i burada belirtin
              .AllowAnyHeader()  // T�m header'lara izin verir
              .AllowAnyMethod()
              .AllowCredentials(); // T�m HTTP metodlar�na (GET, POST, vb.) izin verir
    });
});

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<IEmailService, EmailService>();

var app = builder.Build();
app.UseCors("AllowFrontendForEmailService");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
