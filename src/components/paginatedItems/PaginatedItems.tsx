import RepoCard from 'components/repoCard/RepoCard';
import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate';
import "./paginatedItems.scss"


interface PaginatedItemsProps {
    repos: any[];
}

const PaginatedItems = ({ repos }: PaginatedItemsProps) => {

    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage: number = 6

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(repos.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(repos.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, repos]);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % repos.length;
        setItemOffset(newOffset);
    };

    return (
        <div>
            <section className='repos'>
                {currentItems.map((r) => (
                    < RepoCard key={r.id} name={r.name} description={r.description} url={r.html_url} topic={r.topics} />
                ))}

                <div className='paginate-container'>
                    <ReactPaginate
                        breakLabel="..."
                        nextLabel="next >"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={3}
                        pageCount={pageCount}
                        previousLabel="< previous"
                        renderOnZeroPageCount={null}
                        containerClassName="pagination"
                        pageLinkClassName='page-num'
                        previousLinkClassName='page-num'
                        nextLinkClassName='page-num'
                        activeLinkClassName='active'
                    />
                </div>
            </section>
        </div>
    )
}

export default PaginatedItems