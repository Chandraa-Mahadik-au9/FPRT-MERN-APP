import React from "react";
import { Link } from 'react-router-dom';

const Paginatn = ({ pages, page, isAdmin = false, keyword = "" }) => {
  return (
    pages > 1 && (
      <div>
        <nav aria-label='...'>
          <ul className='pagination pagination-lg mt-4'>
            {[...Array(pages).keys()].map((x) => (
              <Link
                key={x + 1}
                to={
                  (!isAdmin) ? keyword
                    ? `/search/${keyword}/page/${x + 1}`
                    : `/page/${x + 1}` : `/admin/productslist/${x + 1}`
                }
              >
                <li active={x + 1 === page} className='page-item page-link'>
                  {x + 1}
                </li>
              </Link>
            ))}
          </ul>
        </nav>
      </div>
    )
  );
};

export default Paginatn;
