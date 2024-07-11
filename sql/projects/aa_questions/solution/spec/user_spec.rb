require 'rspec'
require_relative '../user' 
require_relative '../questions_database' 

describe User do

  before(:each) { QuestionsDatabase.reset! }
  after(:each) { QuestionsDatabase.reset! }
  
  describe '::find_by_id' do 
    it 'returns an instance of the user class' do
      reply = described_class.find_by_id(1)
      expect(reply).to be_kind_of(described_class)
    end 
    
    it 'returns a user with the correct id' do 
      reply = described_class.find_by_id(1)
      expect(reply.id).to eq(1)
    end 
    
    it 'only looks for the first row in the users table' do 
      expect(QuestionsDatabase).to receive(:get_first_row).exactly(1).times.and_call_original
      described_class.find_by_id(1)
    end 
  end
  
  describe '::find_by_name' do
    it 'returns an instance of the user class' do
      reply = described_class.find_by_name("Kush", "Patel")
      expect(reply).to be_kind_of(described_class)
    end 
    
    it 'returns the correct fname and lname' do 
      reply = described_class.find_by_name("Ned", "Ruggeri")
      expect(reply.fname).to eq("Ned")
      expect(reply.lname).to eq("Ruggeri")
    end
  end 
 
  describe '#save' do 
    let(:user) {described_class.new( {'fname' => "test_fname", 'lname' => "test_lname"}) }
    
    it 'persists a new user to the database' do 
      user.save
      expect(described_class.find_by_id(4)).to be_truthy 
    end 
    
    it "persists an updated user to the database" do 
      user.save
      user.fname = "updated_fname"
      user.save
      expect(described_class.find_by_id(4).fname).to eq("updated_fname")
    end 
  end 
 
  describe '#authored_questions' do 
    subject(:user) { described_class.find_by_id(1) }
    let(:question) { class_double("Question").as_stubbed_const }
    
    it 'calls Question::find_by_author_id' do
      expect(question).to receive(:find_by_author_id).with(user.id)
      user.authored_questions 
    end 
  end 
 
  describe '#followed_questions' do 
    subject(:user) { described_class.find_by_id(1) }
    let(:questionfollow) { class_double("QuestionFollow").as_stubbed_const }
    
    it 'calls QuestionFollow::followed_questions_for_user_id' do 
      expect(questionfollow).to receive(:followed_questions_for_user_id).with(user.id)
      user.followed_questions
    end 
  end
 
  describe '#authored_replies' do 
    subject(:user) { described_class.find_by_id(1) }
    let(:reply) { class_double("Reply").as_stubbed_const }

    it 'calls Reply::find_by_user_id' do 
      expect(reply).to receive(:find_by_user_id).with(1)
      user.authored_replies
    end 
  end

  describe '#liked_questions' do 
    subject(:user) { described_class.find_by_id(1) }
    let(:questionlike) { class_double("QuestionLike").as_stubbed_const }

    it 'calls QuestionLike::liked_questions_for_user_id' do 
      expect(questionlike).to receive(:liked_questions_for_user_id).with(user.id)
      user.liked_questions
    end
  end

  describe "#average_karma" do 
    it 'returns the correct average karma for a user' do 
      user = described_class.find_by_id(1)
      expect(user.average_karma).to eq(1.0)
    end

    it 'only hits the database once' do 
      user = described_class.find_by_id(2)
      expect(QuestionsDatabase).to receive(:get_first_value).exactly(1).times.and_call_original
      user.average_karma
    end 
  end 
end
