import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRole } from '../../context/RoleContext';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { 
  BookOpen, 
  Trash2, 
  Edit, 
  Plus, 
  Search, 
  Users, 
  TrendingUp, 
  Star,
  Library,
  User,
  Calendar,
  Mail,
  Phone
} from 'lucide-react';

const DEFAULT_BOOKS = [
  { id: '1', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', isFavorite: false },
  { id: '2', title: 'To Kill a Mockingbird', author: 'Harper Lee', isFavorite: false },
  { id: '3', title: '1984', author: 'George Orwell', isFavorite: true },
];

const DEFAULT_USER = {
  name: 'John Doe',
  age: '25',
  email: 'john.doe@example.com',
  phone: '+1 234 567 8901',
};

export const BookDashboard = () => {
  const { isAdmin } = useRole();
  const [books, setBooks] = useState([]);
  const [userProfile, setUserProfile] = useState(DEFAULT_USER);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [newBook, setNewBook] = useState({ title: '', author: '' });
  const [editingBook, setEditingBook] = useState(null);
  const [editingProfile, setEditingProfile] = useState(DEFAULT_USER);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedBooks = localStorage.getItem('books');
    const savedUser = localStorage.getItem('userProfile');
    
    if (savedBooks) {
      setBooks(JSON.parse(savedBooks));
    } else {
      setBooks(DEFAULT_BOOKS);
      localStorage.setItem('books', JSON.stringify(DEFAULT_BOOKS));
    }
    
    if (savedUser) {
      setUserProfile(JSON.parse(savedUser));
    } else {
      localStorage.setItem('userProfile', JSON.stringify(DEFAULT_USER));
    }
  }, []);

  // Save books to localStorage whenever they change
  useEffect(() => {
    if (books.length > 0) {
      localStorage.setItem('books', JSON.stringify(books));
    }
  }, [books]);

  // Save user profile to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('userProfile', JSON.stringify(userProfile));
  }, [userProfile]);

  // Filter books based on search
  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate stats
  const totalBooks = books.length;
  const favoriteBooks = books.filter(b => b.isFavorite).length;
  const booksThisMonth = books.filter(b => {
    if (!b.addedDate) return false;
    const bookDate = new Date(b.addedDate);
    const now = new Date();
    return bookDate.getMonth() === now.getMonth() && bookDate.getFullYear() === now.getFullYear();
  }).length;

  // Add book
  const handleAddBook = () => {
    if (!newBook.title || !newBook.author) return;

    const book = {
      id: Date.now().toString(),
      title: newBook.title,
      author: newBook.author,
      isFavorite: false,
      addedDate: new Date().toISOString(),
    };

    setBooks([...books, book]);
    setNewBook({ title: '', author: '' });
    setIsAddModalOpen(false);
  };

  // Delete book
  const handleDeleteBook = (id) => {
    setBooks(books.filter(book => book.id !== id));
  };

  // Edit book
  const handleEditClick = (book) => {
    setEditingBook({ ...book });
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = () => {
    setBooks(books.map(book => 
      book.id === editingBook.id ? editingBook : book
    ));
    setIsEditModalOpen(false);
    setEditingBook(null);
  };

  // Toggle favorite
  const toggleFavorite = (id) => {
    setBooks(books.map(book =>
      book.id === id ? { ...book, isFavorite: !book.isFavorite } : book
    ));
  };

  // Update profile
  const handleSaveProfile = () => {
    setUserProfile(editingProfile);
    setIsProfileModalOpen(false);
  };

  const openProfileEditor = () => {
    setEditingProfile({ ...userProfile });
    setIsProfileModalOpen(true);
  };

  return (
    <div className="min-h-screen w-full">
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4"
        >
          <div className="p-4 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-2xl">
            <Library className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold gradient-text">Book Dashboard</h1>
            <p className="text-muted-foreground">Browse the book collection</p>
          </div>
        </motion.div>

        {/* Search and Add Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col md:flex-row gap-4 items-center"
        >
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search books by title or author..."
              className="pl-12"
            />
          </div>
          {isAdmin && (
            <Button
              onClick={() => setIsAddModalOpen(true)}
              variant="shimmer"
              className="w-full md:w-auto whitespace-nowrap"
            >
              Add New Book
            </Button>
          )}
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: Library, label: 'Total Books', value: totalBooks, color: 'from-blue-500 to-cyan-500' },
            { icon: Users, label: 'Active Users', value: 1, color: 'from-violet-500 to-purple-500' },
            { icon: TrendingUp, label: 'Books This Month', value: booksThisMonth, color: 'from-orange-500 to-red-500' },
            { icon: Star, label: 'Favorites', value: favoriteBooks, color: 'from-yellow-500 to-amber-500' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <Card className="hover:shadow-xl">
                <div className="flex items-center gap-4">
                  <div className={`p-3 bg-gradient-to-br ${stat.color} rounded-xl`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground uppercase tracking-wide">{stat.label}</p>
                    <p className="text-3xl font-bold gradient-text">{stat.value}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* User Profile Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold gradient-text">User Profile</h2>
              <Button onClick={openProfileEditor} variant="outline" size="sm" className="flex items-center">
                <Edit className="w-4 h-4" />
                Update Profile
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { icon: User, label: 'Full Name', value: userProfile.name },
                { icon: Calendar, label: 'Age', value: `${userProfile.age} years` },
                { icon: Mail, label: 'Email', value: userProfile.email },
                { icon: Phone, label: 'Phone', value: userProfile.phone },
              ].map((field) => (
                <div key={field.label} className="p-4 rounded-lg bg-secondary/50 border border-primary/10">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/20 rounded-lg">
                      <field.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">{field.label}</p>
                      <p className="text-sm font-medium truncate">{field.value}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Book Collection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <h2 className="text-2xl font-bold gradient-text mb-4">Book Collection</h2>
          
          <AnimatePresence mode="popLayout">
            {filteredBooks.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Card className="text-center py-16">
                  <BookOpen className="w-20 h-20 mx-auto mb-4 text-muted-foreground opacity-20" />
                  <p className="text-muted-foreground text-lg">
                    {searchQuery ? 'No books found matching your search' : isAdmin ? "The admin hasn't added any books yet" : 'No books yet'}
                  </p>
                </Card>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBooks.map((book, index) => (
                  <motion.div
                    key={book.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: index * 0.05 }}
                    layout
                  >
                    <Card className="h-full">
                      <div className="flex flex-col h-full">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-foreground mb-1">{book.title}</h3>
                            <p className="text-sm text-muted-foreground">by {book.author}</p>
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => toggleFavorite(book.id)}
                            className="ml-2"
                          >
                            <Star
                              className={`w-6 h-6 ${
                                book.isFavorite
                                  ? 'fill-yellow-500 text-yellow-500'
                                  : 'text-muted-foreground'
                              }`}
                            />
                          </motion.button>
                        </div>
                        
                        {isAdmin && (
                          <div className="flex gap-2 mt-auto">
                            <Button
                              onClick={() => handleEditClick(book)}
                              variant="outline"
                              size="sm"
                              className="flex-1 flex items-center justify-center"
                            >
                              <Edit className="w-4 h-4" />
                              Edit
                            </Button>
                            <Button
                              onClick={() => handleDeleteBook(book.id)}
                              variant="destructive"
                              size="sm"
                              className="flex-1 flex items-center justify-center"
                            >
                              <Trash2 className="w-4 h-4" />
                              Delete
                            </Button>
                          </div>
                        )}
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Add Book Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Book"
      >
        <div className="space-y-4">
          <Input
            label="Book Title"
            value={newBook.title}
            onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
            placeholder="Enter book title"
          />
          <Input
            label="Author"
            value={newBook.author}
            onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
            placeholder="Enter author name"
          />
          <div className="flex gap-3 pt-4">
            <Button onClick={handleAddBook} variant="shimmer" className="flex-1">
              <Plus className="w-4 h-4 mr-2" />
              Add Book
            </Button>
            <Button onClick={() => setIsAddModalOpen(false)} variant="outline" className="flex-1">
              Cancel
            </Button>
          </div>
        </div>
      </Modal>

      {/* Edit Book Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Book"
      >
        {editingBook && (
          <div className="space-y-4">
            <Input
              label="Book Title"
              value={editingBook.title}
              onChange={(e) => setEditingBook({ ...editingBook, title: e.target.value })}
            />
            <Input
              label="Author"
              value={editingBook.author}
              onChange={(e) => setEditingBook({ ...editingBook, author: e.target.value })}
            />
            <div className="flex gap-3 pt-4">
              <Button onClick={handleSaveEdit} variant="shimmer" className="flex-1">
                Save Changes
              </Button>
              <Button onClick={() => setIsEditModalOpen(false)} variant="outline" className="flex-1">
                Cancel
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Edit Profile Modal */}
      <Modal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        title="Update Profile"
      >
        <div className="space-y-4">
          <Input
            label="Full Name"
            value={editingProfile.name}
            onChange={(e) => setEditingProfile({ ...editingProfile, name: e.target.value })}
            placeholder="Enter your name"
          />
          <Input
            label="Age"
            type="number"
            value={editingProfile.age}
            onChange={(e) => setEditingProfile({ ...editingProfile, age: e.target.value })}
            placeholder="Enter your age"
          />
          <Input
            label="Email"
            type="email"
            value={editingProfile.email}
            onChange={(e) => setEditingProfile({ ...editingProfile, email: e.target.value })}
            placeholder="Enter your email"
          />
          <Input
            label="Phone"
            type="tel"
            value={editingProfile.phone}
            onChange={(e) => setEditingProfile({ ...editingProfile, phone: e.target.value })}
            placeholder="Enter your phone"
          />
          <div className="flex gap-3 pt-4">
            <Button onClick={handleSaveProfile} variant="shimmer" className="flex-1">
              Save Profile
            </Button>
            <Button onClick={() => setIsProfileModalOpen(false)} variant="outline" className="flex-1">
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
