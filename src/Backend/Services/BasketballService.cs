using System;
using System.Collections.Generic;
using System.Text;



namespace sports_betting.Services
{
    public class BasketballService
    {
        public List<(string EventName, double Team1, double Team2)> GetEvents()
        {
            return new List<(string, double, double)>
            {
                ("Lakers vs Warriors", 1.80, 2.10),
                ("Celtics vs Heat", 1.95, 1.95),
                ("Bulls vs Knicks", 2.20, 1.70)
            };
        }
    }
}