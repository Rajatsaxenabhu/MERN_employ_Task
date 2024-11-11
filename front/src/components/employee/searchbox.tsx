interface SearchBoxProps {
    searchQuery: string;
    onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  }
  const SearchBox = ({ searchQuery, onSearchChange }: SearchBoxProps) => {
    return (
        <div className="mb-4">
            <input
                type="text"
                placeholder="Search by name, email, or mobile"
                value={searchQuery}
                onChange={onSearchChange}
                className="w-full px-3 py-2 border rounded"
            />
        </div>
    );
};

export default SearchBox;
