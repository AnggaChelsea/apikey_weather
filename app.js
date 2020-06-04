const express = require('express');
const https = require('https')
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended:true}))

//untuk get '/' ialah suati Root halaman pertama chrome, 
app.get('/', (req, res)=>{

    res.sendFile(__dirname + '/index.html');
})
    app.post('/', (req,res)=>{
    const namanya = req.body.namamu;
    const cityName = req.body.InputCity;
    const apiKey = 'e60f7c38746ebbb8500179aa300754e9';
    //dan di bawah ini url apikey weather yang telah saya ambil dari web resminya, menggunakan node https
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid='+ apiKey;
    //untuk https get ini suatu call back / function yang nanti bisa di panggil untuk parameter responnya
    https.get(url, (response)=>{

        console.log(response.statusCode);
    //respone disini mengambil dari arrow function di atas yatu function https.get url apikeynya dan di tambah string data
    //string data disini saya mengambil dari link apikeynya yaitu ambil data
    //untuk parameter saya tambhakan data untuk pemanggilan selanjutnya 
    response.on('data', (data)=>{
        //dan variable weatherData di bawah ini saya ngambil dari parameter di atas dan di olah menjadi json.parse
        const weatherData = JSON.parse(data);
        // variable temp disini saya mengambil dari variable json dan di salam variable json itu ada data apikey
        //nah cara ngambil data apikey kita langsung mengunjungi url dan menggunakan extension json viewer beauty dan copy path 
        const temp = weatherData.main.temp;

        const icon = weatherData.weather[0].icon;
        const imgicon = ' http://openweathermap.org/img/wn/' + icon + '@2x.png';

        const weatherDescription = weatherData.weather[0].description;

        console.log(weatherDescription)
        res.write("<h1>hai kak " + namanya + " </h1>")
        res.write("<p><h3>cuaca hari ini di " + cityName + " " + temp + " Derajat celcius  </p></h3>")
        res.write("<img src=" + imgicon + ">")
        res.send()
    })
    })
})




app.listen(1220,()=>{
    console.log('server telah run di localhost:1200');
})