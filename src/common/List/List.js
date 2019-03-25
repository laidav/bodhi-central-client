import React from 'react';

const List = ({ component: Component, uniqueKey, list, listItemProps, ...props }) => {
  const result = list.map((data) => {
    return <Component key={ data[uniqueKey] } data={ data } listItemProps={ listItemProps }/>
  });

  return (
    <div { ...props  }>
      { result }
    </div>
  )
};

export default List;