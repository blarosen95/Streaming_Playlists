import {useMemo} from "react";

export const ELLIPSIS = '...';

export const usePagination = ({
    totalPages,
    paginateOn,
    siblingCount = 1,
    currentPage
}) => {
    const paginationRange = useMemo(() => {
        //TODO

        const totalPageCount = Math.ceil(totalPages / paginateOn);

        // Count (to show) is calculated as siblingCount + firstPage + lastPage + currentPage + 2 ellipses
        const totalPageNums = siblingCount + 5;

        /*
        Concept 1:
            Return the range from 1 through totalPageCount if pages to show is less than our totalPageNums.
         */
        if (totalPageNums >= totalPageCount) {
            return range(1, totalPageCount);
        }

        // Calculate sibling indices and ensure within range 1...totalPageCount
        const leftSibIndex = Math.max(currentPage - siblingCount, 1);
        const rightSibIndex = Math.min(currentPage + siblingCount, totalPageCount);

        // No ellipses when just one page number to show between indices
        const isLeftEllipsisShown = leftSibIndex > 2;
        const isRightEllipsisShown = rightSibIndex < totalPageCount-2;

        const firstPageIndex = 1;
        const lastPageIndex = totalPageCount;

        // Show right ellipsis but not left
        if (!isLeftEllipsisShown && isRightEllipsisShown) {
            let leftItemCount = 3 + 2 * siblingCount;
            let leftRange = range(1, leftItemCount);
            return [...leftRange, ellipsis, totalPageCount];
        }

        // Show left ellipsis but not right
        if (isLeftEllipsisShown && !isRightEllipsisShown) {
            let rightItemCount = 3 + 2 * siblingCount;
            let rightRange = range(totalPageCount - rightItemCount + 1, totalPageCount);
            return [firstPageIndex, ellipsis, ...rightRange];
        }

        // Show both ellipsis
        if (isLeftEllipsisShown && isRightEllipsisShown) {
            let midRange = range(leftSibIndex, rightSibIndex);
            return [firstPageIndex, ellipsis, ...midRange, ellipsis, lastPageIndex];
        }

    }, [totalPages, paginateOn, siblingCount, currentPage]);

    return paginationRange;
};