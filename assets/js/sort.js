document.addEventListener('DOMContentLoaded', function() {
    const sortButton = document.getElementById('sortButton');
    const nameList = document.getElementById('nameList');
    let isSorted = false;
    let originalOrder = Array.from(nameList.children).map(li => li.cloneNode(true));

    sortButton.addEventListener('click', function() {
        const items = Array.from(nameList.children);
        
        if (!isSorted) {
            // Sort alphabetically
            items.sort((a, b) => a.textContent.localeCompare(b.textContent));
            sortButton.textContent = 'Restore Original Order';
        } else {
            // Restore original order
            items.sort((a, b) => {
                const aIndex = originalOrder.findIndex(li => li.textContent === a.textContent);
                const bIndex = originalOrder.findIndex(li => li.textContent === b.textContent);
                return aIndex - bIndex;
            });
            sortButton.textContent = 'Sort Alphabetically';
        }
        
        // Clear and re-add items in new order
        nameList.innerHTML = '';
        items.forEach(item => nameList.appendChild(item));
        
        isSorted = !isSorted;
    });
});