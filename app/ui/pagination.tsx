'use client'
import { usePathname, useSearchParams } from "next/navigation"
import { generatePagination } from "../lib/utils";
import Link from "next/link";
import styles from "../styles.module.css";

export default function Pagination({totalPage}:{totalPage: number}) {

    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get('page')) || 1;
    //get pagination array
    const allPages = generatePagination(currentPage,totalPage);

    const createPageURL = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams);
        params.set('page',pageNumber.toString());
        
        return `${pathname}?${params.toString()}`;
    }

    return (
        <div className={styles.paginationContainer}>
            <PaginationArrow
                direction="left"
                href={createPageURL(currentPage - 1)}
                isDisabled={currentPage <= 1}
            />

            {allPages.map((page, index) => {
                return (
                    <PaginationNumber
                        key={`${page}-${index}`}
                        href={createPageURL(page)}
                        page={page}
                        isActive={currentPage === page}
                    />
                );
            })}

            <PaginationArrow
                direction="right"
                href={createPageURL(currentPage + 1)}
                isDisabled={currentPage >= totalPage}
            />
        </div>
    )
}

function PaginationNumber({
    page,
    href,
    isActive,
  }: {
    page: number | string;
    href: string;
    isActive: boolean;
  }) {
    // Handle ellipsis case
    if (page === '...') {
        return <div className={styles.paginationEllipsis}>{page}</div>;
    }

    // Handle active page
    if (isActive) {
        return <div className={`${styles.paginationButton} ${styles.paginationButtonActive}`}>{page}</div>;
    }

    // Handle clickable page numbers
    return (
        <Link href={href} className={styles.paginationButton}>
            {page}
        </Link>
    );
  }

function PaginationArrow({
    href,
    direction,
    isDisabled,
  }: {
    href: string;
    direction: 'left' | 'right';
    isDisabled?: boolean;
  }) {
    const arrowSymbol = direction === 'left' ? '‹' : '›';
    const className = isDisabled 
        ? `${styles.paginationArrow} ${styles.paginationArrowDisabled}`
        : styles.paginationArrow;
  
    return isDisabled ? (
        <div className={className}>{arrowSymbol}</div>
    ) : (
        <Link className={className} href={href}>
            {arrowSymbol}
        </Link>
    );
  }