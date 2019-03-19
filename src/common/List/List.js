import React from 'react';

const List = ({ component: Component, uniqueKey, list, className }) => {
  const result = list.map((item) => {
    return <Component key={item[uniqueKey]} item={item} />
  });

  return (
    <div className={className}>
      { result }
    </div>
  )
};

export default List;