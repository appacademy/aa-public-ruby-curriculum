import React from 'react';
import { Link } from 'react-router';

import ReviewListItemContainer from './review_list_item_container';

const reviewList = (reviews) => (
  reviews.map(review => (
    <ReviewListItemContainer
      review={review}
      key={review.id}
    />
  ))
);

const BenchDetail = ({ bench, reviews }) => {
  return (
    <div>
      <ul className="bench-list">
        <img className="index-image" src={bench.picture_url}/>
        <li>Rating: {bench.average_rating || 'No reviews yet'}</li>
        <li>Description: {bench.description}</li>
        <li>Seats: {bench.seating}</li>
        <li>Latitude: {bench.lat}</li>
        <li>Longitude: {bench.lng}</li>
      </ul>
      <br/>
      <div className="reviews">
        <h3>Reviews</h3>
        {reviewList(reviews)}
      </div>
    </div>
  );
};

export default BenchDetail;
