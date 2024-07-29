class UserMailer < ApplicationMailer
  def activation_email(user)
    @user = user
    mail(to: user.email, subject: "Welcome to Music App! Please activate your account.")
  end
end
