export const selectBench = ({ benches }, benchId) => {
  return benches[benchId] || { reviewIds: [] };
};

export const selectReviewsForBench = ({ benches, reviews }, bench) => {
  return bench.reviewIds.map(reviewId => reviews[reviewId]);
};
export const asArray = ({ benches }) => (
  Object.keys(benches).map(key => benches[key])
);
