using sports_betting.Models;
using sports_betting.DataStructures;

namespace sports_betting.Services
{
    public class BetService
    {
        private BetHashTable table = new BetHashTable();

        public void AddBet(Bet bet)
        {
            table.Insert(bet);
        }

        public Bet SearchBet(int id)
        {
            return table.Search(id);
        }

        public bool DeleteBet(int id)
        {
            return table.Delete(id);
        }

        public List<Bet> GetAllBets()
        {
            return table.GetAll();
        }
    }
}