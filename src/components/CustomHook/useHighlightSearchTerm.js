import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const useHighlightSearchTerm = () => {
  const location = useLocation();
  const [highlightedContent, setHighlightedContent] = useState("");

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchTerm = searchParams.get('searchTerm');  // Get the search term from query params

    if (searchTerm) {
      const regex = new RegExp(`(${searchTerm})`, 'gi'); // Create a case-insensitive regex
      setHighlightedContent(
        `Some example content with ${searchTerm}. This is where you would highlight the term ${searchTerm}.`
          .split(regex)
          .map((part, index) =>
            part.toLowerCase() === searchTerm.toLowerCase() ? (
              <span key={index} className="highlight">{part}</span>
            ) : part
          )
      );
    }
  }, [location]);

  return highlightedContent;
};

export default useHighlightSearchTerm;
