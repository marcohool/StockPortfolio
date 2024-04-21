using Microsoft.EntityFrameworkCore;
using StockPortfolio.API.Data;
using StockPortfolio.API.Dtos.Stock;
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

        public async Task<List<Stock>> GetAllAsync()
        {
            return await _context.Stocks.ToListAsync();
        }

        public async Task<Stock?> GetByIdAsync(int id)
        {
            return await this._context.Stocks.FindAsync(id);
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
