module CheerSystemHelper
  def give_cheer_to(cheered_user)
    visit user_url(cheered_user)
    click_button "Cheer!"
  end

  def give_another_cheer
    next_user = create(:user) # == FactoryBot.create
    create(:goal, author: next_user)
    visit user_url(next_user)
    click_button "Cheer!"
  end
end
