
function filterSearch() {

    // Get the value from our dropdown filter in our data table.
    let searchFilter = document.getElementById('search-orderid-op')
    let filter = searchFilter.value;



    fetch(`/orderProducts?orderid=${filter}`, {
        method: 'GET'
    }).then(() => {
        // Once the request is received, we should update the web browser's url to reflect the correct page.
        window.history.replaceState("orderProducts", "", `orderProducts?orderid=${filter}`)

        for (let i, j = 0; i = searchFilter.options[j]; j++) {
            if (i.value == filter) {
                i.setAttribute("selected", "selected")
                break;
            }
        }

        // Then refresh the page.
        window.location.reload()
    }
    )
}
