require 'rspec'
require_relative '../model_base'
require_relative '../question_follow'
require_relative '../reply'
require_relative '../question_like'

describe ModelBase do 
  
  before(:each) { QuestionsDatabase.reset! }
  after(:each) { QuestionsDatabase.reset! }
  
  describe '::find_by_id' do
    it 'correctly formats table names for multiple classes' do
      expect(QuestionFollow.table).to eq('question_follows')
      expect(QuestionLike.table).to eq('question_likes')
    end 
  end

  describe '::all' do 
    it 'returns an array of object items for a class' do
      all_users = User.all 
      expect(all_users).to all(be_an(User))
    end
     
    it 'returns all object items in the database' do
      all_questions = Question.all 
      expect(all_questions.count).to eq(3)
    end 
    
    context 'when called on different classes' do 
      it 'returns all replies' do 
        all_replies = Reply.all
        expect(all_replies).to all(be_an(Reply))
      end
      
      it 'returns all questions' do 
        all_questions = Question.all
        expect(all_questions).to all(be_an(Question))
      end
    end 
  end

  describe '::where' do
    it 'searches for table column based on method name' do
      search1 = User.where("fname" => "Ned")
      expect(search1.first).to be_an(User)
      expect(search1.first.fname).to eq("Ned")
    end

    context 'when called on different classes' do 
      it 'filters replies based on parameters' do
        search1 = Reply.where("body" => "Did you say NOW NOW NOW?")
        expect(search1.first).to be_an(Reply)
      end

      it 'filters questions based on paramters' do 
        search2 = Question.where("title" => "Ned Question")
        expect(search2.first).to be_an(Question)
      end
    end 
  end 

  describe '::find_by' do 
    it "searches for the first name of a user" do 
      search1 = User.find_by(fname: "Ned")
      expect(search1.first).to be_an(User)
      expect(search1.first.fname).to eq("Ned")
      expect(search1.count).to eq(1)
    end 
    
    it 'searches for the body of a reply' do
      reply = Reply.find_by(body: "Did you say NOW NOW NOW?")
      expect(reply.first).to be_an(Reply)
      expect(reply.first.body).to eq("Did you say NOW NOW NOW?")
    end 
    
    it 'searches for the title of a question' do   
      question = Question.find_by(title: "Ned Question")
      expect(question.first).to be_an(Question)
      expect(question.first.title).to eq("Ned Question")
    end 
  end 
  
  describe '#create' do 
    let(:user) {User.new(
      {'fname' => "test_fname", 
       'lname' => "test_lname"}
    )}
    let(:reply) {Reply.new(
      {'author_id' => 1, 
       'body' => "body",'question_id' => 1, 
       "parent_reply_id" => 1 }
    )}
    
    context 'when called on different classes' do 
      it 'creates a new user and persists it to the database' do 
        user.create
        expect(User.find_by_id(4)).to be_truthy 
      end
      
      it 'creates a new reply and persists it to the database' do 
        reply.save
        expect(Reply.find(3)).to be_truthy 
      end
    end 
  end 

  describe "#update" do 
    let(:user) {User.new(
      {'fname' => "test_fname", 
       'lname' => "test_lname"}
    )}
    let(:reply) {Reply.new(
      {'author_id' => 1, 
       'body' => "body",
       'question_id' => 1, 
       "parent_reply_id" => 1 }
    )}

    context 'when called on different classes' do 
      it "updates a previously saved user's attributes" do 
        user.save
        user.fname = "updated_fname"
        user.save
        expect(User.find_by_id(4).fname).to eq("updated_fname")
      end 
    
      it "updates a previously saved reply's attributes" do 
        reply.save
        reply.body = "updated_body"
        reply.save
        expect(Reply.find(3).body).to eq("updated_body")
      end 
    end 
  end
end 
