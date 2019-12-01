# WCT Image Emporium

welcome to WCT's humble and communal first online stash of art, funk, good
vibes, and things of that nature. this project is meant to preserve and
catalogue the cool & aesthetically+pleasing works from the mindwarriors of the
community/movement known as weird celtics twitter as we transcend the various
space and time planes of loving basket ball and making good posts. welcome to
erotic city; check out some code.

rules (more like guidelines, suggestions perhaps):
- smarf for dpoy
- no cops ⛔️
- shoot wet 3s
- wahlburgers must burn

## Getting Started

clone/fork this badboy and start hacking... collaborators are always welcome! you'll
need some keys, though. official recommendation/decree is that you should
probably set up your own resources for local development, since the application
shouldn't depend necessarily on any one set of credentials if it's set up right
(it probably is, but sometimes god is right and man is wrong). ultimately the
whole platform should be pretty content-agnostic, so consider this an invitation
to all, even wetbuckets. if anything in the next few sections on how to get up &
running isn't clear, don't hesitate to beseech your local friendly ghost of john
gode with questions/concerns.

### Prerequisites

here's what you'll need to join the revolution:

```
ruby v2.5.0 or newer
~~node v6.0.0 or newer~~ pending frontend implementation
```

that's about it - whole shebang is intended to run on webpack/react & ruby on
rails

### Installing

1. clone the repo:
`git clone git@github.com:jamescarney3/wct-image-emporium.git`
or
`git clone https://github.com/jamescarney3/wct-image-emporium.git`

2. navigate to project directory and install ruby dependencies:
`bundle install`

3. add a `.env` file to the top level of the project directory with credentials
for a twitter developer account and an aws user role & s3 bucket configured for
full read/write access:
```
# .env

export TWITTER_KEY=<twitter key>
export TWITTER_SECRET=<twitter secret>

export AWS_ACCESS_KEY_ID=<aws access key id>
export AWS_SECRET_ACCESS_KEY=<ok you get the idea>
export S3_BUCKET_ID=<name of your bucket>
export S3_REGION=<probably us-east-1 but you're the boss now>
```

4. add a `.admins.yml` file to the top level of the project directory - this
should be a yaml array of twitter user ids (not @s, not handles) that rails
will use to whitelist users for account creation. can't have just anyone logging
in off the street or utah jazz twitter and giving all the pictures 'rudy gobert
dpoy' tags, no, cannot have that<br>
anyway it should look like this:
```
# .admins.yml

- <your twitter uid>
- <my twitter uid>
- <frasier's twitter uid>
- <etc>
```

5. fire up a local instance by running `rails s` or the rails console by running
`rails c`. run the tests if you want. <br> at some point this part is gonna get
more complicated when there's a frontend and some fancylad startup scripts that
turn everything on at the same time, but for now we're just gonna be thankful
for what god has given us in her infinite wisdom

6. (9) if any of that didn't work or seems bogus, contact me directly, stomping
your little hooves, wailing and gnashing your teeth. please direct all other
inquiries to press@joebiden.com


## Running the tests

*for now:*
run `rails test`

*for later:*
hope you like [jest][jest-url] because that's what we're using when we slap a
client side app on this old war wagon. there will probably be a bash script
that runs both (more? all?) test suites in the project.

## Deployment

chill out, we'll get here when we get here

## Built With

* [ruby on rails][rails-url] - server side persistence and json api
* [react][react-url] - client side application
* [typescript][typescript-url] - for client side type safety
* [webpack][webpack-url] - for transpilation and dev serving
<br><!-- rails ships with webpacker now but shakacode remains on my pay no mind list -->
* [minitest][minitest-url] - back end testing
* [jest][jest-url] - front end testing
<br>
* [rubocop][rubocop-url] - nonlethal back end style enforcement
* [tslint][tslint-url] - possibly lethal front end style enforcement


## Contributing

you're invited to peruse [CONTRIBUTING.md][contributing-url] for details on the
rules of engagement, and how to make pull requests to the project

## Versioning

it's in, like, pre-alpha or whatever right now - eagerly looking forward to
deciding on how versioning will work and bumping the version to 0.0.69 or some
such denotation

## Authors

* **james carney** - *Initial work* - [jamescarney3][gode-gh-url]

also see the list of idea gods who have [contributed][contributors-url] to this
anthropological & art-historical undertaking

## License

this project is licensed under the WTFPL - see the [LICENSE.md][license-url] file
for details... or don't, tbh you should do what you want

## Acknowledgments

* frasier, jaylon, sparty, riffs, wlohaty, luckyspipe, and the rest of the
  righteous & smooth purveyors of psychadelic visuals
* marcus smart - not saying the flagship wahlburgers is gonna burn down if he
  doesn't win dpoy again, but not saying it isn't either
* giphy or something, idk, seems like a similar product but less cool; thanks
  for walking so we could fly

[jest-url]: https://github.com/facebook/jest "you're damn right"
[minitest-url]: https://github.com/seattlerb/minitest "it ships with rails, good enough"
[rails-url]: https://rubyonrails.org/ "dhh thank u king"
[react-url]: https://reactjs.org/ "yeah yeah whatever me and everyone else"
[typescript-url]: https://www.typescriptlang.org/ "as typecast as brendan frasier"
[webpack-url]: https://webpack.js.org/ "pack, pack, pack it up ohhhh shit!"
[rubocop-url]: https://github.com/rubocop-hq/rubocop "sole exception to the no cops rule"
[tslint-url]: https://palantir.github.io/tslint/ "compile bofades"

[gode-gh-url]: https://github.com/jamescarney3 "it's ya boi!"
[contributors-url]: https://github.com/jamescarney3/wct-image-emporium/graphs/contributors "they're all just out of frame, laughing too"

[contributing-url]: CONTRIBUTING.md "more code for the code hole"
[license-url]: LICENSE.md "get outta my face kid"
