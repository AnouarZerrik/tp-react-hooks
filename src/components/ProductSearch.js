import React, { useState, useContext, useEffect } from 'react';
import { LangueContext, ThemeContext } from '../App';
import useDebounce from '../hooks/useDebounce';


const ProductSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { isDarkTheme } = useContext(ThemeContext);
  // TODO: Exercice 2.1 - Utiliser le LanguageContext
  const {language} = useContext(LangueContext)
  // TODO: Exercice 1.2 - Utiliser le hook useDebounce
  const debouncedSearchTerm = useDebounce(searchTerm, 1000);
  
    useEffect(() => {
        console.log('Recherche:', debouncedSearchTerm)
    }, [debouncedSearchTerm])
    
  return (
    <div className="mb-4">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={`${language ==="fr" ? "Rechercher un produit..." : "Search for a product..."}`}
        className={`form-control ${isDarkTheme ? 'bg-dark text-light' : ''}`}
      />
    </div>
  );
};

export default ProductSearch;