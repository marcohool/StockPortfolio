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
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var comments = await _commentRepository.GetAllAsync();
            var commentDtos = comments.Select(c => c.ToCommentDto());

            return Ok(commentDtos);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById(int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            Comment comment = await _commentRepository.GetByIdAsync(id);

            if (comment == null)
            {
                return NotFound();
            }

            return Ok(comment.ToCommentDto());
        }

        [HttpPost("{stockId:int}")]
        public async Task<IActionResult> Create(
            [FromRoute] int stockId,
            CreateCommentDto commentDto
        )
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

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

        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(
            [FromRoute] int id,
            [FromBody] UpdateCommentDto commentDto
        )
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            Comment? comment = await _commentRepository.UpdateAsync(id, commentDto);

            if (comment == null)
            {
                return NotFound();
            }

            return NoContent();
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var commentModel = await _commentRepository.DeleteAsync(id);

            if (commentModel == null)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}
