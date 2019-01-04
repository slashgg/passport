namespace Passport.Utility.Authentication
{
  public static class ExternalClaimTypes
  {
    private static string PreferredUsername { get; } = "preferred_username";

    public static class BattleNet
    {
      public static string Urn = "battlenet";
      public static string Name { get; } = $"{Urn}:battletag";
      public static string DisplayName { get; } = $"{Urn}:{PreferredUsername}";
    }

    public static class Discord
    {
      public static string Urn = "discord";
      public static string Name { get; } = $"{Urn}:name";
      public static string Discriminator { get; } = $"{Urn}:discriminator";
      public static string DisplayName { get; } = $"{Urn}:{PreferredUsername}";
    }
  }
}
