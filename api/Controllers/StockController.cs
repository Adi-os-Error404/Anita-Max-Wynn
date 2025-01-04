using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Stock;
using api.Interfaces;
using api.Mappers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;

namespace api.Controllers
{
    [Route("api/stock")]
    [ApiController]
    public class StockController : ControllerBase
    {
        private readonly ApplicationDBContext _context; // used to get stuff outof db
        private readonly IStockRepository _stockRepo; // get the repo (dependency injection pattern)

        public StockController(ApplicationDBContext context, IStockRepository stockRepo)
        {
            _context = context;
            _stockRepo = stockRepo;
        }


        // async - await allows async. code execution, as db / api exec. can be very slow
        // return type of async function needs to be wrapped in a Task<>
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            // OLD CODE, before using Dependency Injection:
            // var stocks = await _context.Stocks.ToListAsync(); // toList() is requried for deffered execution
            // // ToList() needs to be converted to ToListAsync() due to async. execution

            // NEW CODE:
            var stocks = await _stockRepo.GetAllAsync();

            var stockDto = stocks.Select(s => s.ToStockDto()); // select is like map() in JS
            
            return Ok(stockDto);
        }

        [HttpGet("{id}")] // get one requires an Id (getting id from the route)
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            // var stock = await _context.Stocks.FindAsync(id); // can also use FirstOrDefault
            var stock = await _stockRepo.GetByIdAsync(id);

            if (stock == null) {
                return NotFound();
            }
                return Ok(stock.ToStockDto());
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateStockRequestDto stockDto)
        {
            var stockModel = stockDto.ToStockFromCreateDto();
            // await _context.Stocks.AddAsync(stockModel);
            // await _context.SaveChangesAsync();
            await _stockRepo.CreateAsync(stockModel);

            return CreatedAtAction(nameof(GetById), new { id = stockModel.Id }, stockModel.ToStockDto());
            // CreatedAtAction() runs GetById by passing in new object with the given stockMode.Id
            // and returns stockModel.ToStockDto()
        }

        [HttpPut]
        [Route("{id}")] // update requires an Id (getting Id from the route, not body)
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateStockRequestDto updateDto)
        {
            var stockModel = await _context.Stocks.FirstOrDefaultAsync(x => x.Id == id);
            if (stockModel == null) {
                return NotFound();
            }

        //     // Update the stock details
        //     stockModel.Symbol = updateDto.Symbol;
        //     stockModel.CompanyName = updateDto.CompanyName;
        //     stockModel.Purchase = updateDto.Purchase;
        //     stockModel.LastDiv = updateDto.LastDiv;
        //     stockModel.Industry = updateDto.Industry;
        //     stockModel.MarketCap = updateDto.MarketCap;

        //     // Actually updates the details in the database
        //    await _context.SaveChangesAsync();
            await _stockRepo.UpdateAsync(id, updateDto);

            return Ok(stockModel.ToStockDto());
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            // var stockModel = await _context.Stocks.FirstOrDefaultAsync(x => x.Id == id);
            var stockModel = await _stockRepo.DeleteAsync(id);

            if (stockModel == null) {
                return NotFound();
            }

            // _context.Stocks.Remove(stockModel); // DO NOT ADD await - async when DELETING
            // await _context.SaveChangesAsync();

            return NoContent(); // Success - 204
        }

    }
}