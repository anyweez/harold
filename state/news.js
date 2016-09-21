const feedread = require('feed-read');
const InMemoryList = require('../base/containers/list');

let nextPId = 1;
// let nextAId = 1;

function ArticleList() {
    let publishers = [{
        name: 'CNN',
        homepage: 'http://www.cnn.com/',
        rss: [
            'http://rss.cnn.com/rss/cnn_world.rss',
            'http://rss.cnn.com/rss/money_latest.rss',
        ],
        logo: 'http://assets.fontsinuse.com/static/use-media-items/28/27013/full-1400x817/5670256f/cnn-logo.png?resolution=0',
    }, {
        name: 'BBC',
        homepage: 'http://www.bbc.com/',
        rss: [
            'http://newsrss.bbc.co.uk/rss/newsonline_uk_edition/world/rss.xml',
            'http://newsrss.bbc.co.uk/rss/newsonline_uk_edition/business/rss.xml',
            'http://newsrss.bbc.co.uk/rss/newsonline_uk_edition/sci/tech/rss.xml',
            'http://newsrss.bbc.co.uk/rss/newsonline_uk_edition/technology/rss.xml',
        ],
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/BBC.svg/2000px-BBC.svg.png',
    }, {
        name: 'Al Jazeera',
        homepage: 'http://www.aljazeera.com/',
        rss: [
            'http://www.aljazeera.com/xml/rss/all.xml',
        ],
        logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/f/f2/Aljazeera_eng.svg/477px-Aljazeera_eng.svg.png',
    }, {
        name: 'Buzzfeed',
        homepage: 'http://www.buzzfeed.com/',
        rss: [
            'http://www.buzzfeed.com/index.xml',
            'http://www.buzzfeed.com/world.xml',
            'http://www.buzzfeed.com/tech.xml',
        ],
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/BuzzFeed.svg/1000px-BuzzFeed.svg.png',
    }, {
        name: 'New York Times',
        homepage: 'http://www.nytimes.com/',
        rss: [
            'http://www.nytimes.com/services/xml/rss/nyt/World.xml',
            'http://feeds.nytimes.com/nyt/rss/Business',
            'http://feeds.nytimes.com/nyt/rss/Technology',
            'http://www.nytimes.com/services/xml/rss/nyt/Sports.xml',
            'http://www.nytimes.com/services/xml/rss/nyt/Science.xml',
            'http://www.nytimes.com/services/xml/rss/nyt/Health.xml',
        ],
        logo: 'https://upload.wikimedia.org/wikipedia/commons/7/77/The_New_York_Times_logo.png',
    }];

    // Periodically grab new articles.
    setInterval(() => {
        publishers.forEach(publisher => {
            publisher.rss.forEach(rss => {
                try {
                    feedread(rss, (err, articles) => {
                        if (err) return console.error('Error fetching stories: ' + err);

                        articles.reverse().forEach(article => {
                            this.add(new Article(article));
                        });
                    });
                } catch (e) {
                    console.error('Error fetching news: ' + e);
                }
            });
        });
    }, 10000 + Math.random() * 1000);
}

function Article(settings) {
    // this.id = nextAId++;
    this.title = settings.title || 'unknown';
    this.published = settings.published || null;
    this.link = settings.link || '';
    // this.providerId = settings.providerId || null;

    return this;
}


ArticleList.prototype = new InMemoryList();
module.exports = ArticleList;

/*

function Article(settings) {
    this.id = nextAId++;
    this.title = settings.title || 'unknown';
    this.published = settings.published || null;
    this.link = settings.link || '';
    this.providerId = settings.providerId || null;

    return this;
}

function Provider(settings, log) {
    this.id = nextPId++;
    this.name = settings.name || 'none';
    this.rss = settings.rss || [];
    this.homepage = settings.homepage || '';
    this.logo = settings.logo || '';

    var self = this;

    // Start regularly polling each of the provided RSS feeds and parsing the response.
    setInterval(function () {
        self.rss.forEach(function (url) {
            try {
                feedread(url, function (err, articles) {
                    if (err) {
                        console.error('Error fetching stories: ' + err);
                        return;
                    }
                    
                    articles.reverse().forEach(function (article) {
                        article.providerId = self.id;
                        log.add(new Article(article));
                    });
                });
            } catch (e) {
                console.error(`Parse error on [${url}]: ${e}`);
            }
        });
    }, 10000 + (Math.random() * 1000)); // add some randomness so everything doesn't come in together

    return this;
}

function NewsLog(clients) {
    this.articles = [];
    this.existingArticles = new Set();
    this.providers = [];
    this.notify = null;

    // set up a bunch of providers!
    this.providers.push(new Provider({
        name: 'CNN',
        homepage: 'http://www.cnn.com/',
        rss: [
            'http://rss.cnn.com/rss/cnn_world.rss',
            'http://rss.cnn.com/rss/money_latest.rss',
        ],
        logo: 'http://assets.fontsinuse.com/static/use-media-items/28/27013/full-1400x817/5670256f/cnn-logo.png?resolution=0',
    }, this));

    this.providers.push(new Provider({
        name: 'BBC',
        homepage: 'http://www.bbc.com/',
        rss: [
            'http://newsrss.bbc.co.uk/rss/newsonline_uk_edition/world/rss.xml',
            'http://newsrss.bbc.co.uk/rss/newsonline_uk_edition/business/rss.xml',
            'http://newsrss.bbc.co.uk/rss/newsonline_uk_edition/sci/tech/rss.xml',
            'http://newsrss.bbc.co.uk/rss/newsonline_uk_edition/technology/rss.xml',
        ],
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/BBC.svg/2000px-BBC.svg.png',
    }, this));

    this.providers.push(new Provider({
        name: 'Al Jazeera',
        homepage: 'http://www.aljazeera.com/',
        rss: [
            'http://www.aljazeera.com/xml/rss/all.xml',
        ],
        logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/f/f2/Aljazeera_eng.svg/477px-Aljazeera_eng.svg.png',
    }, this));

    this.providers.push(new Provider({
        name: 'Buzzfeed',
        homepage: 'http://www.buzzfeed.com/',
        rss: [
            'http://www.buzzfeed.com/index.xml',
            'http://www.buzzfeed.com/world.xml',
            'http://www.buzzfeed.com/tech.xml',
        ],
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/BuzzFeed.svg/1000px-BuzzFeed.svg.png',
    }, this));

    this.providers.push(new Provider({
        name: 'New York Times',
        homepage: 'http://www.nytimes.com/',
        rss: [
            'http://www.nytimes.com/services/xml/rss/nyt/World.xml',
            'http://feeds.nytimes.com/nyt/rss/Business',
            'http://feeds.nytimes.com/nyt/rss/Technology',
            'http://www.nytimes.com/services/xml/rss/nyt/Sports.xml',
            'http://www.nytimes.com/services/xml/rss/nyt/Science.xml',
            'http://www.nytimes.com/services/xml/rss/nyt/Health.xml',
        ],
        logo: 'https://upload.wikimedia.org/wikipedia/commons/7/77/The_New_York_Times_logo.png',
    }, this));
}

NewsLog.prototype.publishers = function (filters) {
    return this.providers.map(function (provider) {
        return {
            id: provider.id,
            name: provider.name,
            homepage: provider.homepage,
            logo: provider.logo,
        };
    });
};

NewsLog.prototype.stories = function () {
    return this.articles;
};

NewsLog.prototype.add = function (article) {
    // Check whether this article already exists in the stack.
    if (!this.existingArticles.has(article.link)) {
        // Check if we're at capacity and remove the oldest article if so.
        if (this.articles.length >= 25) this.articles.shift();

        console.log(`adding article "${article.title}" from provider #${article.providerId}`);
        // store in local array
        this.articles.push(article);
        this.existingArticles.add(article.link);
        
        if (this.notify) {
            this.notify.forEach(function (ws) {
                ws.send(JSON.stringify(article));
            })
        }
    }
};

module.exports = (function () {
    return {
        new: function () {
            return new NewsLog();
        },
    };
} ());
*/