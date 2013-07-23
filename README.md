# Leaflet::Zoomslider::Rails

Integrates the [leaflet-zoomslider] plugin with the asset pipeline

## Installation

Add this line to your application's Gemfile:

    gem 'leaflet-zoomslider-rails'

And then execute:

    $ bundle

Or install it yourself as:

    $ gem install leaflet-zoomslider-rails

## Usage

Add the following to your `app/assets/javascripts/application.js`:

    //= require leaflet.zoomslider
    
Add the following to your `app/assets/stylesheets/application.css`:

    *= require leaflet.zoomslider
    *= require leaflet.zoomslider.ie
    
Examples can be found at [kartena]

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

## License
MIT License, full text of license see [here][License]

*Free Software, Fuck Yeah!*

[License]: https://github.com/kendrikat/leaflet-zoomslider-rails/blob/master/LICENSE.txt "LICENSE"
[leaflet-zoomslider]: https://github.com/kartena/Leaflet.zoomslider
[kartena]: https://github.com/kartena/Leaflet.zoomslider/tree/master/examples
