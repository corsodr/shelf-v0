import { createContext, useContext, useState, useEffect } from 'react';
import { getCollection, getCollections } from '@/app/lib/collections';

const CollectionsContext = createContext();

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

export const useCollections = () => useContext(CollectionsContext);