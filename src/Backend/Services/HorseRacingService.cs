using System;
using System.Collections.Generic;
using System.Text;

namespace sports_betting.Services
{
    public class HorseRacingService
    {
        public List<(string RaceName, double Odds)> GetEvents()
        {
            return new List<(string, double)>
            {
                ("Royal Ascot - Thunderbolt", 3.20),
                ("Cheltenham - Night Runner", 4.50),
                ("Epsom Derby - Silver Arrow", 2.80)
            };
        }
    }
}
