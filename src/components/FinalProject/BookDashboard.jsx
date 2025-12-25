import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRole } from '../../context/RoleContext';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { BookOpen, Trash2, Edit, Plus, Search, Library } from 'lucide-react';

export const BookDashboard = () => {
  const { isAdmin } = useRole();
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [newBook, setNewBook] = useState({ title: '', author: '' });
  const [editingBook, setEditingBook] = useState(null);

  // Filter books based on search query
  const filteredBooks = useMemo(() => {
    if (!searchQuery) return books;
    
    const query = searchQuery.toLowerCase();
    return books.filter(book =>
      book.title.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query)
    );
  }, [books, searchQuery]);

  // Add book handler
  const handleAddBook = () => {
    if (!newBook.title || !newBook.author) return;

    const book = {
      id: Date.now().toString(),
      title: newBook.title,
      author: newBook.author,
      addedAt: new Date().toLocaleDateString(),
    };

    setBooks([...books, book]);
    setNewBook({ title: '', author: '' });
    setIsAddModalOpen(false);
  };

  // Delete book handler
  const handleDeleteBook = (id) => {
    setBooks(books.filter(book => book.id !== id));
  };

  // Edit book handlers
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

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div className="flex items-center gap-3">
          <motion.div
            animate={{
              rotate: [0, 5, -5, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="p-4 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-2xl shadow-lg"
          >
            <Library className="w-8 h-8 text-white" />
          </motion.div>
          <div>
            <h1 className="text-4xl font-bold gradient-text">Book Dashboard</h1>
            <p className="text-muted-foreground">
              {isAdmin ? 'Manage your book collection' : 'Browse the book collection'}
            </p>
          </div>
        </div>

        {isAdmin && (
          <Button
            variant="shimmer"
            onClick={() => setIsAddModalOpen(true)}
            className="w-full md:w-auto"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add New Book
          </Button>
        )}
      </motion.div>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search books by title or author..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12"
          />
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <Card variant="glass" className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.3 }}
          >
            <p className="text-3xl font-bold gradient-text">{books.length}</p>
            <p className="text-sm text-muted-foreground">Total Books</p>
          </motion.div>
        </Card>
        <Card variant="glass" className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.4 }}
          >
            <p className="text-3xl font-bold gradient-text">{filteredBooks.length}</p>
            <p className="text-sm text-muted-foreground">Search Results</p>
          </motion.div>
        </Card>
        <Card variant="glass" className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.5 }}
          >
            <p className="text-3xl font-bold gradient-text">{isAdmin ? 'Admin' : 'User'}</p>
            <p className="text-sm text-muted-foreground">Current Role</p>
          </motion.div>
        </Card>
      </motion.div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredBooks.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="col-span-full flex flex-col items-center justify-center py-20 text-center"
            >
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <BookOpen className="w-20 h-20 text-muted-foreground/20 mb-4" />
              </motion.div>
              <h3 className="text-xl font-semibold text-muted-foreground mb-2">
                {searchQuery ? 'No books found' : 'No books yet'}
              </h3>
              <p className="text-sm text-muted-foreground">
                {searchQuery
                  ? 'Try adjusting your search query'
                  : isAdmin
                  ? 'Click "Add New Book" to get started'
                  : 'The admin hasn\'t added any books yet'}
              </p>
            </motion.div>
          ) : (
            filteredBooks.map((book, index) => (
              <BookCard
                key={book.id}
                book={book}
                index={index}
                isAdmin={isAdmin}
                onEdit={handleEditClick}
                onDelete={handleDeleteBook}
              />
            ))
          )}
        </AnimatePresence>
      </div>

      {/* Add Book Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setNewBook({ title: '', author: '' });
        }}
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
            <Button
              onClick={() => {
                setIsAddModalOpen(false);
                setNewBook({ title: '', author: '' });
              }}
              variant="outline"
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>

      {/* Edit Book Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingBook(null);
        }}
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
              <Button
                onClick={() => {
                  setIsEditModalOpen(false);
                  setEditingBook(null);
                }}
                variant="outline"
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

// BookCard Component
const BookCard = ({ book, index, isAdmin, onEdit, onDelete }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
      exit={{ opacity: 0, scale: 0.8, rotateY: 90 }}
      transition={{
        delay: index * 0.1,
        type: "spring",
        stiffness: 200,
        damping: 20,
      }}
      whileHover={{ scale: 1.05, rotateY: 5 }}
      className="group"
    >
      <Card variant="gradient" className="h-full relative overflow-hidden">
        {/* Animated Background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-transparent to-fuchsia-500/10"
          animate={{
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <div className="relative z-10 space-y-4">
          {/* Book Icon */}
          <motion.div
            animate={{
              rotateY: [0, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center"
          >
            <BookOpen className="w-6 h-6 text-primary" />
          </motion.div>

          {/* Book Info */}
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-foreground line-clamp-2">
              {book.title}
            </h3>
            <p className="text-sm text-muted-foreground">by {book.author}</p>
            <p className="text-xs text-muted-foreground/60">
              Added: {book.addedAt}
            </p>
          </div>

          {/* Admin Actions */}
          {isAdmin && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-2 pt-4"
            >
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit(book)}
                className="flex-1"
              >
                <Edit className="w-4 h-4 mr-1" />
                Edit
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => onDelete(book.id)}
                className="flex-1"
              >
                <Trash2 className="w-4 h-4 mr-1" />
                Delete
              </Button>
            </motion.div>
          )}

          {/* User View Badge */}
          {!isAdmin && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="pt-4"
            >
              <div className="px-3 py-1 rounded-full bg-muted/50 text-xs text-muted-foreground text-center">
                Read-only view
              </div>
            </motion.div>
          )}
        </div>
      </Card>
    </motion.div>
  );
};
