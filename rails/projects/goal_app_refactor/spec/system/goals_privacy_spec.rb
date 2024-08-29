require 'rails_helper'

RSpec.describe "Goal privacy" do
  before do
    driven_by(:rack_test)
  end
  
  let!(:hello_world) { create(:user_hw) } # == FactoryBot.create
  let!(:foo_bar) { create(:user_foo) }

  describe "public goals" do
    let!(:hw_goal) { create(:goal, author: hello_world) } # == FactoryBot.create

    it "should create public goals by default" do
      log_in_as(hello_world)
      submit_new_goal("build a tesla coil")
      expect(page).to have_content "Public"
    end

    it "shows public goals when logged out" do
      visit user_url(hello_world)
      expect(page).to have_content hw_goal.title
    end

    it "allows other users to see public goals" do
      log_in_as(foo_bar)
      visit user_url(hello_world)
      expect(page).to have_content hw_goal.title
    end
  end

  describe "private goals" do
    let!(:hw_private_goal) { create(:private_goal, author: hello_world) } # == FactoryBot.create

    it "allows creating private goals" do
      log_in_as(hello_world)
      visit goal_url(hw_private_goal)
      expect(page).to have_content "Private"
    end

    it "hides private goals when logged out" do
      visit user_url(hello_world)
      expect(page).not_to have_content hw_private_goal.title
    end

    it "hides private goals from other users" do
      log_in_as(foo_bar)
      visit user_url(hello_world)
      expect(page).not_to have_content hw_private_goal.title
    end
  end
end
