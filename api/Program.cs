using api.Data;
using api.Interfaces;
using api.models;
using api.Repository;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers(); //plug the controllers into program.cs

// Add Newtonsoft
builder.Services.AddControllers().AddNewtonsoftJson(options => {
    // to prevent object cycle - part of entity framework so we need to disable it
    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
});

// Hookup ApplicationDbContext
builder.Services.AddDbContext<ApplicationDBContext>(options => {
    // specify which db to use
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
    // GetConnectionString() grabs connetion string from appsettings.json
});

// Hookup services
builder.Services.AddScoped<IStockRepository, StockRepository>(); // for stocks
builder.Services.AddScoped<ICommentRepository, CommentRepository>(); // for comments

var app = builder.Build();

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.MapControllers(); // prevents https redirect error

app.Run();

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
