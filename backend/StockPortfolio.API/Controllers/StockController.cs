﻿using Microsoft.AspNetCore.Mvc;
using StockPortfolio.API.Data;
using StockPortfolio.API.Mappers;

namespace StockPortfolio.API.Controllers
{
    [Route("api/stock")]
    [ApiController]
    public class StockController : ControllerBase
    {
        private readonly ApplicationDBContext _context;

        public StockController(ApplicationDBContext context)
        {
            this._context = context;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_context.Stocks.ToList().Select(s => s.ToStockDto()));
        }

        [HttpGet("{id}")]
        public IActionResult GetById([FromRoute] int id)
        {
            var stock = _context.Stocks.Find(id);

            if (stock == null)
            {
                return NotFound();
            }

            return Ok(stock.ToStockDto());
        }
    }
}
