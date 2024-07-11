require 'rspec'
require_relative '../question_follow'
require_relative '../questions_database.rb'

describe QuestionFollow do 
  
  before(:each) { QuestionsDatabase.reset! }
  after(:each) { QuestionsDatabase.reset! }
  
  describe '::followers_for_question_id' do 
    it 'only hits the database once' do
      expect(QuestionsDatabase).to receive(:execute).exactly(1).times.and_call_original
      described_class.followers_for_question_id(1) 
    end

    it 'returns an array of user objects' do 
      users = described_class.followers_for_question_id(1)
      expect(users).to all(be_an(User))
    end

    it 'returns the correct followers for a question_id' do
      users = described_class.followers_for_question_id(3)
      follower_ids = users.map { |user| user.id }
      expect(follower_ids).to match_array([1,2])
    end
  end

  describe '::followed_questions_for_user_id' do 
    it 'only hits the database once' do
      expect(QuestionsDatabase).to receive(:execute).exactly(1).times.and_call_original
      described_class.followed_questions_for_user_id(1)  
    end

    it 'returns an array of question objects' do 
      questions = described_class.followed_questions_for_user_id(1)
      expect(questions).to all(be_an(Question))
   end

    it 'returns the correct questions for a user_id' do 
      questions = described_class.followed_questions_for_user_id(1)
      question_ids = questions.map { |question| question.id }
      expect(question_ids).to match_array([3])
    end 
  end

  describe '::most_followed_questions' do
    it 'only hits the database once' do 
      expect(QuestionsDatabase).to receive(:execute).exactly(1).times.and_call_original 
      described_class.most_followed_questions(1)  
    end

    it 'returns an array of question objects' do 
      questions = described_class.most_followed_questions(1)
      expect(questions).to all(be_an(Question))
    end

    it 'returns the most followed questions' do 
      questions = described_class.most_followed_questions(2)
      question_ids = questions.map { |question| question.id }
      expect(question_ids).to match_array([3])
    end 
 
  end
end 
