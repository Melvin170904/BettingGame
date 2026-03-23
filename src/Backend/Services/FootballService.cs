using System;
using System.Collections.Generic;
using System.Text;

namespace sports_betting.Services
{
    public class FootballService
    {
        public List<(string EventName, double Home, double Draw, double Away)> GetEvents()
        {
            return new List<(string, double, double, double)>
            {
                ("Arsenal vs Chelsea", 1.90, 3.40, 3.80),
                ("Liverpool vs Man City", 2.40, 3.60, 2.60),
                ("Manchester United vs Tottenham", 2.10, 3.50, 3.20)
            };
        }
    }
}
