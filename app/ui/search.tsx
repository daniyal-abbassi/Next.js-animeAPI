

export default function Search({placeholder}: {placeholder: string}) {
    return (
        <div className="input-group input-group-lg">
            <span className="input-group-text" id="search-by-name">Search Anime</span>
            <input type="text" className="form-control" aria-label="Search anime by name" aria-describedby="search-by-name"/>
        </div>
    );
}