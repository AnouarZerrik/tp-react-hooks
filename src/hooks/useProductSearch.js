import { useState, useEffect } from 'react';

// TODO: Exercice 3.1 - Créer le hook useDebounce
// TODO: Exercice 3.2 - Créer le hook useLocalStorage

const useProductSearch = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // TODO: Exercice 4.2 - Ajouter l'état pour la pagination
  const [TotalPages , setTotalPages] = useState(1)
  const [currentPage , setCurrentPage] = useState(1)

  const limit = 12


  const fetchProducts = async () => {
    try {
      // TODO: Exercice 4.2 - Modifier l'URL pour inclure les paramètres de pagination
      const skip = limit * (currentPage - 1)
      const response = await fetch(`https://api.daaif.net/products?delay=600&limit=${limit}&skip=${skip}`);
      if (!response.ok) throw new Error('Erreur réseau');
      const data = await response.json();

      if(data.total){
        console.log(data.total)
        setTotalPages(Math.ceil(data.total / limit))
      }

      setProducts(data.products);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [currentPage]);
  // TODO: Exercice 4.2 - Ajouter les dépendances pour la pagination

  // TODO: Exercice 4.1 - Ajouter la fonction de rechargement
  const reloadProducts = () =>{
    setLoading(true);
    fetchProducts();
  };
  // TODO: Exercice 4.2 - Ajouter les fonctions pour la pagination
  const nextPage = ()=>{
    if (currentPage < TotalPages){
        setCurrentPage(currentPage+1)
        setLoading(true);
    }
  }

  const previousPage = ()=>{
    if (currentPage > 1){
      setCurrentPage(currentPage -1)
      setLoading(true);
    }
  }


  return { 
    products, 
    loading, 
    error,
    // TODO: Exercice 4.1 - Retourner la fonction de rechargement
    reloadProducts,
    // TODO: Exercice 4.2 - Retourner les fonctions et états de pagination
    currentPage,
    TotalPages,
    nextPage,
    previousPage,
  };
};

export default useProductSearch;