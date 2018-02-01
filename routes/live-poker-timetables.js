var express = require('express');
var router = express.Router();
const request = require('request');
const cheerio = require('cheerio');
const greenRoom = require('./data/green-room');

const tournamentsGames = [greenRoom];

router.get('/api', (req, res) => {
	const { day } = req.query;
	request('http://en.clubpoker.net/poker-tournaments', (error, response, html) => {

		const tournamentItemDate = itemDate =>
			itemDate.children('.tournamentItemDate').children('.dateInfos');

		const formatText = text =>
			text.text().trim()
		
		const tourneyTitle = title =>
			title.children('.nextOccurrenceResult').children('.tournamentTitle')

		if (!error && response.statusCode == 200) {
			const $ = cheerio.load(html);
			const div = $('#ipsLayout_mainArea').children('.tournamentItem');
			div.map((i, element) => {
				const tournamentsGame = {};
				tournamentsGame.day = formatText($(element).children('.tournamentItemDate').children('.dateDay'))
				if (tournamentsGame.day !== "") {
					tournamentsGame.date = formatText(tournamentItemDate($(element)).children('.date'))
					tournamentsGame.time = formatText(tournamentItemDate($(element)).children('.hour'))
					tournamentsGame.buyIn = formatText($(element).children('.nextOccurrenceResult').children('.buyin'))
					tournamentsGame.tournamentName = formatText(tourneyTitle($(element)))

					if ($(element).children('.nextOccurrenceResult').children('div').children('span').hasClass('tournamentGaranteed')) {
						tournamentsGame.prize = formatText($(element).children('.nextOccurrenceResult').children('div').children('.tournamentGaranteed'))
						tournamentsGame.type = formatText(tourneyTitle($(element)).next().next())
						tournamentsGame.address = formatText(tourneyTitle($(element)).next().next().next())
					} else {
						tournamentsGame.type = formatText(tourneyTitle($(element).next()))
						tournamentsGame.address = formatText(tourneyTitle($(element).next().next()))
					}
					tournamentsGames.push(tournamentsGame);
				}
			});
		}
		if (day === undefined) {
			res.json(tournamentsGames);
		} else {
			let filteredTournamentsGames = [];
			tournamentsGames.map(game => {
					game.day === day ? filteredTournamentsGames.push(game) : false
			})
			res.json(filteredTournamentsGames);
		}
	})
});


module.exports = router;
