using System.ComponentModel.DataAnnotations;

namespace StockPortfolio.API.Dtos.Account
{
    public class LoginDto
    {
        [Required]
        public required string UserName { get; set; }

        [Required]
        public required string Password { get; set; }
    }
}
