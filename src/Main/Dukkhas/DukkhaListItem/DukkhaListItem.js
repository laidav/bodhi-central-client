import React from 'react';

const DukkhaListItem = (props) => {
  return <div key={props.item.id}>{props.item.id}</div>
};

export default DukkhaListItem;