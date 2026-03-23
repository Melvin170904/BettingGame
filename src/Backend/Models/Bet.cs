using System;
using System.Collections.Generic;
using System.Text;

namespace sports_betting.Models
{
    public class Bet
    {
        public int BetID { get; set; }
        public string Sport { get; set; }
        public string EventName { get; set; }
        public string Selection { get; set; }
        public double Odds { get; set; }
        public double Stake { get; set; }
        public double PotentialReturn { get; set; }
        public string Date { get; set; }

    }
}
