import { useState, useEffect } from 'react';

// TODO: Exercice 3.1 - Créer le hook useDebounce
// TODO: Exercice 3.2 - Créer le hook useLocalStorage

const useProductSearch = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // TODO: Exercice 4.2 - Ajouter l'état pour la pagination
  const [TotalPages , setTotalPages] = useState(1)
  const [page , setPage] = useState(1)

  const limit = 12


  const fetchProducts = async () => {
    try {
      // TODO: Exercice 4.2 - Modifier l'URL pour inclure les paramètres de pagination
      const skip = limit * (page - 1)
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
  }, [page]);
  // TODO: Exercice 4.2 - Ajouter les dépendances pour la pagination

  // TODO: Exercice 4.1 - Ajouter la fonction de rechargement
  const reloadProducts = () =>{
    setLoading(true);
    console.log('Reloading products...');
    fetchProducts();
  };
  // TODO: Exercice 4.2 - Ajouter les fonctions pour la pagination
  const nextPage = ()=>{
    if (page < TotalPages){
        setPage(page+1)
        setLoading(true);
    }
  }

  const previousPage = ()=>{
    if (page > 1){
      setPage(page -1)
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
    page,
    TotalPages,
    nextPage,
    previousPage,
  };
};

export default useProductSearch;