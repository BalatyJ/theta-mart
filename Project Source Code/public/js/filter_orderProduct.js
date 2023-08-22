
function filterSearch() {

    // Get the value from our dropdown filter in our data table.
    let searchFilter = document.getElementById('search-orderid-op')
    let filter = searchFilter.value;


    // We send a request to our express server asking for data from OrderProducts filtered by the value in filter.
    fetch(`/orderProducts?orderid=${filter}`, {
        method: 'GET'
    }).then(() => {
        // Once the request is received, we should update the web browser's url to the page that has the correctly rendered information.
        window.history.replaceState("orderProducts", "", `orderProducts?orderid=${filter}`)

        // Then refresh the page to show the rendered page.
        window.location.reload()
    }
    )
}
