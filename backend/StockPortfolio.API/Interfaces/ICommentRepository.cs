using StockPortfolio.API.Models;

namespace StockPortfolio.API.Interfaces
{
    public interface ICommentRepository
    {
        Task<List<Comment>> GetAllAsync();
        Task<Comment?> GetByIdAsync(int id);

    }


}
