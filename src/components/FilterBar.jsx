import { HiMagnifyingGlass, HiAdjustmentsHorizontal } from 'react-icons/hi2';
import './FilterBar.css';

function FilterBar({ searchTerm, onSearchChange, filterStatus, onFilterChange }) {
  return (
    <div className="filter-bar">
      <div className="search-box">
        <HiMagnifyingGlass className="search-icon" />
        <input
          type="text"
          placeholder="Search guests by name or email..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="search-input"
        />
      </div>
      
      <div className="filter-group">
        <HiAdjustmentsHorizontal className="filter-icon" />
        <select 
          value={filterStatus} 
          onChange={(e) => onFilterChange(e.target.value)}
          className="filter-select"
        >
          <option value="all">All Guests</option>
          <option value="confirmed">Confirmed Only</option>
          <option value="pending">Pending Only</option>
          <option value="rsvp">RSVP Yes</option>
          <option value="vip">VIP Only</option>
        </select>
      </div>
    </div>
  );
}

export default FilterBar;
