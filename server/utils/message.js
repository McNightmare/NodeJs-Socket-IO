var generateMessage = (from, text) => {
  return  {
    from,
    text,
    createdAt: new Date().getTime()
  };
};

var generateLocMessage = (from, lat, lon) => {
  return {
    from,
    url: `https://maps.google.com/maps?q=${lat},${lon}`,
    createdAt: new Date().getTime()
  }
}

module.exports = {generateMessage, generateLocMessage};
