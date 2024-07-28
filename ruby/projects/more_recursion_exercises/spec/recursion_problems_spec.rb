require 'recursion_problems'

describe "#recursive_sum" do
  it "returns 0 for an empty array" do
    expect(recursive_sum([])).to eq(0)
  end

  it "returns the sum of all numbers in array" do
    expect(recursive_sum([1, 3, 5, 7, 9, 2, 4, 6, 8])).to eq(45)
  end

  it "finds the correct result without modifying the original array" do
    original = [1, 3, 5, 7, 9, 2, 4, 6, 8]
    expect(recursive_sum(original)).to eq(45)
    expect(original).to eq([1, 3, 5, 7, 9, 2, 4, 6, 8])
  end

  it "finds the correct result recursively" do
    expect(self).to receive(:recursive_sum).at_least(:twice).and_call_original
    expect(recursive_sum([1, 3, 5, 7, 9, 2, 4, 6, 8])).to eq(45)
  end
end

describe "#reverse_string" do
  it "reverses strings of length <= 1" do
    expect(reverse_string("")).to eq("")
    expect(reverse_string("a")).to eq("a")
  end

  it "reverses longer strings" do
    expect(reverse_string("laozi")).to eq("izoal")
    expect(reverse_string("kongfuzi")).to eq("izufgnok")
  end

  it "finds the correct result without modifying the original string" do
    original = "fhqwhgads"
    expect(reverse_string(original)).to eq("sdaghwqhf")
    expect(original).to eq("fhqwhgads")
  end

  it "finds the correct result recursively" do
    expect(self).to receive(:reverse_string).at_least(:twice).and_call_original
    expect(reverse_string("fhqwhgads")).to eq("sdaghwqhf")
  end
end

describe "#sorted?" do
  before(:each) do
    expect_any_instance_of(Array).not_to receive(:sort)
    expect_any_instance_of(Array).not_to receive(:sort!)
    expect_any_instance_of(Array).not_to receive(:sort_by!)
  end

  it "correctly determines sorted status for empty arrays" do
    expect(sorted?([])).to be(true)
  end

  it "correctly determines sorted status for arrays with one element" do
    expect(sorted?([7])).to be(true)
  end

  it "correctly determines sorted status for larger sorted arrays" do
    expect(sorted?([1, 2, 13, 24, 25])).to be(true)
    expect(sorted?([9, 9, 9, 9, 9])).to be(true)
  end
  
  it "correctly determines sorted status for larger unsorted arrays" do
    expect(sorted?([9, 7, 6, 3, 4])).to be(false)
    expect(sorted?([9, 21, 27, 3, 34])).to be(false)
    expect(sorted?([1, 2, 3, 2])).to be(false)
  end

  it "finds the correct result without modifying the original array" do
    original = [1, 2, 13, 24, 25]
    expect(sorted?(original)).to be(true)
    expect(original).to eq([1, 2, 13, 24, 25])
  end

  it "finds the correct result recursively" do
    expect(self).to receive(:sorted?).at_least(:twice).and_call_original
    expect(sorted?([1, 2, 13, 24, 25])).to be(true)
  end
end

describe "#update_order_total" do
  let (:updates) {[
    { name: "MacBook Air", price: 999, status: "add" },
    { name: "Bluetooth headphones", price: 57, status: "remove" },
    { name: "Dongle", price: 29, status: "add" }
  ]}
  
  it "correctly totals according to `add` and `remove` statuses" do
    expect(update_order_total(1899, updates)).to eq(2870)
  end

  it "ignores any status other than `add` or `remove`" do
    updates2 = [
      { name: "Lettuce", price: 3.57, status: "add" },
      { name: "Avacado", price: 0.99, status: "remove" },
      { name: "Salmon", price: 15.99, status: nil }
    ]
    expect(update_order_total(85.67, updates2)).to eq(88.25)
  end

  it "finds the correct result without modifying the original array" do
    expect(update_order_total(1899, updates)).to eq(2870)
    expect(updates).to eq([
                            { name: "MacBook Air", price: 999, status: "add" },
                            { name: "Bluetooth headphones", price: 57, status: "remove" },
                            { name: "Dongle", price: 29, status: "add" }
                          ])
  end

  it "finds the correct result recursively" do
    expect(self).to receive(:update_order_total).at_least(:twice).and_call_original
    expect(update_order_total(1899, updates)).to eq(2870)
  end
end

describe "#recursive_solution" do
  let (:data) {[
    { name: "Johann", score: 0, isComplete: true},
    { name: "Vanessa", score: 50, isComplete: false},
    { name: "Ryder", score: 90, isComplete: true},
    { name: "Dwayne", score: 100, isComplete: true},
    { name: "Bekah", score: 0, isComplete: true}
  ]}

  it "returns the same results as `iterative_solution`" do
    expect(recursive_solution(data)).to eq({:complete=>["Johann", "Ryder", "Dwayne", "Bekah"], :incomplete=>["Vanessa"]})
  end

  it "finds the correct result without modifying the original array" do
    expect(recursive_solution(data)).to eq({:complete=>["Johann", "Ryder", "Dwayne", "Bekah"], :incomplete=>["Vanessa"]})
    expect(data).to eq([
                        { name: "Johann", score: 0, isComplete: true},
                        { name: "Vanessa", score: 50, isComplete: false},
                        { name: "Ryder", score: 90, isComplete: true},
                        { name: "Dwayne", score: 100, isComplete: true},
                        { name: "Bekah", score: 0, isComplete: true}
                      ])
  end

  it "finds the correct result recursively" do
    expect(self).to receive(:recursive_solution).at_least(:twice).and_call_original
    expect(recursive_solution(data)).to eq({:complete=>["Johann", "Ryder", "Dwayne", "Bekah"], :incomplete=>["Vanessa"]})
  end
end

describe "#palindrome?" do
  it "correctly determines palindrome status for strings of length <= 1" do
    expect(palindrome?("")).to be(true)
    expect(palindrome?("a")).to be(true)
  end

  it "correctly determines palindrome status for longer strings" do
    expect(palindrome?("abc")).to be(false)
    expect(palindrome?("abba")).to be(true)
    expect(palindrome?("racecar")).to be(true)
    expect(palindrome?("A man, a plan, a canal, Panama")).to be(true)
  end

  it "finds correct result without modifying the original string" do
    original = "racecar"
    expect(palindrome?(original)).to be(true)
    expect(original).to eq("racecar")
  end

  it "finds the correct result recursively" do
    expect(self).to receive(:palindrome?).at_least(:twice).and_call_original
    expect(palindrome?("racecar")).to be(true)
  end
end
