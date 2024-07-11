Bench.delete_all
User.delete_all
Favorite.destroy_all
Review.destroy_all


b1 = Bench.create!(
  description: 'alamo square, many dogs',
  seating: 4,
  lat: 37.775769,
  lng: -122.434960,
  picture_url: 'https://c2.staticflickr.com/4/3035/2309664044_486f5a0327_z.jpg?zz=1'
)

b2 = Bench.create!(
  description: 'UN plaza, food truck access',
  seating: 2,
  lat: 37.779760,
  lng: -122.413820,
  picture_url: 'http://www.concretedecor.net/CD/assets/Image/archives/CD1405/1405i_Page_32_Image_0001_600.jpg'
)

Bench.create!(
  description: 'Ocean Beach, gnarly breh',
  seating: 3,
  lat: 37.769996,
  lng: -122.511281,
  picture_url: 'http://marmaladeandmileposts.com/wp-content/uploads/2012/05/2012-4-16-San-Francisco-Road-Trip-San-Francisco-1301.jpg'
)

u1 = User.create!(
  username: 'guest',
  password: 'password'
)

u2 = User.create!(
  username: 'username',
  password: 'password'
)


Favorite.create(user_id: u1.id, bench_id:  b1.id)
Favorite.create(user_id: u2.id, bench_id:  b2.id)

Review.create(author_id: u1.id, bench_id:  b1.id, body: "very good sits", rating: 5)
Review.create(author_id: u2.id, bench_id:  b2.id, body: "its okay sit", rating: 3)