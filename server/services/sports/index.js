const axios = require("axios");

function listSports(_, callback) {
  axios.get(`${process.env.API_URL}/sports`)
    .then(resp => {
      const body = resp.data.data.map(sport => {
        return {
          id: sport.id,
          attributes: {
            name: sport.attributes.name,
            description: sport.attributes.description,
            slug: sport.attributes.slug,
            icon: sport.attributes.icon,
          }
        }
      });
      callback(null, { data: body });
    });
};

function searchSport(call, callback) {
  axios.get(`${process.env.API_URL}/sports/${call.request.id}`)
    .then(resp => {
      const body = resp.data.data;
      callback(null, {
        id: body.id,
        attributes: {
          name: body.attributes.name,
          description: body.attributes.description,
          slug: body.attributes.slug,
          icon: body.attributes.icon,
        }
      });
    });
};

module.exports = { listSports, searchSport };
