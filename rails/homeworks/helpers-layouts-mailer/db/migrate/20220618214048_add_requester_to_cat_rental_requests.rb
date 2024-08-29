class AddRequesterToCatRentalRequests < ActiveRecord::Migration[7.0]
  def change
    add_reference :cat_rental_requests, :requester, null: false, foreign_key: { to_table: :users }
  end
end
