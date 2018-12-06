FROM microsoft/dotnet:2.1-aspnetcore-runtime AS base
WORKDIR /app
EXPOSE 80

FROM microsoft/dotnet:2.1-sdk AS build
WORKDIR /src
COPY ["Passport/Passport.csproj", "Passport/"]
COPY ["Passport.Models/Passport.Models.csproj", "Passport.Models/"]
COPY ["Passport.Services/Passport.Services.csproj", "Passport.Services/"]
COPY ["Passport.Interfaces/Passport.Interfaces.csproj", "Passport.Interfaces/"]
COPY ["Passport.DTOs/Passport.DTOs.csproj", "Passport.DTOs/"]
COPY ["Passport.Utility/Passport.Utility.csproj", "Passport.Utility/"]
COPY ["nuget.config", "./"]
RUN dotnet restore "Passport/Passport.csproj" --configfile "nuget.config"
COPY . .
WORKDIR "/src/Passport"
RUN dotnet build "Passport.csproj" -c Release -o /app

FROM node:8 AS node-build
WORKDIR /src
COPY ["Passport/ClientApp/", "ClientApp/"]
WORKDIR "/src/ClientApp"
RUN yarn build

FROM build AS publish
RUN dotnet publish "Passport.csproj" -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
COPY --from=node-build /src/ClientApp/build ./ClientApp/build/
ENTRYPOINT ["dotnet", "Passport.dll"]