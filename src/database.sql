-- Creates a new database to store all betting information.
CREATE DATABASE BettingDB;
GO

-- Switches to the new database so we can create tables inside it.
USE BettingDB;
GO

-- Creates the Bets table which stores every bet placed in the system.
-- Each column represents one piece of information about a bet.
CREATE TABLE Bets (
    BetID INT PRIMARY KEY,              -- Unique ID for each bet.
    Sport NVARCHAR(50) NOT NULL,        -- The sport (e.g., Football).
    EventName NVARCHAR(100) NOT NULL,   -- The match or race name.
    Selection NVARCHAR(100) NOT NULL,   -- What the user bet on.
    Odds FLOAT NOT NULL,                -- Odds for the selection.
    Stake FLOAT NOT NULL,               -- Amount of money placed.
    PotentialReturn FLOAT NOT NULL      -- Stake × Odds.
);
