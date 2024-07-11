require 'rspec'
require_relative '../tag' 
require_relative '../questions_database' 


describe Tag do 

  before(:each) { QuestionsDatabase.reset! }
  after(:each) { QuestionsDatabase.reset! }
  
  describe '::most_popular' do 
    it 'returns an array of instances of the tag class' do 
      tags = described_class.most_popular(2)
      expect(tags).to all(be_an(described_class))
    end 
    
    it 'only hits the database once' do 
      expect(QuestionsDatabase).to receive(:execute).exactly(1).times.and_call_original
      described_class.most_popular(1)
    end 
  end
end 
