require 'rspec'
require_relative '../question_like'
require_relative '../questions_database'

describe QuestionLike do 
  before(:each) { QuestionsDatabase.reset! }
  after(:each) { QuestionsDatabase.reset! }
  
  describe '::likers_for_question_id' do 
    it 'only hits the database once' do
     expect(QuestionsDatabase).to receive(:execute).exactly(1).times.and_call_original
     described_class.likers_for_question_id(1)
    end

    it 'returns an array of user objects' do
      users = described_class.likers_for_question_id(1)
      expect(users).to all(be_an(User))
    end

    it 'returns the correct likers for a question_id' do
      users = described_class.likers_for_question_id(2)
      liker_ids = users.map { |user| user.id }
      expect(liker_ids).to match_array([1])
    end 
  end

  describe '::num_likes_for_question_id' do 
    it 'only hits the database once' do
     expect(QuestionsDatabase).to receive(:get_first_value).exactly(1).times.and_call_original
     described_class.num_likes_for_question_id(1) 
    end

    it 'returns the correct number of likes for a question_id' do
      num = described_class.num_likes_for_question_id(1)
      expect(num).to eq(1)
    end 
  end

  describe '::liked_questions_for_user_id' do
    it 'only hits the database once' do
     expect(QuestionsDatabase).to receive(:execute).exactly(1).times.and_call_original
     described_class.liked_questions_for_user_id(1) 
    end

    it 'returns an array of question objects' do
      questions = described_class.liked_questions_for_user_id(2)
      expect(questions).to all(be_an(Question)) 
    end

    it 'returns the correct liked questions for a user_id' do 
      questions = described_class.liked_questions_for_user_id(1)
      question_ids = questions.map { |question| question.id }
      expect(question_ids).to match_array([1,2])
    end 
  end

  describe '::most_liked_questions' do 
    it 'only hits the database once' do
     expect(QuestionsDatabase).to receive(:execute).exactly(1).times.and_call_original
     described_class.most_liked_questions(1)  
    end

    it 'returns an array of question objects' do 
      questions = described_class.most_liked_questions(1)
      expect(questions).to all(be_an(Question))
    end

    it 'correctly returns the most liked questions' do 
      questions = described_class.most_liked_questions(2)
      question_ids = questions.map { |question| question.id }
      expect(question_ids).to match_array([1,2])
    end 
  end
end 
