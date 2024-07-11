require 'rspec'
require_relative '../question' 
require_relative '../questions_database' 

describe Question do 
  before(:each) { QuestionsDatabase.reset! }
  after(:each) { QuestionsDatabase.reset! }
  
  describe '::find' do 
    it 'returns an instance of the question class' do 
      question = described_class.find(1)
      expect(question).to be_kind_of(described_class)
    end 
    
    it 'returns the question with the correct id' do
      question = described_class.find(1)
      expect(question.id).to eq(1)
    end 
    
    it 'only looks for the first row in the questions table' do 
      expect(QuestionsDatabase).to receive(:get_first_row).exactly(1).times.and_call_original
      described_class.find(1)
    end 
  end
  
  describe '::find_by_author_id' do 
    subject(:author_questions) { described_class.find_by_author_id(2) }
      
    it 'returns an array of question objects' do 
      expect(author_questions).to all( be_an(described_class) )
    end
    
    it "returns only questions with the correct author id's" do 
      author_ids = author_questions.map { |question| question.author_id }
      expect(author_ids).to all( eq(2) )
    end 
  end 
  
  describe '::most_followed' do 
    let(:questionfollow) { class_double("QuestionFollow").as_stubbed_const }
    
    it 'calls QuestionFollow::most_followed_questions'  do
      expect(questionfollow).to receive(:most_followed_questions).with(1)
      described_class.most_followed(1)
    end 
  end 
  
  describe '::most_liked' do 
    let(:questionlike) { class_double("QuestionLike").as_stubbed_const }
    
    it 'calls QuestionLike::most_liked_questions' do 
      expect(questionlike).to receive(:most_liked_questions).with(1)
      described_class.most_liked(1)
    end 
  end 
 
  describe '#save' do 
    let(:question) { described_class.new(
      {'title' => "test_title", 
       'body' => "test_body", 
       'author_id' => 1}
    )}
    
    it 'persists a new question to the database' do 
      question.save
      expect(described_class.find(4)).to_not be_nil
    end 
    
    it "persists an updated question to the database" do 
      question.save
      question.title = "updated_title"
      question.save
      expect(described_class.find(4).title).to eq("updated_title")
    end 
  end  
 
  describe '#author' do 
    subject(:question) {described_class.find(1)}
    let(:user) { class_double("User").as_stubbed_const }

    it 'calls QuestionFollow::followers_for_question_id' do 
      expect(user).to receive(:find_by_id).with(1)
      question.author
    end 
  end
  
  describe '#followers' do 
    subject(:question) { described_class.find(3) }
    let(:questionfollow) { class_double("QuestionFollow").as_stubbed_const }
    
    it 'calls QuestionFollow::followers_for_question_id' do 
      expect(questionfollow).to receive(:followers_for_question_id).with(3)
      question.followers
    end
  end 
 
  describe '#num_likes' do 
    subject(:question) { described_class.find(1) }
    let(:questionlike) { class_double("QuestionLike").as_stubbed_const }
    
    it 'calls QuestionLike::num_likes_for_question_id' do 
      expect(questionlike).to receive(:num_likes_for_question_id).with(1)
      question.num_likes
    end 
  end 

  describe '#replies' do 
    subject(:question) { described_class.find(3) }
    let (:reply) { class_double("Reply").as_stubbed_const } 

    it 'calls Reply::find_by_question_id' do 
      expect(reply).to receive(:find_by_question_id).with(3)
      question.replies
    end
  end
end
