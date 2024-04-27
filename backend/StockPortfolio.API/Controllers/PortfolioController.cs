using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using StockPortfolio.API.Extensions;
using StockPortfolio.API.Interfaces;
using StockPortfolio.API.Models;

namespace StockPortfolio.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PortfolioController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly IStockRepository _stockRepository;
        private readonly IPortfolioRepository _portfolioRepository;

        public PortfolioController(
            UserManager<AppUser> userManager,
            IStockRepository stockRepo,
            IPortfolioRepository portfolioRepository
        )
        {
            _userManager = userManager;
            _stockRepository = stockRepo;
            _portfolioRepository = portfolioRepository;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetUserPortfolio()
        {
            var username = User.GetUsername();
            AppUser user = await _userManager.FindByNameAsync(username);
            List<Stock> userPortfolio = await _portfolioRepository.GetUserPortfolio(user);
            return Ok(userPortfolio);
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> AddStockToPortfolio(string symbol)
        {
            var username = User.GetUsername();
            AppUser user = await _userManager.FindByNameAsync(username);
            Stock stock = await _stockRepository.GetBySymbolAsync(symbol);

            if (stock == null)
                return BadRequest("Stock not found");

            List<Stock> userPortfolio = await _portfolioRepository.GetUserPortfolio(user);

            if (userPortfolio.Exists(e => e.Symbol.ToLower() == symbol.ToLower()))
                return BadRequest("Cannot add same stock to portfolio");

            Portfolio portfolioModel = await _portfolioRepository.CreateAsync(
                new Portfolio { StockId = stock.Id, AppUserId = user.Id }
            );

            if (portfolioModel == null)
                return StatusCode(500, "Could not create portfolio");

            return Ok();
        }

        [HttpDelete]
        [Authorize]
        public async Task<IActionResult> DeletePortfolio(string symbol)
        {
            string username = User.GetUsername();
            AppUser user = await _userManager.FindByNameAsync(username);

            List<Stock> userPortfolio = await _portfolioRepository.GetUserPortfolio(user);

            List<Stock> filteredStock = userPortfolio
                .Where(s => s.Symbol.ToLower() == symbol.ToLower())
                .ToList();

            if (filteredStock.Count == 1)
            {
                await _portfolioRepository.DeletePortfolio(user, symbol);

                return Ok();
            }

            return BadRequest("Stock is not in portfolio");
        }
    }
}
