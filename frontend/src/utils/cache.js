export const emptyCacheWithRedirect = () => {
    if('caches' in window){
    caches.keys().then((names) => {
            // Delete all the cache files
            names.forEach(name => {
                caches.delete(name);
            })
        });

        // Makes sure the page reloads. Changes are only visible after you refresh.
        window.location.href = window.location.origin
    }
}