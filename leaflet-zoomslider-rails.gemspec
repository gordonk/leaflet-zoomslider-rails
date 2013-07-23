# -*- encoding: utf-8 -*-
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'leaflet-zoomslider-rails/version'

Gem::Specification.new do |gem|
  gem.name          = "leaflet-zoomslider-rails"
  gem.version       = Leaflet::Zoomslider::Rails::VERSION
  gem.authors       = ["Klaas Endrikat"]
  gem.email         = ["klaas.endrikat@googlemail.com"]
  gem.description   = %q{Integrate the Leaflet ZoomSlider plugin into the Rails asset pipeline}
  gem.summary       = %q{Leaflet ZoomSlider plugin for Rails}
  gem.license       = 'MIT'
  gem.homepage      = "https://github.com/kendrikat/leaflet-zoomslider-rails"

  gem.files         = `git ls-files`.split($/)
  gem.executables   = gem.files.grep(%r{^bin/}).map{ |f| File.basename(f) }
  gem.test_files    = gem.files.grep(%r{^(test|spec|features)/})
  gem.require_paths = ["lib"]
end
