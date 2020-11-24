import { useEffect, useState } from 'react'

const Route = ({ path, children }) => {
    const [currentPath, setCurrentPath] = useState(window.location.pathname)

    useEffect(() => {
        const handleLocationChange = () => {
            setCurrentPath(window.location.pathname)
        }

        window.addEventListener('popstate', handleLocationChange)

        return () => {
            window.removeEventListener('popstate', handleLocationChange)
        }
    }, [])

    return currentPath === path ? children : null
}

export default Route
