import React from 'react';

const List = ({ component: Component, uniqueKey, list, className }) => {
  const result = list.map((data) => {
    return <Component key={ data[uniqueKey] } data={ data } />
  });

  return (
    <div className={ className }>
      { result }
    </div>
  )
};

export default List;