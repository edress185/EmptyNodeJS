/**
 * Created by Gebruiker on 07/04/2017.
 */
var chai = require('chai');
var expect = chai.expect;

describe('Testing via Selenium', function () {
    var selenium;
    var selenuimProcess;
    var client;

    before(function (done) {

        //Start the selenium server
        selenium = require('selenium-standalone');
        selenium.install({
                // check for more recent versions of selenium here:
                // https://selenium-release.storage.googleapis.com/index.html
                version: '3.0.1',
                baseURL: 'https://selenium-release.storage.googleapis.com'

            }, function () {

                selenium.start({
                    spawnOptions: {
                        //don't show the logging output of the server... We are not interested in this.
                        stdio: 'ignore'
                    },
                    version: '3.0.1'
                }, function (err, child) {
                    //we need this to stop the process againd
                    selenuimProcess = child;
                    console.log("Started seleniumserver");
                    // Use webdriverjs to create a Selenium Client
                    try {
                        client = require('webdriverio').remote({
                            desiredCapabilities: {
                                // You may choose other browsers
                                // http://code.google.com/p/selenium/wiki/DesiredCapabilities
                                browserName: 'google-chrome',
                                pageLoadStrategy: 'eager'
                            },
                            // webdriverjs has a lot of output which is generally useless
                            // However, if anything goes wrong, remove this to see more details
                            logLevel: 'silent'
                        });
                        client = client.init();
                        client.url('http://localhost:3000').then(function () {
                            done();
                        });
                    } catch (e) {
                        console.log(e);
                    }
                })
            }
        );
    });

    describe('only test', function () {
        describe('Check homepage', function () {
            it('Should load orders', function (done) {
                client.click('a[href="/showorders"]').then(function (e) {
                    console.log("clicked");
                })
                    .pause(100)
                    .getText('h1').then(function (text) {
                    expect(text.toLowerCase()).to.equal('open tables');
                })
            })
        });
    });

        after(function (done) {

            done();
        });
    });
