module AuthSystemHelper
  def log_in_as(user)
    visit new_session_url
    fill_in "Username", with: user.username
    fill_in "Password", with: "password"
    click_button "Log In"
  end

  def sign_up_as(username)
    visit new_user_url
    fill_in "Username", with: username
    fill_in "Password", with: "password"
    click_button "Sign Up"
  end
end
