using System.ComponentModel.DataAnnotations;

namespace StockPortfolio.API.Dtos.Stock
{
    public class UpdateStockRequestDto
    {
        [Required]
        [MaxLength(10, ErrorMessage = "Symbol cannot be over 10 characters long")]
        public string Symbol { get; set; } = string.Empty;

        [Required]
        [MaxLength(50, ErrorMessage = "Company name cannot be over 50 characters long")]
        public string CompanyName { get; set; } = string.Empty;

        [Required]
        [Range(0, double.MaxValue, ErrorMessage = "Purchase price must be a positive number")]
        public decimal Purchase { get; set; }

        [Required]
        [Range(0, double.MaxValue, ErrorMessage = "Last dividend must be a positive number")]
        public decimal LastDiv { get; set; }

        [Required]
        [MaxLength(30, ErrorMessage = "Industry cannot be over 30 characters long")]
        public string Industry { get; set; } = string.Empty;

        [Required]
        [Range(0, long.MaxValue, ErrorMessage = "Market cap must be a positive number")]
        public long MarketCap { get; set; }
    }
}
