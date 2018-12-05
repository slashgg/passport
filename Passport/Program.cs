using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Svalbard.Extensions;
using System.IO;

namespace Passport
{
  public class Program
  {
    public static void Main(string[] args)
    {
      CreateWebHostBuilder(args).Build().Run();
    }

    public static IWebHostBuilder CreateWebHostBuilder(string[] args)
    {
      return WebHost.CreateDefaultBuilder(args)
        .ConfigureAppConfiguration((hosting, config) =>
        {
          config.SetBasePath(Directory.GetCurrentDirectory());
          config.AddJsonFile("appsettings.json", optional: false, reloadOnChange: false);
          config.AddJsonFile($"appsettings.{hosting.HostingEnvironment.EnvironmentName}.json", optional: true, reloadOnChange: false);
          config.AddAWSSecrets(options =>
          {
            options.Region = "us-east-1";
            options.Secrets = new string[] { "SendGrid" };
          });
        })
        .UseSentry()
        .UseStartup<Startup>();
    }
  }
}
