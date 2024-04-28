using StockPortfolio.API.Dtos.Comment;
using StockPortfolio.API.Helpers;
using StockPortfolio.API.Models;

namespace StockPortfolio.API.Interfaces
{
    public interface ICommentRepository
    {
        Task<List<Comment>> GetAllAsync(CommentQueryObject queryObject);
        Task<Comment?> GetByIdAsync(int id);
        Task<Comment> CreateAsync(Comment comment);
        Task<Comment?> UpdateAsync(int id, UpdateCommentDto updateCommentDto);
        Task<Comment?> DeleteAsync(int id);
    }
}
