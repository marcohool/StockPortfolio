﻿using Microsoft.EntityFrameworkCore;
using StockPortfolio.API.Data;
using StockPortfolio.API.Interfaces;
using StockPortfolio.API.Models;

namespace StockPortfolio.API.Repository
{
    public class PortfolioRepository : IPortfolioRepository
    {
        private readonly ApplicationDBContext _context;

        public PortfolioRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<List<Stock>> GetUserPortfolio(AppUser user)
        {
            return await _context
                .Portfolios.Where(p => p.AppUserId == user.Id)
                .Select(p => p.Stock)
                .ToListAsync();
        }

        public async Task<Portfolio> CreateAsync(Portfolio portfolio)
        {
            _context.Portfolios.Add(portfolio);
            await _context.SaveChangesAsync();

            return portfolio;
        }

        public async Task<Portfolio?> DeletePortfolio(AppUser user, string symbol)
        {
            Portfolio? portfolioModel = await _context.Portfolios.FirstOrDefaultAsync(x =>
                x.AppUserId == user.Id && x.Stock.Symbol.ToLower() == symbol.ToLower()
            );

            if (portfolioModel == null)
                return null;

            _context.Portfolios.Remove(portfolioModel);
            await _context.SaveChangesAsync();

            return portfolioModel;
        }
    }
}
