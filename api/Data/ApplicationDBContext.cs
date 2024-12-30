using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.models;
using Microsoft.EntityFrameworkCore;

namespace api.Data
{
    // ApplicationDBContext is going to allow us to retrive a table from the database.
    public class ApplicationDBContext: DbContext // inherit from DbContext
    {
        // Constructor
        public ApplicationDBContext(DbContextOptions dbContextOptions) : base(dbContextOptions)
        {
            
        }

        // Allows us to access tables
        public DbSet<Stock> Stocks {get; set;}
        public DbSet<Commnet> Comments {get; set;}

    }
}