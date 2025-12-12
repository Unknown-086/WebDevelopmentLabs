import { useState } from 'react';
import { HiXMark, HiUser, HiEnvelope, HiPhone, HiMapPin } from 'react-icons/hi2';
import './AddGuestModal.css';

function AddGuestModal({ isOpen, onClose, onAddGuest }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (name.trim() && email.trim()) {
      const guestData = {
        id: Date.now(),
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        address: address.trim(),
        confirmed: false,
        rsvp: false,
        addedDate: new Date().toISOString()
      };
      
      onAddGuest(guestData);
      
      setName('');
      setEmail('');
      setPhone('');
      setAddress('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Add New Guest</h2>
          <button onClick={onClose} className="modal-close">
            <HiXMark />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="modal-field">
            <label>
              <HiUser className="field-icon" />
              <span>Full Name</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              required
              autoFocus
            />
          </div>
          
          <div className="modal-field">
            <label>
              <HiEnvelope className="field-icon" />
              <span>Email Address</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="john@example.com"
              required
            />
          </div>
          
          <div className="modal-field">
            <label>
              <HiPhone className="field-icon" />
              <span>Phone Number</span>
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+1 (555) 000-0000"
            />
          </div>
          
          <div className="modal-field">
            <label>
              <HiMapPin className="field-icon" />
              <span>Address</span>
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="123 Main St, City"
            />
          </div>
          
          <div className="modal-actions">
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Add Guest
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddGuestModal;
