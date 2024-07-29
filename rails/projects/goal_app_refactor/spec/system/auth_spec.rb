require 'rails_helper'

RSpec.describe "Auth", type: :system do
  before do
    driven_by(:rack_test)
  end

  describe "the signup process" do
    it "has a new user page" do
      visit new_user_url
      expect(page).to have_content "Sign Up!"
    end

    it "shows username on the homepage after signup" do
      sign_up_as('hello_world')
      expect(page).to have_content "Welcome hello_world"
    end
  end

  describe "logging in" do
    let(:hello_world) { create(:user_hw) } # == FactoryBot.create

    it "shows username on the homepage after login" do
      log_in_as(hello_world)
      expect(page).to have_content "Welcome hello_world"
    end
  end

  describe "logging out" do
    let!(:hello_world) { create(:user_hw) } # == FactoryBot.create

    it "begins with logged out state" do
      visit root_url
      expect(page).to have_content "Log In"
    end

    it "doesn't show username on the homepage after logout" do
      log_in_as(hello_world)
      click_button "Log Out"
      expect(page).not_to have_content "hello_world"
    end
  end
end
