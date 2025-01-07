using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Stock;
using api.models;

namespace api.Interfaces
{
    // Dependency Injection Patter:
    // This interface acts as a contract so the underslying code is hidden and can be reused multiple times
    public interface IStockRepository
    {
        Task<List<Stock>> GetAllAsync();

        Task<Stock?> GetByIdAsync(int id); // can be null if stock is not found

        Task<Stock> CreateAsync(Stock stockModel);

        Task<Stock?> UpdateAsync(int id, UpdateStockRequestDto stockDto);

        Task <Stock?> DeleteAsync(int id);

        Task<bool> StockExists(int id);

    }
}