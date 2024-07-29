require 'rails_helper'

RSpec.describe "Users", type: :request do
  subject(:user) do
    User.create!(
      username: "jill_bruce",
      password: "password"
    )
  end

  describe "GET /users (#index)" do
    it "renders the index template" do
      get users_url
      expect(response.body).to include("Users")
    end
  end

  describe "GET /users/:id (#show)" do
    it "renders the show template" do
      get user_url(user)
      expect(response.body).to include("Jill_bruce")
    end
  end
  
  describe "GET /users/new (#new)" do
    it "renders the new template" do
      get new_user_url
      expect(response.body).to include("Sign Up!")
    end
  end

  describe "POST /users (#create)" do
    context "with invalid params" do
      it "validates the presence of the user's username" do
        post users_url, params: {
          user: {
            username: "",
            password: "password"
          }
        }
        expect(response.body).to include("Sign Up!")
        expect(CGI.unescapeHTML(response.body)).to include("Username can't be blank")
      end
      
      it "validates the presence of the user's password" do
        post users_url, params: {
          user: {
            username: "jill_bruce",
            password: ""
          }
        }
        expect(response.body).to include("Sign Up!")
        expect(response.body).to include("Password is too short")
      end

      it "validates that the password is at least 6 characters long" do
        post users_url, params: {
          user: {
            username: "jill_bruce",
            password: "short"
          }
        }
        expect(response.body).to include("Sign Up!")
        expect(response.body).to include("Password is too short")
      end
    end

    context "with valid params" do
      it "redirects user to user's show page on success" do
        post users_url, params: {
          user: {
            username: "jill_bruce",
            password: "password"
          }
        }
        expect(response).to redirect_to(user_url(User.last))
      end
    end
  end
end
