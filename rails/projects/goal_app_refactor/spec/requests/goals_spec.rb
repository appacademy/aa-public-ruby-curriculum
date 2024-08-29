require 'rails_helper'

RSpec.describe "Goals", type: :request do
  let(:hello_world) { create(:user_hw) }

  describe 'GET /goals (#index)' do
    context 'when logged in' do
      before do
        log_in_as(hello_world)
      end
      
      it "displays the goals index" do
        build_three_goals(hello_world)
        get goals_url
        verify_three_goals
      end
    end

    context 'when logged out' do
      it 'redirects to the login page' do
        get goals_url
        expect(response).to redirect_to(new_user_url)
      end
    end
  end
  
  describe 'GET /goals/:id (#show)' do
    context 'when logged in' do
      before do
        log_in_as(hello_world)
      end

      it "shows the specified goal" do
        goal = create(:goal, title: "Goal 1", author: hello_world)
        get goal_url(goal)
        expect(response.body).to include("Goal 1")
      end
    end

    context 'when logged out' do
      it 'redirects to the login page' do
        get goals_url
        expect(response).to redirect_to(new_user_url)
      end
    end
  end

  describe 'GET /goals/new (#new)' do
    context 'when logged in' do
      before do
        log_in_as(hello_world)
      end

      it 'renders the new Goals page' do
        get new_goal_url
        expect(response.body).to include('New Goal')
      end
    end

    context 'when logged out' do
      it 'redirects to the login page' do
        get new_goal_url
        expect(response).to redirect_to(new_user_url)
      end
    end
  end

  describe 'POST /goals (#create)' do
    let(:hello_world) { create(:user_hw) }

    context 'when logged out' do
      it 'redirects to the login page' do
        post goals_url, params: { goal: {} }
        expect(response).to redirect_to(new_user_url)
      end
    end

    context 'when logged in' do
      before do
        log_in_as(hello_world)
      end

      context 'with invalid params' do
        it 'validates the presence of title' do
          post goals_url, params: { goal: { title: "" } }
          expect(response.body).to include('New Goal')
          expect(CGI.unescapeHTML(response.body)).to include("Title can't be blank")
        end
      end

      context 'with valid params' do
        it 'redirects to the goal show page' do
          post goals_url, params: { goal: { title: 'teehee', details: 'cats.com' } }
          expect(response).to redirect_to(goal_url(Goal.last))
        end
      end
    end
  end

  describe 'GET /goals/:id/edit (#edit)' do
    context 'when logged in' do
      before do
        log_in_as(hello_world)
      end

      it 'renders a goal\'s edit page' do
        goal = create(:goal, author: hello_world)
        get edit_goal_url(goal)
        expect(response.body).to include('Edit Goal')
        expect(response.body).to include(goal.title)
      end
    end

    context 'when logged out' do
      it 'redirects to the login page' do
        get goals_url
        expect(response).to redirect_to(new_user_url)
      end
    end
  end


  describe 'PATCH /goals/:id (#update)' do
    let(:goal) { create(:goal, author: hello_world) }
    
    context 'when logged in' do
      before do
        log_in_as(hello_world)
      end

      context 'with invalid params' do
        it 'stays on the edit page' do
          patch goal_url(goal), params: { goal: { title: "" } }
          expect(response.body).to include('Edit Goal')
        end
        
        it 'reports the error' do
          patch goal_url(goal), params: { goal: { title: "" } }
          expect(CGI.unescapeHTML(response.body)).to include("Title can't be blank")
        end
      end

      context 'with valid params' do
        it 'redirects to the goal show page' do
          patch goal_url(goal), params: { goal: { title: 'teehee', details: 'cats.com' } }
          expect(response).to redirect_to(goal_url(goal))
        end
      end
    end

    context 'when logged out' do
      it 'redirects to the login page' do
        patch goal_url(goal)
        expect(response).to redirect_to(new_user_url)
      end
    end
  end

  describe 'DELETE /goals/:id (#destroy)' do
    context 'when logged in' do
      let(:goal) { create(:goal, author: hello_world) } # == FactoryBot.create

      before do
        log_in_as(hello_world)
      end

      it "deletes the goal" do
        expect(Goal.find_by(id: goal.id)).to eq(goal)
        delete goal_url(goal)
        expect(Goal.find_by(id: goal.id)).to be_nil
      end

      it "redirects to the goal index" do
        delete goal_url(goal)
        expect(response).to redirect_to(goals_url)
      end
    end

    context 'when logged out' do
      let(:goal) { create(:goal, author: hello_world) }

      it 'redirects to the login page' do
        delete goal_url(goal)
        expect(response).to redirect_to(new_user_url)
      end
    end
  end
end  
