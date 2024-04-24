using Microsoft.EntityFrameworkCore;
using StockPortfolio.API.Data;
using StockPortfolio.API.Dtos.Stock;
using StockPortfolio.API.Helpers;
using StockPortfolio.API.Interfaces;
using StockPortfolio.API.Models;

namespace StockPortfolio.API.Repository
{
    public class StockRepository : IStockRepository
    {
        private readonly ApplicationDBContext _context;

        public StockRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<Stock> CreateAsync(Stock stockModel)
        {
            await this._context.Stocks.AddAsync(stockModel);
            await this._context.SaveChangesAsync();

            return stockModel;
        }

        public async Task<Stock?> DeleteAsync(int id)
        {
            Stock stockModel = await this._context.Stocks.FirstOrDefaultAsync(x => x.Id == id);

            if (stockModel == null)
            {
                return null;
            }

            this._context.Stocks.Remove(stockModel);
            await this._context.SaveChangesAsync();
            return stockModel;
        }

        public async Task<List<Stock>> GetAllAsync(QueryObject query)
        {
            IQueryable<Stock> stocks = _context.Stocks.Include(c => c.Comments).AsQueryable();

            if (!string.IsNullOrWhiteSpace(query.CompanyName))
            {
                stocks = stocks.Where(s =>
                    s.Symbol.Contains(query.CompanyName)
                    || s.CompanyName.Contains(query.CompanyName)
                );
            }

            if (!string.IsNullOrWhiteSpace(query.Symbol))
            {
                stocks = stocks.Where(s => s.Symbol.Contains(query.Symbol));
            }

            if (!string.IsNullOrWhiteSpace(query.SortBy))
            {
                if (query.SortBy.Equals("Symbol", StringComparison.OrdinalIgnoreCase))
                {
                    stocks = query.IsDecsending
                        ? stocks.OrderByDescending(s => s.Symbol)
                        : stocks.OrderBy(s => s.Symbol);
                }

                if (query.SortBy.Equals("CompanyName", StringComparison.OrdinalIgnoreCase))
                {
                    stocks = query.IsDecsending
                        ? stocks.OrderByDescending(s => s.CompanyName)
                        : stocks.OrderBy(s => s.CompanyName);
                }
            }

            return await stocks.ToListAsync();
        }

        public async Task<Stock?> GetByIdAsync(int id)
        {
            return await this
                ._context.Stocks.Include(c => c.Comments)
                .FirstOrDefaultAsync(i => i.Id == id);
        }

        public Task<bool> StockExists(int id)
        {
            return this._context.Stocks.AnyAsync(x => x.Id == id);
        }

        public async Task<Stock?> UpdateAsync(int id, UpdateStockRequestDto stockDto)
        {
            var exisitingStock = await this._context.Stocks.FirstOrDefaultAsync(x => x.Id == id);

            if (exisitingStock == null)
            {
                return null;
            }

            exisitingStock.Symbol = stockDto.Symbol;
            exisitingStock.CompanyName = stockDto.CompanyName;
            exisitingStock.Purchase = stockDto.Purchase;
            exisitingStock.LastDiv = stockDto.LastDiv;
            exisitingStock.Industry = stockDto.Industry;
            exisitingStock.MarketCap = stockDto.MarketCap;

            await _context.SaveChangesAsync();

            return exisitingStock;
        }
    }
}
