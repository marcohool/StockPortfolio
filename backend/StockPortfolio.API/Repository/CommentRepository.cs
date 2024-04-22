using Microsoft.EntityFrameworkCore;
using StockPortfolio.API.Data;
using StockPortfolio.API.Interfaces;
using StockPortfolio.API.Models;

namespace StockPortfolio.API.Repository
{
    public class CommentRepository : ICommentRepository
    {
        private readonly ApplicationDBContext _context;

        public CommentRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<List<Comment>> GetAllAsync()
        {
            return await this._context.Comments.ToListAsync();
        }

        public async Task<Comment?> GetByIdAsync(int id)
        {
            return await this._context.Comments.FindAsync(id);
        }

        public async Task<Comment> CreateAsync(Comment comment)
        {
            await this._context.Comments.AddAsync(comment);
            await this._context.SaveChangesAsync();

            return comment;
        }
    }
}
