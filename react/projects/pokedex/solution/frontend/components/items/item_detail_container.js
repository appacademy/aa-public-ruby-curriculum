import { connect } from "react-redux";
import ItemDetail from './item_detail';

const mapStateToProps = (state, ownProps) => {
  return{
    item: state.entities.items[ownProps.match.params.itemId]
  }
}

export default connect(mapStateToProps)(ItemDetail)