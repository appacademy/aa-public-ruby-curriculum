
require 'rspec'
require 'query_tuning_problems'

describe "Query Tuning Problems" do

  describe "cats_and_toys_alike" do
    it "Finds all the cat names and toy names where the cat and toy are the same color" do
      expect(cats_and_toys_alike).to eq([
        ["Abby"], 
        ["Artie"], 
        ["Bryant"], 
        ["Carina"], 
        ["Carlton"], 
        ["Carrol"], 
        ["Christopher"], 
        ["Coretta"], 
        ["Danyell"], 
        ["Dawna"], 
        ["Elke"], 
        ["Franklin"], 
        ["Gavin"], 
        ["Georgia"], 
        ["Huey"], 
        ["Ivelisse"], 
        ["Jame"], 
        ["Johnathan"], 
        ["Juliann"], 
        ["Kenia"], 
        ["Lakita"], 
        ["Larry"], 
        ["Lazaro"], 
        ["Lewis"], 
        ["Louann"], 
        ["Lucia"], 
        ["Marlen"], 
        ["Marquerite"], 
        ["Merissa"], 
        ["Nicholas"], 
        ["Norman"], 
        ["Odell"], 
        ["Pattie"], 
        ["Petrina"], 
        ["Ramon"], 
        ["Ranae"], 
        ["Raymond"], 
        ["Reanna"], 
        ["Rodney"], 
        ["Samual"], 
        ["Shizue"], 
        ["Terese"], 
        ["Travis"], 
        ["Vern"], 
        ["Vito"], 
        ["Will"]
    ])
    end
  end

  describe "toyless_blue_cats" do
    it "lists the cats names with no toys" do
      expect(toyless_blue_cats).to eq([
        ["Darnell"]
    ])
    end
  end

  describe "find_unknown" do
    it "Find all the toys that belong to the cat who's breed is Unknown" do
      expect(find_unknown).to eq([
        ["Alien"],
        ["Fire"],
        ["Grinning"],
        ["Information desk person"],
        ["Lips"]
    ])
    end
  end

  describe "cats_like_johnson" do
    it "Find all the cats with the same breed as Johnson the Lavendar cat" do
      expect(cats_like_johnson).to eq([
        ["Adan"],
        ["Alex"],
        ["Alfonzo"],
        ["Alona"],
        ["Angele"],
        ["Arturo"],
        ["Asa"],
        ["Brice"],
        ["Carlton"],
        ["Carmelina"],
        ["Cecila"],
        ["Chadwick"],
        ["Clora"],
        ["Concetta"],
        ["Connie"],
        ["Conrad"],
        ["Daniela"],
        ["Darell"],
        ["Darell"],
        ["Darline"],
        ["Denny"],
        ["Detra"],
        ["Dewitt"],
        ["Dominique"],
        ["Donnell"],
        ["Donte"],
        ["Edgar"],
        ["Elke"],
        ["Elliot"],
        ["Elroy"],
        ["Eric"],
        ["Everette"],
        ["Fausto"],
        ["Felix"],
        ["Fredericka"],
        ["Gavin"],
        ["Gayle"],
        ["Gerald"],
        ["Glen"],
        ["Griselda"],
        ["Guillermo"],
        ["Hannah"],
        ["Herbert"],
        ["Hong"],
        ["Hugh"],
        ["Jackie"],
        ["Jae"],
        ["Jamar"],
        ["Jamey"],
        ["Jamie"],
        ["Jarred"],
        ["Jerrod"],
        ["Johnson"],
        ["Jonathan"],
        ["Jonathon"],
        ["Josh"],
        ["Katy"],
        ["Kim"],
        ["King"],
        ["Kristofer"],
        ["Laila"],
        ["Lanell"],
        ["Laura"],
        ["Leslie"],
        ["Leslie"],
        ["Lorina"],
        ["Loyd"],
        ["Lucas"],
        ["Many"],
        ["Marcela"],
        ["Mariann"],
        ["Mary"],
        ["Mauricio"],
        ["Meaghan"],
        ["Miesha"],
        ["Miquel"],
        ["Myron"],
        ["Norberto"],
        ["Olive"],
        ["Omar"],
        ["Parthenia"],
        ["Phoebe"],
        ["Prince"],
        ["Quinton"],
        ["Regine"],
        ["Reid"],
        ["Reiko"],
        ["Rey"],
        ["Riley"],
        ["Roberto"],
        ["Roland"],
        ["Romeo"],
        ["Ronny"],
        ["Roxana"],
        ["Rudolf"],
        ["Rupert"],
        ["Sage"],
        ["Shameka"],
        ["Shanice"],
        ["Shaunna"],
        ["Steven"],
        ["Sung"],
        ["Sunni"],
        ["Tonisha"],
        ["Trinidad"],
        ["Virginia"],
        ["Vito"],
        ["Wilber"],
        ["Willard"],
        ["William"],
        ["Wynell"],
        ["Xavier"]
    ])
    end
  end

  describe "cheap_toys_and_their_cats" do
    it "Finds the cheapest toys and all the cats that own that toy." do
      expect(cheap_toys_and_their_cats).to eq([
        ["Henry"],
        ["Johnie"],
        ["Johnie"],
        ["Marian"],
        ["Mayola"],
        ["Season"],
        ["Shirley"],
        ["Tad"],
    ])
    end
  end

  describe "cats_with_a_lot_sub" do
    it "Finds the names of all cats with more than 7 toys" do
      expect(cats_with_a_lot).to eq([
        ["Beatrice"],
        ["Calvin"],
        ["Chad"],
        ["Edmundo"],
        ["Forrest"],
        ["Garth"],
        ["Glendora"],
        ["Horace"],
        ["Jess"],
        ["Jet"],
        ["Junie"],
        ["Kiersten"],
        ["Latanya"],
        ["Lou"],
        ["Man"],
        ["Marcos"],
        ["Merissa"],
        ["Millicent"],
        ["Morgan"],
        ["Olevia"],
        ["Oralee"],
        ["Ozzie"],
        ["Pedro"],
        ["Peg"],
        ["Rene"],
        ["Roberto"],
        ["Shelton"],
        ["Shon"],
        ["Theo"],
        ["Valentin"],
        ["Vinita"]
      ])
    end
  end

  describe "expensive_tastes" do
    it "Find the name and color, of the most expensive toy and the owner of that toy." do
      expect(expensive_tastes).to eq([
        ["Cassidy", "Tiger", "Orchid"],
        ["Celinda", "Tiger", "Orchid"],
        ["Faustino", "Tiger", "Orchid"],
        ["Marco", "Tiger", "Orchid"]
    ])
    end
  end

  describe "five_cheap_toys" do
    it "Find the name and prices for the 5 cheapest toys" do
      expect(five_cheap_toys).to eq([
        ["Clap", "2"],
        ["Shiny Mouse", "5"],
        ["Sleepy", "3"],
        ["String", "1"],
        ["Unamused", "4"]
    ])
    end
  end
  describe "top_cat" do
    it "Finds the name of the single cat who has the most toys and the number of toys" do
      expect(top_cat).to eq([
        ["Jet", "31"]
    ])
    end
  end
end
