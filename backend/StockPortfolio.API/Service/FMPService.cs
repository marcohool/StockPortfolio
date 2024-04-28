using Newtonsoft.Json;
using StockPortfolio.API.Dtos.Stock;
using StockPortfolio.API.Interfaces;
using StockPortfolio.API.Mappers;
using StockPortfolio.API.Models;

namespace StockPortfolio.API.Service
{
    public class FMPService : IFMPService
    {
        private HttpClient _httpClient;
        private IConfiguration _configuration;

        public FMPService(HttpClient httpClient, IConfiguration configuration)
        {
            _httpClient = httpClient;
            _configuration = configuration;
        }

        public async Task<Stock?> FindStockBySymbolAsync(string symbol)
        {
            try
            {
                HttpResponseMessage result = await _httpClient.GetAsync(
                    $"https://financialmodelingprep.com/api/v3/profile/{symbol}?apikey={_configuration["FMPKey"]}"
                );

                if (result.IsSuccessStatusCode)
                {
                    var content = await result.Content.ReadAsStringAsync();
                    var tasks = JsonConvert.DeserializeObject<FMPStock[]>(content);
                    var stock = tasks[0];

                    if (stock != null)
                    {
                        return stock.ToStockFromFMPStock();
                    }

                    return null;
                }

                return null;
            }
            catch (Exception)
            {
                return null;
            }
        }
    }
}
