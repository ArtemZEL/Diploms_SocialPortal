import NewsItems from './NewsItems.js';
import React from 'react';

function NewsGrid({ items }) {
  return (
    <div className='news-grid'>
        {items.map((item, i) => (
            <NewsItems key={i} item={item} /> // Замените items на item
        ))}
    </div>
  );
}

export default NewsGrid;
