

export async function fetchAnimePages(
    query: string,
    currentPage: number | string,
    filters?: {
        sfw?: string;
        type?: string;
        status?: string;
        rating?: string;
        orderBy?: string;
        sort?: string;
    }
) {
    try {
       // add query (same as board) to get pagination for that
        const queryParams = new URLSearchParams();
        
        if (query) queryParams.set('q', query);
        if (filters?.sfw) queryParams.set('sfw', filters.sfw);
        if (filters?.type) queryParams.set('type', filters.type);
        if (filters?.status) queryParams.set('status', filters.status);
        if (filters?.rating) queryParams.set('rating', filters.rating);
        if (filters?.orderBy) queryParams.set('order_by', filters.orderBy);
        if (filters?.sort) queryParams.set('sort', filters.sort);
        
        queryParams.set('limit', '12');
        queryParams.set('page', currentPage.toString());

        const data = await fetch(
            `https://api.jikan.moe/v4/anime?${queryParams.toString()}`,
            {
                next: { revalidate: 300 }, // Cache for 5 minutes
            }
        );
        
        if (!data.ok) {
            throw new Error(`API request failed: ${data.status}`);
        }
        
        const results = await data.json();
        const totalPage = results.pagination?.last_visible_page || 1;
        console.log('total pages is: ', totalPage);
        return totalPage;
    } catch (error) {
        console.error('Failed to query the pageNumber: ', error);
        throw new Error('Failed to query the pageNumber');
    }
}