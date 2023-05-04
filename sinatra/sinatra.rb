require 'sinatra'
require 'debug'

before do
  response.headers['Access-Control-Allow-Origin'] = '*'
end

get '/' do
  'hello world'
end

get '/geojson/:fileName' do
  File.open("./data/#{params['fileName']}.geojson").read()
end
