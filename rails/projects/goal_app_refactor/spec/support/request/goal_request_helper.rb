module GoalRequestHelper
  def build_three_goals(user)
    create(:goal, title: "pickle a pepper", author: user) # == FactoryBot.create
    create(:goal, title: "get octocat autograph", author: user)
    create(:goal, title: "bake a cake", author: user)
  end

  def verify_three_goals
      expect(response.body).to include("pickle a pepper")
      expect(response.body).to include("get octocat autograph")
      expect(response.body).to include("bake a cake")
  end
end
