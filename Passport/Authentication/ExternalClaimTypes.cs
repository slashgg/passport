namespace Passport.Authentication
{
  public static class ExternalClaimTypes
  {
    public static class BattleNet
    {
      public static string Urn = "battlenet";
      public static string Name { get; } = $"{Urn}:battletag";
    }

    public static class Discord
    {
      public static string Urn = "discord";
      public static string Name { get; } = $"{Urn}:name";
      public static string Discriminator { get; } = $"{Urn}:discriminator";
    }
  }
}
