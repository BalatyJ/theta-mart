function deleteOrderProduct(orderProductID) {
    let link = '/delete-orderproduct-ajax/';
    let data = {
        id: orderProductID
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