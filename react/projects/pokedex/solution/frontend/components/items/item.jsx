import React from "react";
import { Link } from "react-router-dom";

const Item = ({item}) => {
  return (
    <li>
      <Link to={`/pokemon/${item.pokemonId}/item/${item.id}`}>
      <img src={item.imageUrl} alt={item.name}/>
      </Link>
    </li>
  )
} 

export default Item;