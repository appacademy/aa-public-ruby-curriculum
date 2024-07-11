import * as APIUtil from '../util/api_util';

export const RECEIVE_SEARCH_GIPHYS = 'RECEIVE_SEARCH_GIPHYS';
export const REQUEST_SEARCH_GIPHYS = 'REQUEST_SEARCH_GIPHYS';

export const fetchSearchGiphys = searchTerm => dispatch => {
	return APIUtil.fetchSearchGiphys(searchTerm)
		.then(giphys => dispatch(receiveSearchGiphys(giphys.data)))
};

export const receiveSearchGiphys = giphys => {
	return {
		type: RECEIVE_SEARCH_GIPHYS,
		giphys
	}
};
