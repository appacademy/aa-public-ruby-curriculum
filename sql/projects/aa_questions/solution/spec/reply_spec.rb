require 'rspec'
require_relative '../reply' 
require_relative '../questions_database' 

describe Reply do 
  
  before(:each) { QuestionsDatabase.reset! }
  after(:each) { QuestionsDatabase.reset! }
  
  describe '::find' do 
    subject(:reply) { described_class.find(1) }
    
    it 'returns an instance of the reply class' do
      expect(reply).to be_kind_of(described_class)
    end 
    
    it 'returns reply with the correct reply id' do 
      expect(reply.id).to eq(1)
    end 
    
    it 'only looks for the first row in the replies table' do 
      expect(QuestionsDatabase).to receive(:get_first_row).exactly(1).times.and_call_original
      described_class.find(1)
    end 
  end 
  
  describe '::find_by_parent_id' do
    subject(:replies) { described_class.find_by_parent_id(1) }
    
    it 'returns an array of reply objects' do 
      expect(replies).to all(be_an(described_class))
    end 
    
    it 'returns only replies with the correct parent_id' do 
      parent_ids = replies.map { |reply| reply.parent_reply_id }
      expect(parent_ids).to all(eq(1))
    end 
  end   
  
  describe '::find_by_question_id' do
    subject(:replies) { described_class.find_by_question_id(3) }
    
    it 'returns an array of reply objects' do 
      expect(replies).to all(be_an(described_class))
    end 
    
    it 'returns only replies with the correct question_id' do 
      question_ids = replies.map { |reply| reply.question_id }
      expect(question_ids).to all(eq(3))
    end   
  end 
    
  describe '::find_by_user_id' do
    subject(:replies) { described_class.find_by_user_id(2) }
    
    it 'returns an array of reply objects' do 
      expect(replies).to all(be_an(described_class))
    end  
    
    it 'returns only replies with the correct user_id' do 
      author_ids = replies.map { |reply| reply.author_id }
      expect(author_ids).to all(eq(2))
    end 
  end 
  
  describe '#author' do
    subject(:reply) { described_class.find(1) }
    let(:user) { class_double("User").as_stubbed_const }

    it 'calls User::find_by_id' do 
      expect(user).to receive(:find_by_id).with(1)
      reply.author
    end 
  end  
  
  describe '#child_replies' do
    subject(:reply) { described_class.find(2) }

    it 'calls Reply::find_by_author_id' do 
      expect(described_class).to receive(:find_by_parent_id).with(reply.id)
      reply.child_replies
    end 
  end 
  
  describe '#parent_reply' do
    subject(:reply) { described_class.find(2) }
    
    it 'calls Reply::find' do
      expect(described_class).to receive(:find).with(reply.parent_reply_id)
      reply.parent_reply 
    end 
  end 
  
  describe '#question' do 
    subject(:reply) { described_class.find(1) }
    let(:question) { class_double("Question").as_stubbed_const }
    
    it 'calls Question::find' do
      expect(question).to receive(:find).with(reply.question_id)
      reply.question
    end 
  end 
  
  describe '#save' do 
    let(:reply) { described_class.new(
      {'author_id' => 1, 
       'body' => "body",
       'question_id' => 1, 
       'parent_reply_id' => 1}
    )}
    
    it 'persists a new reply to the database' do 
      reply.save
      expect(described_class.find(3)).to be_truthy 
    end 
    
    it "persists an updated reply to the database" do 
      reply.save
      reply.body = "updated_body"
      reply.save
      expect(described_class.find(3).body).to eq("updated_body")
    end 
  end 
end 
