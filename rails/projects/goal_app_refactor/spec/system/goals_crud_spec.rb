require 'rails_helper'

RSpec.describe "CRUD of goals" do
  let!(:hello_world) { create(:user_hw) } # == FactoryBot.create

  before do
    driven_by(:rack_test)
    log_in_as(hello_world)
  end

  describe "creating goals" do
    it "should have a page for creating a new goal" do
      visit new_goal_url
      expect(page).to have_content "New Goal"
    end

    it "should show the new goal after creation" do
      submit_new_goal("have some toes")
      expect(page).to have_content "have some toes"
      expect(page).to have_content "Goal saved!"
    end
  end

  describe "reading goals" do
    it "should list goals" do
      build_three_goals(hello_world)
      visit goals_url
      verify_three_goals
    end
  end

  describe "updating goals" do
    let(:goal) { create(:goal, author: hello_world) } # == FactoryBot.create

    it "should have a page for updating an existing goal" do
      visit edit_goal_url(goal)
      expect(page).to have_content "Edit Goal"
      expect(find_field('Title').value).to eq(goal.title)
    end

    it "should show the updated goal after changes are saved" do
      visit edit_goal_url(goal)
      fill_in "Title", with: "visit the sun"
      click_button "Update Goal"
      expect(page).not_to have_content "Edit Goal"
      expect(page).to have_content "Goal updated!"
      expect(page).to have_content "visit the sun"
    end
  end

  describe "deleting goals" do
    it "should allow the deletion of a goal" do
      build_three_goals(hello_world)
      visit goals_url
      click_button "delete 'pickle a pepper' goal"
      expect(page).not_to have_content "pickle a pepper"
      expect(page).to have_content "Goal deleted!"
    end
  end
end
