# Poker

Today you will be using TDD to write a poker game, specifically [five card
draw][five-card-draw].

## Learning goals

By the end of this practice, you should be able to

- Define desired functionality, write specs, and then implement
- Follow the **red, green, refactor** TDD workflow
- Create and use test doubles
- Use `context` and `describe` appropriately

You'll want to use [betterspecs][betterspecs] as a cheatsheet/reference. You'll
also want to refer to the Test doubles reading for help creating unit tests.

## Rules

- Each player is dealt five cards.
- Players bet; each player may 1) fold, 2) see the current bet, or 3) raise.
- In turn, each player can choose to discard up to three cards.
  - They are dealt new cards from the deck to replace their old cards.
- Players bet again.
- If no players fold, then players reveal their hands; [strongest
  hand][poker-hands] wins the pot.

[five-card-draw]: http://en.wikipedia.org/wiki/Five-card_draw
[betterspecs]: http://betterspecs.org
[poker-hands]: http://en.wikipedia.org/wiki/List_of_poker_hands

## Design

Implement the following classes using the **red, green, refactor** TDD workflow:

- Card
- Deck
  - **Request an Instructor code review**
- Hand
  - The logic of calculating pair, three-of-a-kind, two-pair, etc. goes here.
  - Logic of which hand beats which would go here.
- Player
  - Each player has a hand, plus a pot
  - Player has methods to ask the user:
    - Which cards they wish to discard
    - Whether they wish to fold, see, or raise.
- Game
  - Holds the deck
  - Keeps track of whose turn it is
  - Keeps track of the amount in the pot.