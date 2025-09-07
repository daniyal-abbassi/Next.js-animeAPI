
export async function fetchAnimePages(query: string,currentPage:number | string) {
    try {
        const data = await fetch(`https://api.jikan.moe/v4/anime?q=${query}&limit=12&page=${currentPage}`);
        const results = await data.json();
        const totalPage = results.pagination.last_visible_page;
        console.log('total pages is: ',totalPage);
        return totalPage;
    } catch (error) {
        console.error('Failed query the pageNumber: ',error);
        throw new Error('Failed query the pageNumber')
    }
}