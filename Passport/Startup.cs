using IdentityServer4.AccessTokenValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Passport.Interfaces;
using Passport.Models;
using Passport.Models.Context;
using Passport.Services;
using Passport.Utility.Configuration;
using SendGrid;
using Svalbard;

namespace Passport
{
  public class Startup
  {
    public Startup(IConfiguration configuration)
    {
      Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {
      services.AddTransient<IPassportService, PassportService>();
      services.AddTransient<IEmailService, EmailService>();
      services.AddTransient<ISendGridClient>(provider =>
      {
        IOptions<SendGridConfig> accessor = provider.GetRequiredService<IOptions<SendGridConfig>>();
        return new SendGridClient(accessor.Value.ApiKey);
      });

      services.Configure<SendGridConfig>(Configuration.GetSection("SendGrid"));
      services.Configure<RouteOptions>(options => options.LowercaseUrls = true);
      services.Configure<IdentityOptions>(options =>
      {
        options.User.AllowedUserNameCharacters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#";
        options.User.RequireUniqueEmail = true;
        options.Password.RequireNonAlphanumeric = false;
        options.SignIn.RequireConfirmedEmail = false;
      });
      services.Configure<ForwardedHeadersOptions>(options =>
      {
        options.ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto;
        options.RequireHeaderSymmetry = false;

        options.KnownNetworks.Clear();
        options.KnownProxies.Clear();
      });

      services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);

      // In production, the React files will be served from this directory
      services.AddSpaStaticFiles(configuration =>
      {
        configuration.RootPath = "ClientApp/build";
      });

      services.AddDbContext<PassportDbContext>(options =>
      {
        options.UseSqlServer(Configuration.GetConnectionString("PassportDbContext"), builder =>
        {
          builder.MigrationsAssembly("Passport.Models");
          builder.MigrationsHistoryTable("__MigrationsPassportHistory", schema: "passport");
        });
        options.ConfigureWarnings(warnings => warnings.Throw(RelationalEventId.QueryClientEvaluationWarning));
        options.UseLazyLoadingProxies();
      });

      services.AddIdentity<PassportUser, IdentityRole>()
        .AddEntityFrameworkStores<PassportDbContext>()
        .AddDefaultTokenProviders();

      services.AddSvalbard();

      services.AddCors(options =>
      {
        options.AddDefaultPolicy(policy =>
        {
          policy.AllowAnyHeader();
          policy.AllowAnyMethod();
          policy.AllowAnyOrigin();
        });
      });

      services.AddIdentityServer(config =>
      {
        config.Events.RaiseErrorEvents = true;
        config.Events.RaiseFailureEvents = true;
        config.Events.RaiseSuccessEvents = true;
        config.Events.RaiseFailureEvents = true;
        config.UserInteraction.ErrorUrl = "/error";
        config.UserInteraction.LoginUrl = "/signin";
        config.UserInteraction.LogoutUrl = "/signout";
        config.UserInteraction.LoginReturnUrlParameter = "returnUrl";
      })
        .AddDeveloperSigningCredential()
        .AddInMemoryPersistedGrants()
        .AddInMemoryIdentityResources(InMemoryIdentityResources.IdentityResources)
        .AddInMemoryApiResources(Configuration.GetSection("Identity:Resources"))
        .AddInMemoryClients(InMemoryClients.Clients)
        .AddAspNetIdentity<PassportUser>();

      services.AddAuthentication("Bearer")
              .AddIdentityServerAuthentication(options =>
              {
                options.Authority = "http://localhost:62978";
                options.RequireHttpsMetadata = false;
                options.ApiName = "@slashgg/passport";
              });

      services.AddAuthorization(auth =>
      {
        auth.AddPolicy("Backchannel", policy =>
        {
          policy.AuthenticationSchemes.Add(IdentityServerAuthenticationDefaults.AuthenticationScheme);
          policy.RequireScope("@slashgg/passport.full_access");
        });
      });
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IHostingEnvironment env)
    {
      app.UseForwardedHeaders();

      if (env.IsDevelopment())
      {
        app.UseDeveloperExceptionPage();
      }
      else
      {
        app.UseExceptionHandler("/Error");
        app.UseHsts();
      }

      app.UseHttpsRedirection();
      app.UseStaticFiles();
      app.UseSpaStaticFiles();
      app.UseAuthentication();

      app.UseCors();

      app.UseIdentityServer();

      app.UseMvc(routes =>
      {
        routes.MapRoute(
            name: "default",
            template: "api/{area}/{controller=Home}/{action=Index}/{id?}");
      });

      app.UseSpa(spa =>
      {
        spa.Options.SourcePath = "ClientApp";

        if (env.IsDevelopment())
        {
          spa.UseProxyToSpaDevelopmentServer("http://localhost:3001");
        }
      });
    }
  }
}
