import { createContext, useContext, useState, useEffect } from 'react';
import { getCollection, getCollections } from '@/app/lib/collections';

const CollectionsContext = createContext(null);

export function CollectionsProvider({ children }) {
    const [collections, setCollections] = useState([]);
    const [currentCollection, setCurrentCollection] = useState(null);

    useEffect(() => {
        fetchCollections();
    }, []);

    const fetchCollections = async () => {
        const fetchedCollections = await getCollections();
        // should I use a callback here? 
        setCurrentCollection(fetchedCollections);
    }

    const fetchCollection = async () => {
        const fetchedCollection = await getCollection(id);
        setCurrentCollection(fetchedCollection);
    }

    return (
        <CollectionsContext.Provider value={{
            collections,
            currentCollection,
            fetchCollection,
        }}>
            {children}
        </CollectionsContext.Provider>
    )

}

// is this a custom hook 
export const useCollectionsContext = () => useContext(CollectionsContext);