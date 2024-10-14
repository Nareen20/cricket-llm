const axios = require('axios');
const cheerio = require('cheerio');

const getRankings = async () => {
  try {
    const { data } = await axios.get('https://www.cricbuzz.com/cricket-stats/icc-rankings/men');
    const $ = cheerio.load(data);

    const rankings = {
      t20: {
        batting: [],
        bowling: [],
        all_rounders: []
      },
      odi: {
        batting: [],
        bowling: [],
        all_rounders: []
      },
      test: {
        batting: [],
        bowling: [],
        all_rounders: []
      }
    };

    $('.cb-col.cb-col-100.cb-ltst-wgt-hdr').each((index, element) => {
      const format = $(element).find('.cb-font-16').text().trim().toLowerCase();
      const category = $(element).find('.cb-ltst-wgt-hdr').text().trim().toLowerCase();

      $(element).find('.cb-col.cb-col-100.cb-plyr-rank').each((i, el) => {
        const player = $(el).find('.cb-font-16 a').text().trim();
        const rating = $(el).find('.cb-col.cb-col-17').text().trim();
        rankings[format][category].push({ serial_number: i + 1, player, rating });
      });
    });

    return rankings;
  } catch (error) {
    console.error('Error fetching rankings:', error);
    throw error;
  }
};

getRankings().then(rankings => console.log(rankings));
