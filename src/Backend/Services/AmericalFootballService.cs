using System;
using System.Collections.Generic;
using System.Text;

namespace sports_betting.Services
{
    public class AmericanFootballService
    {
        public List<(string EventName, double Home, double Away)> GetEvents()
        {
            return new List<(string, double)>
            {
                ("Patriots vs Chiefs", 2.50, 1.55),
                ("Cowboys vs Eagles", 1.90, 1.90),
                ("Packers vs 49ers", 2.20, 1.70)
            };
        }
    }
}