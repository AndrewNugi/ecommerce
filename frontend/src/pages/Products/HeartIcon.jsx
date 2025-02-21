import { FaHeart, FaRegHeart } from "react-icons/fa"
import { useSelector, useDispatch } from "react-redux"
import { addToFavorites, removeFromFavorites, setFavorites } from "../../redux/features/favorites/favoriteSlice"
import { addFavoriteFromLocalStorage, getFavoritesFromLocalStorage, removeFavoriteFromLocalStorage } from "../../utils/localStorage"
import { useEffect } from "react"

const HeartIcon = ({product}) => {

    const dispatch = useDispatch()
    const favorites = useSelector(state => state.favorites) || []
    const isFavorite = favorites.some((p) => p._id == product._id)

    useEffect (() => {
        const favoritesFromLocalStorage = getFavoritesFromLocalStorage()
        dispatch(setFavorites(favoritesFromLocalStorage))
    }, [])

    const toggleFavorites = () => {
        if (isFavorite) {
            dispatch(removeFromFavorites(product))
            //Remove product from local storage
            removeFavoriteFromLocalStorage(product._id)

            
        } else {
            dispatch(addToFavorites(product))
            // Add product to local storage 
            addFavoriteFromLocalStorage(product)
        }
    }

  return <div onClick={toggleFavorites} className="absolute top-2 right-5 cursor-pointer">
    {isFavorite ? (<FaHeart className="text-pink500" />
    ) : (
        <FaRegHeart className="text-black" />

    )}
  </div>
}

export default HeartIcon
