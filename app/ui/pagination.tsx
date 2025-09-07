'use client'
import { usePathname, useSearchParams } from "next/navigation"
import { generatePagination } from "../lib/utils";



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
        <>
        <h1>this is a pagination component</h1>
        <a href={createPageURL(2)}>go to next page</a>
        </>
    )
}