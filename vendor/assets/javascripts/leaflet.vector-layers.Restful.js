lvector.Restful = lvector.GeoJSONLayer.extend({
    initialize: function(options) {

        // Check for required parameters
        for (var i = 0, len = this._requiredParams.length; i < len; i++) {
            if (!options[this._requiredParams[i]]) {
                throw new Error("No \"" + this._requiredParams[i] + "\" parameter found.");
            }
        }

        // If the url wasn't passed with a trailing /, add it.
        if (options.url.substr(options.url.length - 1, 1) !== "/") {
            options.url += "/";
        }

        // Extend Layer to create Restful
        lvector.Layer.prototype.initialize.call(this, options);

        // _globalPointer is a string that points to a global function variable
        // Features returned from a JSONP request are passed to this function
        this._globalPointer = "Restful_" + Math.floor(Math.random() * 100000);
        window[this._globalPointer] = this;

        // Create an array to hold the features
        this._vectors = [];

        if (this.options.map) {
            if (this.options.scaleRange && this.options.scaleRange instanceof Array && this.options.scaleRange.length === 2) {
                var z = this.options.map.getZoom();
                var sr = this.options.scaleRange;
                this.options.visibleAtScale = (z >= sr[0] && z <= sr[1]);
            }
            this._show();
        }
    },

    options: {
        spatialQuery: 'attributes',
        table: null,
        project: null,
        srid: null,
        geomFieldName: null,
        geomPrecision: null,
        fields: null,
        where: null,
        limit: null,
        order: null,
        uniqueField: null,
        showAll: null
    },

    _requiredParams: ["url", "table", "project"],

    _getFeatures: function() {
        if (!this.options.map) {
            return; // The layer is not present on the map, so do nothing.
        }
        // Build URL
        var url = this.options.url + "query" + // The postgis query server endpoint
            "?spatialquery=" + this.options.spatialQuery + // the attribute query service
            "&table=" + this.options.table + // the source gis table
            "&project=" + this.options.project + // the source project
            "&format=json" + // JSON please
            "&callback=" + this._globalPointer + "._processFeatures"; // Need this for JSONP

        if (!this.options.showAll) {
            var bounds = this.options.map.getBounds();
            var sw = bounds.getSouthWest();
            var ne = bounds.getNorthEast();
            var minx = sw.lng
            var miny = sw.lat
            var maxx = ne.lng
            var maxy = ne.lat
            url += "&minx=" + encodeURIComponent(minx) // sw lng
            url += "&miny=" + encodeURIComponent(miny) // sw lat
            url += "&maxx=" + encodeURIComponent(maxx) // ne lng
            url += "&maxy=" + encodeURIComponent(maxy) // ne lat
        }

        if (this.options.geomFieldName) {
            url += "&the_geom=" + encodeURIComponent(this.options.geomFieldName);
        }

        if (this.options.srid) {
            url += "&srid=" + encodeURIComponent(this.options.srid);
        }

        if (this.options.fields) {
            url += "&fields=" + encodeURIComponent(this.options.fields);
        }

        if (this.options.geomPrecision) {
            url += "&precision=" + encodeURIComponent(this.options.geomPrecision);
        }

        if (this.options.where) {
            url += "&where=" + encodeURIComponent(this.options.where);
        }

        if (this.options.order) {
            url += "&order=" + encodeURIComponent(this.options.order);
        }

        if (this.options.limit) {
            url += "&limit=" + encodeURIComponent(this.options.limit);
        }

        // JSONP request
        this._makeJsonpRequest(url);
    }

});
