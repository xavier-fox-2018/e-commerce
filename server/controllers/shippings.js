const axios = require('axios')
require('dotenv').config()

module.exports = {
    getProvince: function(req, res){
        axios({
            method: 'GET',
            url: 'https://api.rajaongkir.com/starter/province',
            headers: {
                key: process.env.RAJAONGKIR_KEY
            }
        })
        .then((result) => {
            res.status(200).json(result.data.rajaongkir.results)
        }).catch((err) => {
            res.status(500).json(err)
        });
    },
    getCity: function(req, res){
        axios({
            method: 'GET',
            url: `https://api.rajaongkir.com/starter/city?province=${req.params.id}`,
            headers: {
                key: process.env.RAJAONGKIR_KEY
            }
        })
        .then((result) => {
            // console.log(result.data.rajaongkir.results);
            res.status(200).json(result.data.rajaongkir.results)
        }).catch((err) => {
            res.status(500).json(err)
        });
    },
    count: function(req, res){
        axios({
            method: 'POST',
            url: `https://api.rajaongkir.com/starter/cost`,
            headers: {
                key: process.env.RAJAONGKIR_KEY
            },
            data: {
                origin: '153', // kota jaksel (default)
                destination: req.body.shipCity,
                weight: req.body.shipWeight,
                courier: req.body.shipExp
            }
        })
        .then((result) => {
            // console.log(result.data.rajaongkir.results[0].costs);
            res.status(200).json(result.data.rajaongkir.results[0].costs)
        }).catch((err) => {
            res.status(500).json(err)
        });

    }


}