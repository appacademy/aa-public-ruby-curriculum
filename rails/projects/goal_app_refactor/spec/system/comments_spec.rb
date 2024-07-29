require 'rails_helper'

RSpec.describe "Commenting" do
  # The `config.include FactoryBot::Syntax::Methods` line in __rails_helper.rb__
  # means that you don't have to preface FactoryBot commands with `FactoryBot.`.
  # The code in this file includes `FactoryBot.` just to illustrate how it
  # would be done without that confguration line. (`FactoryBot.` still works,
  # even with the line!)
  let!(:hello_world) { FactoryBot.create(:user_hw) }
  let!(:foo_bar) { FactoryBot.create(:user, username: "foo_bar") }
  let!(:foo_goal) do
    FactoryBot.create(:goal, author: foo_bar)
  end

  before do
    driven_by(:rack_test)
    log_in_as(hello_world)
    visit user_url(foo_bar)
  end

  # shared_examples are another way to DRY out your specs
  # have some docs:
  # https://www.relishapp.com/rspec/rspec-core/docs/example-groups/shared-examples
  shared_examples "comment" do
    it "should have a form for adding a new comment" do
      expect(page).to have_content "New Comment"
      expect(page).to have_field "Comment"
    end

    it "should save the comment when a user submits one" do
      fill_in "Comment", with: "my magical comment!"
      click_on "Save Comment"
      expect(page).to have_content "my magical comment!"
    end
  end

  describe "user profile comment" do
    it_behaves_like "comment"
  end

  describe "goal comment" do
    before do
      click_on foo_goal.title
    end

    it_behaves_like "comment"
  end
end