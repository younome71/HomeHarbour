import React from 'react';
import './list.scss';
import Card from '../card/Card';

function List({ posts, onDelete }) {
  return (
    <div className='list'>
      {posts.map(item => (
        <Card key={item.id} item={item} onDelete={onDelete} />
      ))}
    </div>
  );
}

export default List;
