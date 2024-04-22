using Microsoft.AspNetCore.Mvc;
using StockPortfolio.API.Dtos.Comment;
using StockPortfolio.API.Interfaces;
using StockPortfolio.API.Mappers;
using StockPortfolio.API.Models;

namespace StockPortfolio.API.Controllers
{
    [Route("api/comment")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly ICommentRepository _commentRepository;
        private readonly IStockRepository _stockRepository;

        public CommentController(
            ICommentRepository commentRepository,
            IStockRepository stockRepository
        )
        {
            _commentRepository = commentRepository;
            _stockRepository = stockRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var comments = await _commentRepository.GetAllAsync();
            var commentDtos = comments.Select(c => c.ToCommentDto());

            return Ok(commentDtos);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            Comment comment = await _commentRepository.GetByIdAsync(id);

            if (comment == null)
            {
                return NotFound();
            }

            return Ok(comment.ToCommentDto());
        }

        [HttpPost("{stockId}")]
        public async Task<IActionResult> Create(
            [FromRoute] int stockId,
            CreateCommentDto commentDto
        )
        {
            if (!await this._stockRepository.StockExists(stockId))
            {
                return BadRequest("Stock does not exist");
            }

            Comment comment = commentDto.ToCommentFromCreateDTO(stockId);
            await _commentRepository.CreateAsync(comment);

            return CreatedAtAction(
                nameof(GetById),
                new { id = comment.Id },
                comment.ToCommentDto()
            );
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            var commentModel = await _commentRepository.DeleteAsync(id);

            if (commentModel == null)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}
