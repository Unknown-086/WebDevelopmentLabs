import { useState, useEffect } from 'react';
import { HiCalendarDays, HiPlus, HiMoon, HiSun } from 'react-icons/hi2';
import AddGuestModal from './components/AddGuestModal';
import GuestList from './components/GuestList';
import RSVPSummary from './components/RSVPSummary';
import FilterBar from './components/FilterBar';
import './App.css';

function App() {
  const [guests, setGuests] = useState(() => {
    const savedGuests = localStorage.getItem('eventPlannerGuests');
    return savedGuests ? JSON.parse(savedGuests) : [];
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('eventPlannerTheme');
    return savedTheme === 'dark';
  });

  useEffect(() => {
    localStorage.setItem('eventPlannerGuests', JSON.stringify(guests));
  }, [guests]);

  useEffect(() => {
    localStorage.setItem('eventPlannerTheme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const handleAddGuest = (guestData) => {
    setGuests(prevGuests => [...prevGuests, guestData]);
    setIsModalOpen(false);
  };

  const handleToggleConfirm = (id) => {
    setGuests(prevGuests =>
      prevGuests.map(guest =>
        guest.id === id 
          ? { ...guest, confirmed: !guest.confirmed }
          : guest
      )
    );
  };

  const handleToggleRSVP = (id) => {
    setGuests(prevGuests =>
      prevGuests.map(guest =>
        guest.id === id 
          ? { ...guest, rsvp: !guest.rsvp }
          : guest
      )
    );
  };

  const handleToggleVIP = (id) => {
    setGuests(prevGuests =>
      prevGuests.map(guest =>
        guest.id === id 
          ? { ...guest, vip: !guest.vip }
          : guest
      )
    );
  };

  const handleRemoveGuest = (id) => {
    setGuests(prevGuests => prevGuests.filter(guest => guest.id !== id));
  };

  const handleUpdateGuest = (id, updatedData) => {
    setGuests(prevGuests =>
      prevGuests.map(guest =>
        guest.id === id 
          ? { ...guest, ...updatedData }
          : guest
      )
    );
  };

  const filteredGuests = guests.filter(guest => {
    const matchesSearch = guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         guest.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (!matchesSearch) return false;
    
    switch (filterStatus) {
      case 'confirmed':
        return guest.confirmed;
      case 'pending':
        return !guest.confirmed;
      case 'rsvp':
        return guest.rsvp;
      case 'vip':
        return guest.vip;
      default:
        return true;
    }
  });

  return (
    <div className={`app ${isDarkMode ? 'dark-mode' : ''}`}>
      <header className="app-header">
        <div className="header-content">
          <HiCalendarDays className="header-icon" />
          <div className="header-text">
            <h1>Event Planner</h1>
            <p>Manage your guests with elegance</p>
          </div>
        </div>
        <div className="header-actions">
          <button onClick={() => setIsModalOpen(true)} className="btn-add-guest">
            <HiPlus />
            <span>Add Guest</span>
          </button>
          <button onClick={() => setIsDarkMode(!isDarkMode)} className="btn-theme-toggle">
            {isDarkMode ? <HiSun /> : <HiMoon />}
          </button>
        </div>
      </header>

      <div className="app-container">
        <RSVPSummary guests={guests} />
        
        <FilterBar 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          filterStatus={filterStatus}
          onFilterChange={setFilterStatus}
        />
        
        <GuestList
          guests={filteredGuests}
          allGuests={guests}
          onToggleConfirm={handleToggleConfirm}
          onToggleRSVP={handleToggleRSVP}
          onToggleVIP={handleToggleVIP}
          onRemoveGuest={handleRemoveGuest}
          onUpdateGuest={handleUpdateGuest}
        />
      </div>
      
      <AddGuestModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddGuest={handleAddGuest}
      />
    </div>
  );
}

export default App;
