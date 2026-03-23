using System.Collections.Generic;
using System.Linq;
using sports_betting.Models;

namespace sports_betting.DataStructures
{
    public class BetHashTable
    {
        private List<Bet>[] buckets;

        public BetHashTable(int size = 50)
        {
            buckets = new List<Bet>[size];
            for (int i = 0; i < size; i++)
                buckets[i] = new List<Bet>();
        }

        private int Hash(int key)
        {
            return key % buckets.Length;
        }

        public void Insert(Bet bet)
        {
            int index = Hash(bet.BetID);
            buckets[index].Add(bet);
        }

        public Bet Search(int betID)
        {
            int index = Hash(betID);
            return buckets[index].FirstOrDefault(b => b.BetID == betID);
        }

        public bool Delete(int betID)
        {
            int index = Hash(betID);
            var bet = buckets[index].FirstOrDefault(b => b.BetID == betID);
            if (bet != null)
            {
                buckets[index].Remove(bet);
                return true;
            }
            return false;
        }

        public List<Bet> GetAll()
        {
            return buckets.SelectMany(b => b).ToList();
        }
    }
}