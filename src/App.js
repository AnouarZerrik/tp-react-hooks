import React, { createContext, useState } from 'react';
import ProductList from './components/ProductList';
import ProductSearch from './components/ProductSearch';
import ThemeToggle from './components/ThemeToggle';

// TODO: Exercice 2.1 - Créer le LanguageContext

export const ThemeContext = createContext();
export const LangueContext = createContext();
const App = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  // TODO: Exercice 2.2 - Ajouter l'état pour la langue
  const [language, setLanguage] = useState('fr');

  return (
    <ThemeContext.Provider value={{ isDarkTheme, setIsDarkTheme }}>
      <LangueContext value={{ language, setLanguage }}>
        <div className={`container ${isDarkTheme ? 'bg-dark text-light' : 'bg-light'}`}>
          <header className="my-4">
            <h1 className="text-center">{language === "fr" ? "Catalogue de Produits" : "Prodcuts Catalogue"}</h1>
            <div className="d-flex justify-content-end gap-1">
              <ThemeToggle />
              {/* TODO: Exercice 2.2 - Ajouter le sélecteur de langue */}
              <div className="col-md-2">
                <select 
                className={`form-select px-5 py-2 rounded ${ isDarkTheme ? 'bg-dark text-light border border-light' : 'bg-light text-dark border border-dark' }`}
                aria-label="Language selector" 
                value={language} 
                onChange={(e) => setLanguage(e.target.value)}>
                  <option value="en">English</option>
                  <option value="fr">French</option>
                </select>
              </div>
            </div>
          </header>
          <main>
            <ProductSearch />
            <ProductList />
          </main>
        </div>
      </LangueContext>
    </ThemeContext.Provider>
  );
};

export default App
