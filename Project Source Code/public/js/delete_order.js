// Citation for delete data:
// Date: 10/27/2022
// Adapted from:
// https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%207%20-%20Dynamically%20Deleting%20Data

function deleteOrder(orderID) {
    // We set up our ajax request, where we include the orderid as data, and send a request to our app.js
    // as a DELETE request. Once the request has successfully returned, the webpage is refreshed.

    let link = '/delete-order-ajax/';
    let data = {
        id: orderID
    };

    $.ajax({
        url: link,
        type: 'DELETE',
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            window.location.reload(true);
        }
    });
}
