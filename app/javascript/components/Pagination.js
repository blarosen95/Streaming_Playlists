import React from "react";
import classnames from "classnames";
import {usePagination, ELLIPSIS} from "./usePagination";
import './pagination.scss';

const Pagination = props => {
    const {
        onPageChange,
        totalPages,
        siblingCount = 1,
        currentPage,
        paginateOn,
        className
    } = props;

    const paginationRange = usePagination({
        currentPage,
        totalPages,
        siblingCount,
        paginateOn
    });

    // Don't render component when less than 2 pages
    if (currentPage === 0 || paginationRange.length < 2) {
        return null;
    }

    const onNext = () => {
        onPageChange(currentPage + 1);
    };

    const onPrevious = () => {
        onPageChange(currentPage - 1);
    };

    let lastPage = paginationRange[paginationRange.length - 1];
    return (
        <ul className={classnames('pagination-container', {[className]: className})}>
            {/*Left Nav Arrow*/}
            <li className={classnames('pagination-item', {disabled: currentPage === 1})}
                onClick={onPrevious}>
                <div className="arrow left"/>
            </li>

            {paginationRange.map(pageNumber => {
                // If item is ELLIPSIS, render ellipsis unicode
                if (pageNumber === ELLIPSIS) {
                    return <li className="pagination-item ellipses">&#8230;</li>;
                }

                // Render Pills
                return (
                    <li
                        className={classnames('pagination-item', {selected: pageNumber === currentPage})}
                        onClick={() => onPageChange(pageNumber)}>
                        {pageNumber}
                    </li>
                );
            })}

            {/*Right Nav Arrow*/}
            <li className={classnames('pagination-item', {disabled: currentPage === lastPage})}
                onClick={onNext}>
                <div className="arrow right" />
            </li>
        </ul>
    );
};

export default Pagination;