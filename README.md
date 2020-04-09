# Widgets Api Client

## Introduction

The Widgets Api Client is a web client facilitating widgets management. Some of the activities this application enables users to do include widget creation, widget updating, listing widgets and individual widget deletion. As an extra, you can also browse through other users widgets and you are empowered to search through them using keywords.

The UI is quite intuitive and easy to follow along. This web application actually backed by an API backend where widgets and persisted so users don't lose their wigets even when they log out or close their browser.

This said API actually delegates all data persistence operations to a third party api service. You can read the documentation [here](https://documenter.getpostman.com/view/263900/RztoL8FR). The API is however important for adding necessary credentials and formatting responses and requests.

You can always use this application by visiting [here](https://showoff-widgets-api-client.herokuapp.com/). However to run locally for the sake of contributing or other certain reasons, you can follow the instructions below:

## Installation

First, you will need to clone the repository
```bash
git clone git@github.com:VanPaitin/Showoff-Technical-Test.git
```
Then you cd into it

```bash
cd showoff-technical-test
```

#### Ruby (backend)

You don't need a database to run this application locally. It only included the minimum railties necessary for it to run and your beloved `ActiveRecord` is not part of them.

##### Ruby Version
* 2.6.5 (Though any version not later than `2.5.0` will do. More info on that [here](https://edgeguides.rubyonrails.org/upgrading_ruby_on_rails.html#ruby-versions))

##### Rails Version
* 6.0.2.1

After ensuring you have the necessary ruby and rails version installed, you only need to install the gem dependencies.

```bash
bundle install
```

That should settle all prerequisites regarding backend development and running.

#### Webpack - Frontend

This project uses yarn. Ensure you have yarn installed. If not, simply run...

```bash
brew install yarn
```

Install the necessary yarn packages. This project runs react on rails with a bit of typescript flavor. It is structured though to be fully typed but there were time constraints as at the time of project completion.

```bash
yarn install
```

After this. Your app is set to run and itching fingers can begin to develop. Below is a guideline on starting the development servers.

##### Run the ruby backend server

```bash
bin/rails server -p $PORT
```

...where $PORT can be any valid port numerical port number. If you don't supply this option, it defaults to 3000

##### Running the webpack (frontend) server

Depending on where the scope of development work will be. If you are sure to be tampering only with ruby code, you do not need to run a dedicated development server for webpack. Rails will compile assets for you on the first request keep them stored in memory for your subsequent use. However, if you will be doing active frontend development, it is advisable to run a dedicated webpack server as it will automatically recompile assets on code changes. You will start your webpack server like this...

```bash
bin/webpack-dev-server
```
Assuming you used a $PORT value of 3000, you can visit the app and play around with it at [http://localhost:3000](http://localhost:3000)


### Project Directory Structure

This application is a rails app so it has the typical rails directory structure. To make changes to the frontend portion of the application, simply look in the `app/javascript` folder and make your necessary changes there.

### Environment Variables

This projects uses environment variables to store sensitive keys and customize deploy environments. To do this in development, create a `.env` file at the project root directory and place environment variables there in this format `key=value`. Each entry per line.

In the backend/ruby code, you access them like this:

```ruby
ENV[key]
```
`key` can be a string literal or variable. Example:

```ruby
def set_credentials
  config.client_id = ENV['CLIENT_ID']
end
```
In your javascript code, you can access them like this:

```javascript
process.env.key
```

### Running the tests

```
rspec
```
### Deployment

Any merge to master will trigger a build to heroku

### Contributing

1. [Fork this repo](https://github.com/VanPaitin/Showoff-Technical-Test/fork)

2. Create your feature branch `git checkout -b my-new-feature`

3. Commit your changes `git commit -am 'Add some feature'`

4. Push to the branch `git push origin my-new-feature`

5. Raise a Pull Request
