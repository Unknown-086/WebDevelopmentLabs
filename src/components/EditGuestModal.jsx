import { useState, useEffect } from 'react';
import { 
  HiXMark, HiUser, HiEnvelope, HiPhone, HiMapPin 
} from 'react-icons/hi2';
import './EditGuestModal.css';

function EditGuestModal({ isOpen, onClose, onUpdateGuest, guest }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  useEffect(() => {
    if (guest) {
      setFormData({
        name: guest.name || '',
        email: guest.email || '',
        phone: guest.phone || '',
        address: guest.address || ''
      });
    }
  }, [guest]);

  if (!isOpen || !guest) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateGuest(guest.id, formData);
    onClose();
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <div className="modal-header">
          <h2>Edit Guest</h2>
          <button className="modal-close" onClick={onClose}>
            <HiXMark />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-field">
            <label htmlFor="edit-name">
              <HiUser className="field-icon" />
              <span>Name</span>
            </label>
            <input
              id="edit-name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter guest name"
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="edit-email">
              <HiEnvelope className="field-icon" />
              <span>Email</span>
            </label>
            <input
              id="edit-email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="guest@example.com"
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="edit-phone">
              <HiPhone className="field-icon" />
              <span>Phone</span>
            </label>
            <input
              id="edit-phone"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="(123) 456-7890"
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="edit-address">
              <HiMapPin className="field-icon" />
              <span>Address</span>
            </label>
            <input
              id="edit-address"
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="123 Main St, City"
              required
            />
          </div>

          <div className="modal-actions">
            <button type="button" onClick={onClose} className="btn-cancel">
              Cancel
            </button>
            <button type="submit" className="btn-submit">
              Update Guest
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditGuestModal;
