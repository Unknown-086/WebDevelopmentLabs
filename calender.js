// Store events in local storage
let events = JSON.parse(localStorage.getItem('calendarEvents')) || {};

// Calendar state
let currentDate = new Date();
let currentView = 'month'; // 'month' or 'week'

// DOM elements
const monthYearElement = document.getElementById('month-year');
const calendarGrid = document.getElementById('calendar-grid');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const todayBtn = document.getElementById('today-btn');
const viewToggleBtn = document.getElementById('view-toggle');
const modal = document.getElementById('event-modal');
const closeModalBtn = document.querySelector('.close');
const eventForm = document.getElementById('event-form');
const eventNameInput = document.getElementById('event-name');
const eventTimeInput = document.getElementById('event-time');
const eventCategoryInput = document.getElementById('event-category');
const customCategoryGroup = document.getElementById('custom-category-group');
const customCategoryInput = document.getElementById('custom-category');
const eventColorInput = document.getElementById('event-color');
const eventDescriptionInput = document.getElementById('event-description');
const eventIdInput = document.getElementById('event-id');
const selectedDateElement = document.getElementById('selected-date');
const modalTitle = document.getElementById('modal-title');

// Event details modal
const eventDetailsModal = document.getElementById('event-details-modal');
const closeDetailsBtn = document.getElementById('close-details');
const detailName = document.getElementById('detail-name');
const detailDate = document.getElementById('detail-date');
const detailTime = document.getElementById('detail-time');
const detailCategory = document.getElementById('detail-category');
const detailColor = document.getElementById('detail-color');
const detailDescription = document.getElementById('detail-description');
const descriptionContainer = document.getElementById('description-container');
const editFromDetailsBtn = document.getElementById('edit-from-details');
const deleteFromDetailsBtn = document.getElementById('delete-from-details');

// Holidays toggle button
const holidaysBtn = document.getElementById('pakistan-holidays-btn');
let holidaysActive = false;
let cachedHolidays = null;

// Drag and drop state
let draggedEvent = null;
let draggedEventDate = null;

// Show/hide custom category input
eventCategoryInput.addEventListener('change', () => {
    if (eventCategoryInput.value === 'custom') {
        customCategoryGroup.style.display = 'block';
        customCategoryInput.focus();
    } else {
        customCategoryGroup.style.display = 'none';
    }
});

// Date formatting helpers
const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// Format date as YYYY-MM-DD for storage
function formatDateKey(date) {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

// Format date for display
function formatDateDisplay(date) {
    return `${daysOfWeek[date.getDay()]}, ${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

// Update the header with current month/year
function updateHeader() {
    if (currentView === 'month') {
        monthYearElement.textContent = `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
    } else {
        // For week view, show the date range
        const weekStart = new Date(currentDate);
        weekStart.setDate(currentDate.getDate() - currentDate.getDay());
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6);
        
        // If week spans two months
        if (weekStart.getMonth() !== weekEnd.getMonth()) {
            monthYearElement.textContent = `${monthNames[weekStart.getMonth()]} ${weekStart.getDate()} - ${monthNames[weekEnd.getMonth()]} ${weekEnd.getDate()}, ${currentDate.getFullYear()}`;
        } else {
            monthYearElement.textContent = `${monthNames[weekStart.getMonth()]} ${weekStart.getDate()} - ${weekEnd.getDate()}, ${currentDate.getFullYear()}`;
        }
    }
}

// Render the calendar grid
function renderCalendar() {
    calendarGrid.innerHTML = '';
    
    if (currentView === 'month') {
        renderMonthView();
    } else {
        renderWeekView();
    }
}

// Render month view
function renderMonthView() {
    calendarGrid.className = 'calendar-grid';
    
    // Get first day of month
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    // Get last day of month
    const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    
    // Get the day of the week for the first day (0-6)
    const firstDayIndex = firstDay.getDay();
    
    // Calculate days from previous month to display
    const prevMonthDays = firstDayIndex;
    
    // Calculate total days to display (previous month + current month + next month to fill grid)
    const totalDays = 42; // 6 rows of 7 days
    
    // Get the last day of previous month
    const prevMonthLastDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
    
    // Current date for highlighting today
    const today = new Date();
    
    // Create cells for the grid
    for (let i = 0; i < totalDays; i++) {
        const dateCell = document.createElement('div');
        dateCell.className = 'date-cell';
        
        let cellDate;
        
        // Previous month days
        if (i < prevMonthDays) {
            const day = prevMonthLastDay - prevMonthDays + i + 1;
            cellDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, day);
            dateCell.innerHTML = `<div class="date-number other-month">${day}</div>`;
            dateCell.classList.add('other-month');
        } 
        // Current month days
        else if (i < prevMonthDays + lastDay.getDate()) {
            const day = i - prevMonthDays + 1;
            cellDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
            dateCell.innerHTML = `<div class="date-number">${day}</div>`;
            
            // Highlight today
            if (
                today.getDate() === day &&
                today.getMonth() === currentDate.getMonth() &&
                today.getFullYear() === currentDate.getFullYear()
            ) {
                dateCell.classList.add('today');
            }
        } 
        // Next month days
        else {
            const day = i - prevMonthDays - lastDay.getDate() + 1;
            cellDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, day);
            dateCell.innerHTML = `<div class="date-number other-month">${day}</div>`;
            dateCell.classList.add('other-month');
        }
        
        // Store date in the cell's dataset
        dateCell.dataset.date = formatDateKey(cellDate);
        
        // Add click event to open modal
        dateCell.addEventListener('click', (e) => {
            if (e.target === dateCell || e.target.classList.contains('date-number')) {
                openEventModal(cellDate);
            }
        });
        
        // Add events for this date
        const dateKey = formatDateKey(cellDate);
        if (events[dateKey]) {
            events[dateKey].forEach((event, index) => {
                const eventElement = createEventElement(event, dateKey, index);
                dateCell.appendChild(eventElement);
            });
        }
        
        // Add drag and drop handlers
        setupDragAndDrop(dateCell);
        
        calendarGrid.appendChild(dateCell);
    }
}

// Render week view
function renderWeekView() {
    calendarGrid.className = 'calendar-grid week-view';
    const weekStart = new Date(currentDate);
    weekStart.setDate(currentDate.getDate() - currentDate.getDay());
    const today = new Date();
    
    for (let i = 0; i < 7; i++) {
        const cellDate = new Date(weekStart);
        cellDate.setDate(weekStart.getDate() + i);
        
        const dateCell = document.createElement('div');
        dateCell.className = 'date-cell';
        
        // Add date header
        const dateHeader = document.createElement('div');
        dateHeader.className = 'date-number';
        dateHeader.textContent = `${cellDate.getDate()}`;
        
        // Highlight today
        if (
            today.getDate() === cellDate.getDate() &&
            today.getMonth() === cellDate.getMonth() &&
            today.getFullYear() === cellDate.getFullYear()
        ) {
            dateCell.classList.add('today');
        }
        
        // If date is not in current month
        if (cellDate.getMonth() !== currentDate.getMonth()) {
            dateHeader.classList.add('other-month');
        }
        
        dateCell.appendChild(dateHeader);
        
        // Store date in the cell's dataset
        dateCell.dataset.date = formatDateKey(cellDate);
        
        // Add click event to open modal
        dateCell.addEventListener('click', (e) => {
            if (e.target === dateCell || e.target.classList.contains('date-number')) {
                openEventModal(cellDate);
            }
        });
        
        // Add events for this date
        const dateKey = formatDateKey(cellDate);
        if (events[dateKey]) {
            events[dateKey].forEach((event, index) => {
                const eventElement = createEventElement(event, dateKey, index);
                dateCell.appendChild(eventElement);
            });
        }
        
        // Add drag and drop handlers
        setupDragAndDrop(dateCell);
        
        calendarGrid.appendChild(dateCell);
    }
}

// Setup drag and drop for date cells
function setupDragAndDrop(dateCell) {
    dateCell.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        dateCell.classList.add('drag-over');
    });
    
    dateCell.addEventListener('dragleave', () => {
        dateCell.classList.remove('drag-over');
    });
    
    dateCell.addEventListener('drop', (e) => {
        e.preventDefault();
        dateCell.classList.remove('drag-over');
        
        if (draggedEvent && draggedEventDate) {
            const targetDateKey = dateCell.dataset.date;
            
            // Remove from old date
            const oldIndex = events[draggedEventDate].findIndex(evt => 
                evt.name === draggedEvent.name && 
                evt.time === draggedEvent.time
            );
            
            if (oldIndex !== -1) {
                events[draggedEventDate].splice(oldIndex, 1);
                if (events[draggedEventDate].length === 0) {
                    delete events[draggedEventDate];
                }
            }
            
            // Add to new date
            if (!events[targetDateKey]) {
                events[targetDateKey] = [];
            }
            events[targetDateKey].push(draggedEvent);
            
            // Save and re-render
            localStorage.setItem('calendarEvents', JSON.stringify(events));
            renderCalendar();
        }
    });
}

// Create event element with actions
function createEventElement(event, dateKey, index) {
    const eventDiv = document.createElement('div');
    eventDiv.className = `event category-${event.category || 'work'}`;
    eventDiv.draggable = true;
    eventDiv.dataset.dateKey = dateKey;
    eventDiv.dataset.index = index;
    
    // Apply custom color if available
    if (event.color) {
        eventDiv.style.background = event.color;
        eventDiv.style.boxShadow = `0 2px 6px ${event.color}50`;
    }
    
    const eventName = document.createElement('span');
    eventName.className = 'event-name';
    eventName.textContent = event.name;
    eventDiv.appendChild(eventName);
    
    const actionsDiv = document.createElement('div');
    actionsDiv.className = 'event-actions';
    
    const viewBtn = document.createElement('button');
    viewBtn.className = 'event-action-btn';
    viewBtn.innerHTML = '<i class="fas fa-eye"></i>';
    viewBtn.title = 'View details';
    viewBtn.onclick = (e) => {
        e.stopPropagation();
        openEventDetails(dateKey, index);
    };
    
    const editBtn = document.createElement('button');
    editBtn.className = 'event-action-btn';
    editBtn.innerHTML = '<i class="fas fa-edit"></i>';
    editBtn.title = 'Edit event';
    editBtn.onclick = (e) => {
        e.stopPropagation();
        openEditModal(dateKey, index);
    };
    
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'event-action-btn';
    deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
    deleteBtn.title = 'Delete event';
    deleteBtn.onclick = (e) => {
        e.stopPropagation();
        deleteEvent(dateKey, index);
    };
    
    actionsDiv.appendChild(viewBtn);
    actionsDiv.appendChild(editBtn);
    actionsDiv.appendChild(deleteBtn);
    eventDiv.appendChild(actionsDiv);
    
    // Drag and drop
    eventDiv.addEventListener('dragstart', (e) => {
        draggedEvent = event;
        draggedEventDate = dateKey;
        eventDiv.classList.add('dragging');
        e.dataTransfer.effectAllowed = 'move';
    });
    
    eventDiv.addEventListener('dragend', () => {
        eventDiv.classList.remove('dragging');
        draggedEvent = null;
        draggedEventDate = null;
    });
    
    // Tooltip
    eventDiv.addEventListener('mouseenter', (e) => {
        if (event.description) {
            showTooltip(e, event.description);
        }
    });
    
    eventDiv.addEventListener('mouseleave', () => {
        removeTooltip();
    });
    
    return eventDiv;
}

// Tooltip functions
function showTooltip(e, text) {
    removeTooltip();
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = text;
    tooltip.id = 'event-tooltip';
    document.body.appendChild(tooltip);
    
    const rect = e.target.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    
    // Calculate position relative to the document (including scroll)
    const left = rect.left + scrollLeft + (rect.width / 2) - (tooltip.offsetWidth / 2);
    const top = rect.bottom + scrollTop + 10;
    
    tooltip.style.left = left + 'px';
    tooltip.style.top = top + 'px';
    tooltip.style.position = 'absolute';
}

function removeTooltip() {
    const tooltip = document.getElementById('event-tooltip');
    if (tooltip) tooltip.remove();
}

// Open event modal
function openEventModal(date) {
    modalTitle.textContent = 'Add Event';
    selectedDateElement.textContent = formatDateDisplay(date);
    selectedDateElement.dataset.date = formatDateKey(date);
    eventForm.reset();
    eventIdInput.value = '';
    eventColorInput.value = '#667eea'; // Default color
    modal.style.display = 'block';
}

// Open edit modal
function openEditModal(dateKey, index) {
    const event = events[dateKey][index];
    modalTitle.textContent = 'Edit Event';
    
    const date = new Date(dateKey);
    selectedDateElement.textContent = formatDateDisplay(date);
    selectedDateElement.dataset.date = dateKey;
    
    eventNameInput.value = event.name;
    eventTimeInput.value = event.time || '';
    eventCategoryInput.value = event.category || 'work';
    
    // Handle custom category
    if (event.customCategory) {
        customCategoryGroup.style.display = 'block';
        customCategoryInput.value = event.customCategory;
    } else {
        customCategoryGroup.style.display = 'none';
        customCategoryInput.value = '';
    }
    
    eventColorInput.value = event.color || '#667eea';
    eventDescriptionInput.value = event.description || '';
    eventIdInput.value = index;
    
    modal.style.display = 'block';
}

// Open event details
function openEventDetails(dateKey, index) {
    const event = events[dateKey][index];
    const date = new Date(dateKey);
    
    detailName.textContent = event.name;
    detailDate.textContent = formatDateDisplay(date);
    detailTime.textContent = event.time || 'No time set';
    
    const categoryBadge = document.createElement('span');
    categoryBadge.className = `category-badge ${event.category || 'work'}`;
    const categoryNames = {
        work: 'Work',
        personal: 'Personal',
        important: 'Important',
        meeting: 'Meeting',
        health: 'Health',
        social: 'Social',
        custom: event.customCategory || 'Custom'
    };
    categoryBadge.textContent = event.customCategory || categoryNames[event.category] || 'Work';
    detailCategory.innerHTML = '';
    detailCategory.appendChild(categoryBadge);
    
    // Display color
    const colorBox = document.createElement('div');
    colorBox.style.width = '100%';
    colorBox.style.height = '40px';
    colorBox.style.backgroundColor = event.color || '#667eea';
    colorBox.style.borderRadius = '8px';
    colorBox.style.border = '2px solid #e9ecef';
    detailColor.innerHTML = '';
    detailColor.appendChild(colorBox);
    
    if (event.description) {
        detailDescription.textContent = event.description;
        descriptionContainer.style.display = 'block';
    } else {
        descriptionContainer.style.display = 'none';
    }
    
    editFromDetailsBtn.onclick = () => {
        eventDetailsModal.style.display = 'none';
        openEditModal(dateKey, index);
    };
    
    deleteFromDetailsBtn.onclick = () => {
        eventDetailsModal.style.display = 'none';
        deleteEvent(dateKey, index);
    };
    
    eventDetailsModal.style.display = 'block';
}

// Delete event
function deleteEvent(dateKey, index) {
    if (confirm('Are you sure you want to delete this event?')) {
        events[dateKey].splice(index, 1);
        if (events[dateKey].length === 0) {
            delete events[dateKey];
        }
        localStorage.setItem('calendarEvents', JSON.stringify(events));
        renderCalendar();
    }
}

// Close modal
function closeModal() {
    modal.style.display = 'none';
    eventForm.reset();
    eventIdInput.value = '';
}

// Close event details modal
function closeEventDetails() {
    eventDetailsModal.style.display = 'none';
}

// Save event
function saveEvent(e) {
    e.preventDefault();
    
    const dateKey = selectedDateElement.dataset.date;
    const eventName = eventNameInput.value.trim();
    const eventTime = eventTimeInput.value;
    let eventCategory = eventCategoryInput.value;
    const eventColor = eventColorInput.value;
    const eventDescription = eventDescriptionInput.value.trim();
    const eventId = eventIdInput.value;
    
    if (!eventName) return;
    
    // Handle custom category
    let customCategory = null;
    if (eventCategory === 'custom') {
        customCategory = customCategoryInput.value.trim();
        if (!customCategory) {
            alert('Please enter a custom category name');
            return;
        }
    }
    
    const eventData = {
        name: eventName,
        time: eventTime,
        category: eventCategory,
        customCategory: customCategory,
        color: eventColor,
        description: eventDescription
    };
    
    // Initialize events array for this date if it doesn't exist
    if (!events[dateKey]) {
        events[dateKey] = [];
    }
    
    // Check if editing existing event
    if (eventId !== '') {
        events[dateKey][parseInt(eventId)] = eventData;
    } else {
        // Add new event
        events[dateKey].push(eventData);
    }
    
    // Save to local storage
    localStorage.setItem('calendarEvents', JSON.stringify(events));
    
    closeModal();
    renderCalendar();
}

// Navigate to previous month/week
function navigatePrev() {
    if (currentView === 'month') {
        currentDate.setMonth(currentDate.getMonth() - 1);
    } else {
        currentDate.setDate(currentDate.getDate() - 7);
    }
    updateHeader();
    renderCalendar();
}

// Navigate to next month/week
function navigateNext() {
    if (currentView === 'month') {
        currentDate.setMonth(currentDate.getMonth() + 1);
    } else {
        currentDate.setDate(currentDate.getDate() + 7);
    }
    updateHeader();
    renderCalendar();
}

function navigateToday() {
    currentDate = new Date();
    updateHeader();
    renderCalendar();
}

function toggleView() {
    currentView = currentView === 'month' ? 'week' : 'month';
    viewToggleBtn.innerHTML = currentView === 'month' 
        ? '<i class="fas fa-calendar-week"></i> Weekly View' 
        : '<i class="fas fa-calendar-alt"></i> Monthly View';
    updateHeader();
    renderCalendar();
}

prevBtn.addEventListener('click', navigatePrev);
nextBtn.addEventListener('click', navigateNext);
todayBtn.addEventListener('click', navigateToday);
viewToggleBtn.addEventListener('click', toggleView);
closeModalBtn.addEventListener('click', closeModal);
closeDetailsBtn.addEventListener('click', closeEventDetails);
eventForm.addEventListener('submit', saveEvent);

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
    if (e.target === eventDetailsModal) {
        closeEventDetails();
    }
});

// ========== HOLIDAYS API SYSTEM ==========

// Fallback holidays in case API fails
const fallbackHolidays = [
    { date: "2025-02-05", name: "Kashmir Day", types: ["Public"] },
    { date: "2025-03-23", name: "Pakistan Day", types: ["Public"] },
    { date: "2025-03-30", name: "Eid ul Fitr", types: ["Public"] },
    { date: "2025-03-31", name: "Eid ul Fitr Holiday", types: ["Public"] },
    { date: "2025-04-01", name: "Eid ul Fitr Holiday", types: ["Public"] },
    { date: "2025-05-01", name: "Labour Day", types: ["Public"] },
    { date: "2025-06-06", name: "Eid ul Adha", types: ["Public"] },
    { date: "2025-06-07", name: "Eid ul Adha Holiday", types: ["Public"] },
    { date: "2025-06-08", name: "Eid ul Adha Holiday", types: ["Public"] },
    { date: "2025-07-05", name: "Ashura", types: ["Public"] },
    { date: "2025-07-06", name: "Ashura Holiday", types: ["Public"] },
    { date: "2025-08-14", name: "Independence Day", types: ["Public"] },
    { date: "2025-09-04", name: "Eid Milad un Nabi", types: ["Public"] },
    { date: "2025-11-09", name: "Iqbal Day", types: ["Public"] },
    { date: "2025-12-25", name: "Quaid e Azam Day", types: ["Public"] }
];

// Fetch holidays from Nager.Date API (Free, no API key required)
async function fetchHolidaysFromAPI() {
    const currentYear = currentDate.getFullYear();
    const apiUrl = `https://date.nager.at/api/v3/PublicHolidays/${currentYear}/PK`;
    
    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            },
            mode: 'cors'
        });
        
        if (!response.ok) {
            console.warn(`API returned status ${response.status}, using fallback data`);
            return currentYear === 2025 ? fallbackHolidays : null;
        }
        
        const holidays = await response.json();
        console.log(`Successfully fetched ${holidays.length} holidays from API`);
        return holidays;
    } catch (error) {
        console.error('Error fetching holidays:', error);
        console.warn('Using fallback holiday data');
        // Use fallback data for 2025
        if (currentYear === 2025) {
            return fallbackHolidays;
        }
        alert('Could not load holidays. Please try again later.');
        return null;
    }
}

// Get color based on holiday type
function getHolidayColor(types) {
    if (!types || types.length === 0) return '#1976d2';
    
    // Types can be: Public, Bank, School, Authorities, Optional, Observance
    if (types.includes('Public')) return '#2e7d32'; // Green for public holidays
    if (types.includes('Bank')) return '#1976d2'; // Blue for bank holidays
    if (types.includes('Observance')) return '#6a1b9a'; // Purple for observance
    return '#1976d2'; // Default blue
}

// Toggle holidays
async function toggleHolidays() {
    if (holidaysActive) {
        // Remove holidays
        Object.keys(events).forEach(dateKey => {
            events[dateKey] = events[dateKey].filter(event => 
                !event.isPublicHoliday
            );
            if (events[dateKey].length === 0) {
                delete events[dateKey];
            }
        });
        
        holidaysActive = false;
        holidaysBtn.innerHTML = '<i class="fas fa-flag"></i> Holidays';
        holidaysBtn.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
        
        localStorage.setItem('calendarEvents', JSON.stringify(events));
        renderCalendar();
    } else {
        // Show loading state
        holidaysBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
        holidaysBtn.disabled = true;
        
        // Fetch holidays from API
        const holidays = await fetchHolidaysFromAPI();
        
        if (holidays && holidays.length > 0) {
            // Cache the holidays
            cachedHolidays = holidays;
            
            // Add holidays to calendar
            holidays.forEach(holiday => {
                const dateObj = new Date(holiday.date);
                const dateKey = formatDateKey(dateObj);
                
                const event = {
                    id: 'holiday-' + holiday.date,
                    name: holiday.name,
                    time: '00:00',
                    category: 'holiday',
                    customCategory: 'Public Holiday',
                    color: getHolidayColor(holiday.types),
                    description: holiday.localName ? `${holiday.localName} - ${holiday.types.join(', ')}` : holiday.types.join(', '),
                    isPublicHoliday: true
                };
                
                if (!events[dateKey]) {
                    events[dateKey] = [];
                }
                
                // Check if this holiday already exists
                const exists = events[dateKey].some(e => e.id === event.id);
                if (!exists) {
                    events[dateKey].push(event);
                }
            });
            
            holidaysActive = true;
            holidaysBtn.innerHTML = '<i class="fas fa-flag"></i> Hide Holidays';
            holidaysBtn.style.backgroundColor = 'rgba(46, 125, 50, 0.8)';
            
            localStorage.setItem('calendarEvents', JSON.stringify(events));
            renderCalendar();
        }
        
        holidaysBtn.disabled = false;
    }
}

// Holidays button event listener
holidaysBtn.addEventListener('click', toggleHolidays);

updateHeader();
renderCalendar();