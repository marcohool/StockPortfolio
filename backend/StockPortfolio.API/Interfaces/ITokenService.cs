using StockPortfolio.API.Models;

namespace StockPortfolio.API.Interfaces
{
    public interface ITokenService
    {
        string CreateToken(AppUser user);
    }
}
