var expect = require('expect');

var {generateMessage, generateLocMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    var from = 'Jen';
    var text = 'Some message';
    var message = generateMessage(from, text);

    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({from, text});
  });
});

describe('generateLocMessage', () => {
  it('should generate correct location object', () => {
    var from = 'Deb';
    var lat = 15;
    var lon = 19;
    var url = 'https://maps.google.com/maps?q=15,19';
    var message = generateLocMessage(from, lat, lon);

    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({from, url});
  });
});
