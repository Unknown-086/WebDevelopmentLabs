import { useState } from 'react';
import {
  HiEnvelope,
  HiPhone,
  HiMapPin,
  HiCheckCircle,
  HiXCircle,
  HiChatBubbleLeftRight,
  HiPencil,
  HiTrash,
  HiUser,
  HiSparkles
} from 'react-icons/hi2';
import EditGuestModal from './EditGuestModal';
import './GuestList.css';

function GuestList({ 
  guests, 
  allGuests,
  onToggleConfirm, 
  onToggleRSVP, 
  onToggleVIP,
  onRemoveGuest, 
  onUpdateGuest 
}) {
  const [editingGuest, setEditingGuest] = useState(null);

  const handleEditClick = (guest) => {
    setEditingGuest(guest);
  };

  const handleUpdateGuest = (id, updatedData) => {
    onUpdateGuest(id, updatedData);
    setEditingGuest(null);
  };

  if (allGuests.length === 0) {
    return (
      <div className="empty-state">
        <HiUser className="empty-icon" />
        <p>No guests found</p>
        <span className="empty-subtitle">Start by adding your first guest above</span>
      </div>
    );
  }

  if (guests.length === 0) {
    return (
      <div className="empty-state">
        <HiUser className="empty-icon" />
        <p>No guests match your filters</p>
        <span className="empty-subtitle">Try adjusting your search or filter</span>
      </div>
    );
  }

  return (
    <>
      <div className="guest-list">
        {guests.map((guest) => {
          const initials = guest.name
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);

          return (
            <div
              key={guest.id}
              className={`guest-card ${guest.confirmed ? 'confirmed' : 'unconfirmed'} ${guest.rsvp ? 'rsvp-yes' : ''}`}
            >
              <div className="guest-header">
                <div className="guest-avatar">{initials}</div>
                <div className="guest-main-info">
                  <h3>
                    {guest.name}
                    {guest.vip && <HiSparkles className="vip-icon" />}
                  </h3>
                  <div className="guest-contact">
                    <span>
                      <HiEnvelope />
                      {guest.email}
                    </span>
                    {guest.phone && (
                      <span>
                        <HiPhone />
                        {guest.phone}
                      </span>
                    )}
                    {guest.address && (
                      <span>
                        <HiMapPin />
                        {guest.address}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="guest-content">
                <div className="status-badges">
                  {guest.confirmed ? (
                    <span className="badge badge-confirmed">
                      <HiCheckCircle />
                      Confirmed
                    </span>
                  ) : (
                    <span className="badge badge-pending">
                      <HiXCircle />
                      Pending
                    </span>
                  )}
                  {guest.rsvp && (
                    <span className="badge badge-rsvp">
                      <HiChatBubbleLeftRight />
                      RSVP
                    </span>
                  )}
                </div>

                <div className="guest-actions">
                  <button
                    onClick={() => onToggleConfirm(guest.id)}
                    className={`btn-action ${guest.confirmed ? 'btn-confirmed' : 'btn-confirm'}`}
                    title={guest.confirmed ? 'Unconfirm' : 'Confirm'}
                  >
                    <HiCheckCircle />
                  </button>
                  
                  <button
                    onClick={() => onToggleRSVP(guest.id)}
                    className={`btn-action ${guest.rsvp ? 'btn-rsvp-active' : 'btn-rsvp'}`}
                    title={guest.rsvp ? 'Remove RSVP' : 'RSVP'}
                  >
                    <HiChatBubbleLeftRight />
                  </button>

                  <button
                    onClick={() => onToggleVIP(guest.id)}
                    className={`btn-action ${guest.vip ? 'btn-vip-active' : 'btn-vip'}`}
                    title={guest.vip ? 'Remove VIP' : 'Mark as VIP'}
                  >
                    <HiSparkles />
                  </button>
                  
                  <button
                    onClick={() => handleEditClick(guest)}
                    className="btn-action btn-edit"
                    title="Edit"
                  >
                    <HiPencil />
                  </button>
                  
                  <button
                    onClick={() => onRemoveGuest(guest.id)}
                    className="btn-action btn-remove"
                    title="Remove"
                  >
                    <HiTrash />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <EditGuestModal
        isOpen={!!editingGuest}
        onClose={() => setEditingGuest(null)}
        onUpdateGuest={handleUpdateGuest}
        guest={editingGuest}
      />
    </>
  );
}

export default GuestList;
