using StockPortfolio.API.Models;

namespace StockPortfolio.API.Interfaces
{
    public interface IFMPService
    {
        Task<Stock> FindStockBySymbolAsync(string symbol);
    }
}
