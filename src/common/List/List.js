import React from 'react';

const List = ({ component: Component, uniqueKey, list }) => {
  const result = list.map((item) => {
    return <Component key={item[uniqueKey]} item={item} />
  });

  return (
    <div>
      { result }
    </div>
  )
};

export default List;