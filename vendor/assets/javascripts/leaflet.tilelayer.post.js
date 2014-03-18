L.TileLayer.Post = L.TileLayer.extend({

  getTileUrl: function (coords) {
    var data = {
      x: coords.x,
      y: coords.y,
      z: this._getZoomForUrl(),
      p: this.options.p
    }

    var response = ''

    $.ajax({
      type: "POST",
      beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
      url: "tiles",
      data: data,
      success: function(data, textStatus, jqXHR) {
        response = "data:image/jpeg;base64," + data;
      },
      error: function (xhr, status, e) {
        response = "data:image/png;base64,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"
      },
      async: false,
      timeout: 1000,
      dataType: "text"
    });
    return response;
  }

});

L.tileLayer.post = function (url, options) {
  return new L.TileLayer.Post(url, options);
};
