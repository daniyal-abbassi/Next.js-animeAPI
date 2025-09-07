'use client'
import { usePathname, useSearchParams } from "next/navigation"




export default function Pagination({totalPage}:{totalPage: number}) {

    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get('page')) || 1;

    const createPageURL = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams);
        params.set('page',pageNumber.toString());
        console.log('this is our new page url: ',`${pathname}?${params.toString()}`)
        return `${pathname}?${params.toString()}`;
    }

    return (
        <>
        <h1>this is a pagination component</h1>
        <a href={createPageURL(2)}>go to next page</a>
        </>
    )
}