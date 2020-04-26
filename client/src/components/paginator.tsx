import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';

import SearchParams from '~/context/search-params';


const range = (start, end) => {
  const nums = [start];
  if (start < end) {
    for (let i = start + 1; i <= end; i++) { nums.push(i); }
  } else if (start > end) {
    for (let i = start - 1; i >= end; i--) { nums.push(i); }
  }
  return nums;
};

interface IPaginator {
  limit?: number,
  offset?: number,
  count?: number,
  pageSpread?: number,
}

const Paginator: React.SFC<IPaginator> = ({ count, limit, offset, pageSpread = 3 }) => {
  const { setParams, unsetParam } = useContext(SearchParams);
  const buttonClass = 'btn btn-primary mx-1';

  const goToFirst = () => {
    if (offset >= limit) { unsetParam('offset'); }
  };

  const goToLast = () => {
    if (offset + limit < count) { setParams({ offset: Math.floor(count / limit) * limit }); }
  };

  const goToNext = () => {
    if (offset + limit < count) { setParams({ offset: offset + limit }); }
  };

  const goToPrev = () => {
    if (offset >= limit && offset - limit > 0) { setParams({ offset: offset - limit }); }
    if (offset >= limit && offset - limit === 0) { unsetParam('offset'); }
  };

  const goToPage = (pageOffset) => {
    if (pageOffset < count && pageOffset > 0) { setParams({ offset: pageOffset }); }
    if (pageOffset < count && pageOffset === 0) { unsetParam('offset'); }
  };

  const nextButtons = range(1, pageSpread)
    .map((inc) => offset + inc * limit)
    .filter((calculatedOffset) => calculatedOffset < count - limit)
    .map((validOffset) => (
      <button
        className={buttonClass}
        onClick={() => goToPage(validOffset)}
        key={`paginator-next-${validOffset}`}
      >
        {Math.floor(validOffset / limit) + 1}
      </button>
    ));

  const prevButtons = range(pageSpread, 1)
    .map((inc) => offset - inc * limit)
    .filter((calculatedOffset) => calculatedOffset >= limit)
    .map((validOffset) => (
      <button
        className={buttonClass}
        onClick={() => goToPage(validOffset)}
        key={`paginator-prev-${validOffset}`}
      >
        {Math.floor(validOffset / limit) + 1}
      </button>
    ));

  const nextEllipsis = (offset + limit * pageSpread < count - limit * 2 && '...');
  const prevEllipsis = (offset - limit * pageSpread > limit && '...');

  const currentPageButton = ((offset >= limit) && (offset < count - limit) &&
    <button className={buttonClass} disabled>{offset / limit + 1}</button>
  );

  return (
    <div className="paginator">
      <button className={buttonClass} onClick={goToPrev} disabled={offset < limit}>prev</button>
      <button className={buttonClass} onClick={goToFirst} disabled={offset < limit}>
        1
      </button>
      {prevEllipsis}
      {prevButtons}
      {currentPageButton}
      {nextButtons}
      {nextEllipsis}
      <button className={buttonClass} onClick={goToLast} disabled={offset + limit > count}>
        {Math.floor(count / limit) + 1}
      </button>
      <button className={buttonClass} onClick={goToNext} disabled={offset + limit > count}>next</button>
    </div>
  );
};

export default Paginator;
