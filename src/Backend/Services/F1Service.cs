using System;
using System.Collections.Generic;
using System.Text;


namespace sports_betting.Services
{
    public class F1Service
    {
        public List<(string EventName, double WinnerOdds)> GetEvents()
        {
            return new List<(string, double)>
            {
                ("Monaco Grand Prix - Verstappen", 1.60),
                ("Silverstone - Hamilton", 2.10),
                ("Italian GP - Leclerc", 2.80)
            };
        }
    }
}