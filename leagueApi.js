  const express = require('express')
  const axios = require('axios')
  const app = express();
  const riotApiKey = require('./apikey');
  const apiKey = require('./apikey');
  const findChampionName = require('./findChampionName');
  const localDateTime = require('./calculateCurrentDateFunction.js')

//https://br1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/%s?api_key=RGAPI-27ba8515-a52c-4a85-b628-45348087d497
//i4aAh2w-YFjwPKJl67eL_EPXERiZwwcpYxp-C766M81UcoABu7EVAizBZnbGaS2dzanXyLSC8kHQZA
//localhost:8080/getSummonerMasteries/i4aAh2w-YFjwPKJl67eL_EPXERiZwwcpYxp-C766M81UcoABu7EVAizBZnbGaS2dzanXyLSC8kHQZA

  app.use(express.json());

  
  app.get('/getSummonerInfos/:name', async function(req, res){
    const { name } = req.params;
    const url = `https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}?api_key=${riotApiKey}`

    try {
      const response = await axios.get(url)
      const userData = getUserData({data: response.data});
      res.json(userData)
    } catch(error){
      res.status(500).json({error: "Erro ao buscar invocador"})
    }

  })

  app.get('/getSummonerMasteries/:puuid', async function(req, res){
    const { puuid } = req.params;
    const url = `https://br1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/${puuid}?api_key=${apiKey}`

    try {
      const response = await axios.get(url)
      const masteriesData = response.data
      const champions = masteriesData.map((element) => {
        return {
          "Id do campeão ": element.championId,
          "Nome do campeão ": findChampionName(element.championId),
          "Nível de maestria do campeão: ": element.championLevel,
          "Última vez que jogou com esse campeão: ": localDateTime(element.lastPlayTime)
        }
      })
      res.json(champions)
    } catch(error){
      res.status(500).json({error: "Erro ao buscar maestria de invocador."})
    }
    
  })

  app.get('/getSummonerTotalMastery/:name', async function(req, res){
    const { name } = req.params
    const url = `https://br1.api.riotgames.com/lol/champion-mastery/v4/scores/by-puuid/${name}?api_key=${apiKey}`

    try {
    const response = await axios.get(url);
    const totalMastery = response.data;
    res.json({
      'Os pontos de maestria total do usuário são ': totalMastery})
    } catch (error){
      res.status(500).json({error: "Erro ao buscar maestria total de usuário."})
    }
  })





  app.listen(8080, function(){
    console.log('Running');
  })


  function getUserData({data}){
    return {
    'ID do invocador': data.id,
    'Nome do invocador': data.name,
    'Nivel do invocador': data.summonerLevel
    }
  }
  
  
 