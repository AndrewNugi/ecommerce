// Add a product to local storage
export const addFavoriteFromLocalStorage =(product) => {
    const favorites = getFavoritesFromLocalStorage()
    if (!favorites.some((p) => p._id == product._id)) {
        favorites.push(product)
        localStorage.setItem('favorites', JSON.stringify(favorites))
    }
}

// Remove product
export const removeFavoriteFromLocalStorage = (productId) => {
    const favorites = getFavoritesFromLocalStorage()
    const updateFavorites = favorites.filter(
        (product) => product._id !== productId)
    localStorage.setItem('favorites', JSON.stringify(updateFavorites))
}


// Retrieve favorites from local storage
export const getFavoritesFromLocalStorage = () => {
    const favoriteJSON = localStorage.getItem('favorites')
    return favoriteJSON ? JSON.parse(favoriteJSON) :[]
}