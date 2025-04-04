// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.


using IdentityServer4;
using IdentityServer4.Models;
using System.Collections.Generic;

namespace backend.IdentityServer
{
    public static class Config
    {


        public static IEnumerable<ApiResource> ApiResources =>
            new ApiResource[]
            {
                new ApiResource("ResourceChatbot")
                {
                    Scopes = { "ChatbotFullPermission", "ChatbotReadPermission" }
                }, 
                new ApiResource("ResourceConversation") 
                {
                    Scopes = { "ConversationFullPermission", "ConversationReadPermission" }
                },
                new ApiResource(IdentityServerConstants.LocalApi.ScopeName)
            };

        public static IEnumerable<IdentityResource> IdentityResources =>new IdentityResource[]
        {
            new IdentityResources.OpenId(),
            new IdentityResources.Email(),
            new IdentityResources.Profile(),

        };  

        public static IEnumerable<ApiScope> ApiScopes =>
            new ApiScope[]
            {
                new ApiScope("ChatbotFullPermission","Full permisson with ChatbotFullPermission"),
                new ApiScope("ChatbotReadPermission","Read permisson with ChatbotReadPermission"),
                new ApiScope("ConversationFullPermission", "Full permission with ConversationFullPermission"),
                new ApiScope("ConversationReadPermission", "Read permission with ConversationReadPermission"),

                new ApiScope(IdentityServerConstants.LocalApi.ScopeName)

            };


        public static IEnumerable<Client> Clients => new Client[] {
            new Client
            {
                ClientId = "SympthonAIVisitorId",
                ClientName = "Sympthon AI Visitor User",
                AllowedGrantTypes = GrantTypes.ResourceOwnerPassword,
                ClientSecrets = { new Secret("ChatbotSecret".Sha256()) },
                AllowedScopes = { "ChatbotReadPermission", "ConversationReadPermission" }
                ,

            }
            ,
            new Client
            {
                ClientId = "SympthonAIManagerId",
                ClientName = "Sympthon AI Manager User",
                AllowedGrantTypes = GrantTypes.ResourceOwnerPassword,
                ClientSecrets = { new Secret("ChatbotSecret".Sha256()) },
                AllowedScopes = { "ChatbotFullPermission", "ConversationReadPermission" }



            }
            ,
            new Client
            {
                ClientId = "SympthonAIAdminId",
                ClientName = "Sympthon AI Admin User",
                AllowedGrantTypes = GrantTypes.ResourceOwnerPassword,
                ClientSecrets = { new Secret("ChatbotSecret".Sha256()) },
                AllowedScopes = { "ChatbotFullPermission",
                "ConversationFullPermission",
                IdentityServerConstants.LocalApi.ScopeName,
                IdentityServerConstants.StandardScopes.Email,
                IdentityServerConstants.StandardScopes.OpenId,
                IdentityServerConstants.StandardScopes.Profile},
                AccessTokenLifetime = 600,
               
            }


        };


    }
}