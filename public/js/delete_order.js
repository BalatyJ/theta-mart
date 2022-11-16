function deleteOrder(orderID) {
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
