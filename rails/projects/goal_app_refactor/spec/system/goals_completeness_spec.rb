require 'rails_helper'

RSpec.describe "Goal completeness tracking" do
  let!(:hello_world) { create(:user_hw) } # == FactoryBot.create
  let(:foo_bar) { create(:user_foo) }
  let!(:hw_goal) { create(:goal, author: hello_world) }

  before do
    driven_by(:rack_test)
    log_in_as(hello_world)
  end

  describe "goals start out uncompleted" do
    context "on the goal show page" do
      it "starts as not completed" do
        visit goal_url(hw_goal)
        expect(page).to have_content("Ongoing")
      end
    end

    context "on the goal index page" do
      it "starts as not completed" do
        visit goals_url
        expect(page).to have_content("Ongoing")
      end
    end

    context "on the user's profile page" do
      it "starts as not completed" do
        visit user_url(hello_world)
        expect(page).to have_content("Ongoing")
      end
    end
  end

  describe "marking a goal as completed" do
    context "on the goal show page" do
      it "allows user to change goal to completed" do
        visit goal_url(hw_goal)
        click_button "goal_#{hw_goal.id}_completed"
        expect(page).to have_content("Complete")
      end

      it "redirects to the same page after updating goal" do
        visit goal_url(hw_goal)
        click_button "goal_#{hw_goal.id}_completed"
        expect(page).to have_content("Goal:")
        expect(page).to have_content("Title:")
        expect(page).to have_content(hw_goal.title)
      end

      it "disallows editing completeness when it is not your goal" do
        click_button "Log Out"
        log_in_as(foo_bar)
        visit goal_url(hw_goal)
        expect(page).not_to have_button("Complete")
      end
    end

    context "on the goal index page" do
      it "allows user to change goal to completed" do
        visit goals_url
        click_button "goal_#{hw_goal.id}_completed"
        expect(page).to have_content("Complete")
      end

      it "redirects to the same page after updating goal" do
        visit goals_url
        click_button "goal_#{hw_goal.id}_completed"
        expect(page).to have_content("Your Goals")
      end
    end

    context "on the user's profile page" do
      it "allows user to change goal to completed" do
        visit user_url(hello_world)
        click_button "goal_#{hw_goal.id}_completed"
        expect(page).to have_content("Complete")
      end

      it "redirects to the same page after updating goal" do
        visit user_url(hello_world)
        click_button "goal_#{hw_goal.id}_completed"
        expect(page).to have_content("Complete")
        expect(page).to have_content("Hello_world's Profile")
        expect(page).to have_content("Hello_world's Goals:")
      end

      it "disallows editing completeness when it is not your goal" do
        click_button "Log Out"
        log_in_as(foo_bar)
        visit user_url(hello_world)
        expect(page).not_to have_button("Complete")
      end
    end
  end
end
