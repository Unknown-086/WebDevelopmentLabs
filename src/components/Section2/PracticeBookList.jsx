import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/Card';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { BookOpen, Trash2, Edit, Plus } from 'lucide-react';

export const PracticeBookList = () => {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({ title: '', author: '' });
  const [editingBook, setEditingBook] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Add a new book
  const handleAddBook = (e) => {
    e.preventDefault();
    if (!newBook.title || !newBook.author) return;

    const book = {
      id: Date.now().toString(),
      title: newBook.title,
      author: newBook.author,
    };

    setBooks([...books, book]);
    setNewBook({ title: '', author: '' });
  };

  // Delete a book using filter
  const handleDeleteBook = (id) => {
    setBooks(books.filter(book => book.id !== id));
  };

  // Open edit modal
  const handleEditClick = (book) => {
    setEditingBook({ ...book });
    setIsEditModalOpen(true);
  };

  // Save edited book
  const handleSaveEdit = () => {
    setBooks(books.map(book => 
      book.id === editingBook.id ? editingBook : book
    ));
    setIsEditModalOpen(false);
    setEditingBook(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card variant="gradient">
        <CardHeader>
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="p-3 bg-primary/20 rounded-full"
            >
              <BookOpen className="w-6 h-6 text-primary" />
            </motion.div>
            <div>
              <CardTitle>Practice Book List</CardTitle>
              <CardDescription>
                Section 2: Managing Arrays of Objects
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Add Book Form */}
          <form onSubmit={handleAddBook} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            </div>
            <Button type="submit" variant="shimmer" className="w-full md:w-auto">
              <Plus className="w-4 h-4 mr-2" />
              Add Book
            </Button>
          </form>

          {/* Book List */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg gradient-text">
              Your Books ({books.length})
            </h3>

            <AnimatePresence mode="popLayout">
              {books.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-12 text-muted-foreground"
                >
                  <BookOpen className="w-16 h-16 mx-auto mb-4 opacity-20" />
                  <p>No books yet. Add your first book!</p>
                </motion.div>
              ) : (
                <div className="grid gap-4">
                  {books.map((book, index) => (
                    <motion.div
                      key={book.id}
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 50 }}
                      transition={{ delay: index * 0.1 }}
                      layout
                      className="p-4 rounded-lg bg-secondary/50 border border-primary/20 hover:border-primary/40 transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-lg text-foreground">
                            {book.title}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            by {book.author}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleEditClick(book)}
                            className="p-2 rounded-lg bg-primary/20 hover:bg-primary/30 text-primary transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleDeleteBook(book.id)}
                            className="p-2 rounded-lg bg-destructive/20 hover:bg-destructive/30 text-destructive transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* Learning Note */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="p-4 rounded-lg bg-muted/50 text-sm"
          >
            <p className="font-semibold mb-2 text-primary">💡 Key Concepts:</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-1">
              <li>Use <code className="px-2 py-1 bg-primary/20 rounded">map()</code> to render array items</li>
              <li>Use <code className="px-2 py-1 bg-primary/20 rounded">filter()</code> to remove items by id</li>
              <li>Generate unique IDs with <code className="px-2 py-1 bg-primary/20 rounded">Date.now()</code></li>
              <li>Update specific items by mapping and matching id</li>
            </ul>
          </motion.div>
        </CardContent>
      </Card>

      {/* Edit Modal */}
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
              <Button 
                onClick={() => setIsEditModalOpen(false)} 
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
