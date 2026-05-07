export default function BookTable({ books, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto rounded-xl">
      <table className="min-w-full table-auto">
        <thead>
          <tr
            style={{
              backgroundColor: 'var(--primary)',
              color: 'white',
            }}
          >
            <th className="p-3 text-left text-sm font-semibold">ID</th>
            <th className="p-3 text-left text-sm font-semibold">Title</th>
            <th className="p-3 text-left text-sm font-semibold">Category</th>
            <th className="p-3 text-center text-sm font-semibold">Downloads</th>
            <th className="p-3 text-center text-sm font-semibold">Published</th>
            <th className="p-3 text-center text-sm font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, idx) => (
            <tr
              key={book.id}
              className="border-b transition-all duration-200 hover:bg-amber-50"
              style={{
                borderColor: 'rgba(0,0,0,0.05)',
                backgroundColor: idx % 2 === 0 ? 'white' : 'rgba(11,28,61,0.02)',
              }}
            >
              <td
                className="p-3 text-sm"
                style={{ color: 'var(--dark)', fontWeight: 500 }}
              >
                {book.id}
              </td>
              <td
                className="p-3 text-sm"
                style={{ color: 'var(--primary)', fontWeight: 500 }}
              >
                {book.title}
              </td>
              <td className="p-3 text-sm" style={{ color: 'var(--dark)' }}>
                {book.categoryName || '-'}
              </td>
              <td className="p-3 text-sm text-center" style={{ color: 'var(--dark)' }}>
                {book.downloadCount ?? 0}
              </td>
              <td className="p-3 text-center">
                <span
                  className="inline-block px-2 py-0.5 rounded-full text-xs font-medium"
                  style={{
                    backgroundColor: book.isPublished
                      ? 'rgba(201, 169, 110, 0.15)'
                      : 'rgba(18, 18, 18, 0.08)',
                    color: book.isPublished ? 'var(--secondary)' : 'var(--dark)',
                  }}
                >
                  {book.isPublished ? 'Yes' : 'No'}
                </span>
              </td>
              <td className="p-3 text-center space-x-2 whitespace-nowrap">
                <button
                  onClick={() => onEdit(book)}
                  className="px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
                  style={{
                    backgroundColor: 'var(--secondary)',
                    color: 'var(--primary)',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(book.id)}
                  className="px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
                  style={{
                    backgroundColor: 'var(--primary)',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {books.length === 0 && (
            <tr>
              <td
                colSpan="6"
                className="text-center p-6 text-sm"
                style={{ color: 'var(--dark)', opacity: 0.7 }}
              >
                📚 No books found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}