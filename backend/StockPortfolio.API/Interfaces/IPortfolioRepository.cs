using StockPortfolio.API.Models;

namespace StockPortfolio.API.Interfaces
{
    public interface IPortfolioRepository
    {
        Task<List<Stock>> GetUserPortfolio(AppUser user);
    }
}
