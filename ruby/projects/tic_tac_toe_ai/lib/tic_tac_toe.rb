# DON'T EDIT ME!

class Board
  attr_reader :rows

  def self.blank_grid
    Array.new(3) { Array.new(3) }
  end

  def initialize(rows = self.class.blank_grid)
    @rows = rows
  end

  def [](pos)
    # Note the assignment of `row, col` to `pos`; this unpacks,
    # or "destructures" the array. Read more here:
    # http://tony.pitluga.com/2011/08/08/destructuring-with-ruby.html

    row, col = pos
    @rows[row][col]
  end

  def []=(pos, mark)
    raise "mark already placed there!" unless empty?(pos)

    row, col = pos
    @rows[row][col] = mark
  end

  def open_positions
    open_positions = []

    @rows.each_with_index do |row, row_index|
      row.each_with_index do |col, col_index|
        open_positions.push([row_index, col_index]) unless col
      end
    end

    open_positions
  end

  def next_mark
    number_of_marks(:x) > number_of_marks(:o) ? :o : :x
  end

  def number_of_marks(symbol)
    rows.flatten.inject(0) do |count, spot|
      count += 1 if spot == symbol
      count
    end
  end

  def cols
    cols = [[], [], []]

    @rows.each do |row|
      row.each_with_index do |mark, col_idx|
        cols[col_idx] << mark
      end
    end

    cols
  end

  def diagonals
    down_diag = [[0, 0], [1, 1], [2, 2]]
    up_diag = [[0, 2], [1, 1], [2, 0]]

    [down_diag, up_diag].map do |diag|
      diag.map { |pos| self[pos] }
    end
  end

  def dup
    duped_rows = rows.map(&:dup)
    self.class.new(duped_rows)
  end

  def empty?(pos)
    self[pos].nil?
  end

  def tied?
    return false if won?

    # no empty space?
    @rows.all?(&:all?)
  end

  def over?
    # style guide says to use `or`, but I (and most others) prefer to
    # use `||` all the time. We don't like two ways to do something
    # this simple.
    won? || tied?
  end

  def winner
    (rows + cols + diagonals).each do |triple|
      return :x if triple == %i(x x x)
      return :o if triple == %i(o o o)
    end

    nil
  end

  def won?
    !winner.nil?
  end
end

# Notice how the Board has the basic rules of the game, but no logic
# for actually prompting the user for moves. This is a rigorous
# decomposition of the "game state" into its own pure object
# unconcerned with how moves are processed.

class TicTacToe
  class IllegalMoveError < RuntimeError
  end

  attr_reader :board, :players, :turn

  def initialize(player1, player2)
    @board = Board.new
    @players = { x: player1, o: player2 }
    @turn = @board.next_mark
  end

  def run
    until self.board.over?
      play_turn
    end

    if self.board.won?
      winning_player = self.players[self.board.winner]
      puts "#{winning_player.name} won the game!"
    else
      puts "No one wins!"
    end
  end

  def show
    # not very pretty printing!
    self.board.rows.each { |row| p row }
  end

  private

  def place_mark(pos, mark)
    if self.board.empty?(pos)
      self.board[pos] = mark
      true
    else
      false
    end
  end

  def play_turn
    loop do
      current_player = self.players[self.turn]
      pos = current_player.move(self, self.turn)

      break if place_mark(pos, self.turn)
    end

    # swap next whose turn it will be next
    @turn = self.board.next_mark
  end
end

class HumanPlayer
  attr_reader :name

  def initialize(name)
    @name = name
  end

  def move(game, _mark)
    game.show

    loop do
      puts "#{@name}: please select your space"

      row, col = gets.chomp.split(",").map do |coord|
        Integer(coord)
      end

      if HumanPlayer.valid_coord?(row, col)
        return [row, col]
      else
        puts "Invalid coordinate!"
      end
    end
  end

  def self.valid_coord?(row, col)
    [row, col].all? { |coord| (0..2).cover?(coord) }
  end
end

class ComputerPlayer
  attr_reader :name

  def initialize
    @name = "Tandy 400"
  end

  def move(game, mark)
    winner_move(game, mark) || random_move(game)
  end

  private

  def winner_move(game, mark)
    (0..2).each do |row|
      (0..2).each do |col|
        dup_board = game.board.dup
        pos = [row, col]

        next unless dup_board.empty?(pos)
        dup_board[pos] = mark

        return pos if dup_board.winner == mark
      end
    end

    # no winning move
    nil
  end

  def random_move(game)
    board = game.board

    loop do
      range = (0..2).to_a
      pos = [range.sample, range.sample]

      return pos if board.empty?(pos)
    end
  end
end

if $PROGRAM_NAME == __FILE__
  puts "Play the dumb computer!"
  hp = HumanPlayer.new("Ned")
  cp = ComputerPlayer.new

  TicTacToe.new(hp, cp).run
end