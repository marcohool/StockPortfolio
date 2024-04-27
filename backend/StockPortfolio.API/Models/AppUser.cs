﻿using Microsoft.AspNetCore.Identity;

namespace StockPortfolio.API.Models
{
    public class AppUser : IdentityUser
    {
        public List<Portfolio> Portfolios { get; set; } = [];
    }
}
