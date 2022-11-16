const Record = require('./Connect');
const express = require('express');
const app = express();
const axios = require ('axios');
var Title, Year, Actors, Director, Writer;
var heroName, heroGender, heroRace, heroOccupation, heroRelatives;
var output;

const apikey = '275c79ff';

app.get('/SearchtheMovie',(req,res)=>{
    const title = req.query.title;
    const querystr = `http://www.omdbapi.com/?t=${title}&apikey=${apikey}`;
    axios.get(querystr).then((response)=>{
    Title = response.data.Title;
    Year = response.data.Year;
    Actors = response.data.Actors;
    Director = response.data.Director;
    Writer = response.data.Writer;
    
    const movie = response.data.Title;

    const querystr2 = `https://www.superheroapi.com/api.php/6201247949888573/search/${movie}`;

    axios.get(querystr2).then( (response) =>{

        heroName = response.data.results[0].name;
        heroGender = response.data.results[0].appearance.gender;
        heroRace = response.data.results[0].appearance.race;
        heroOccupation = response.data.results[0].work.occupation;
        heroRelatives = response.data.results[0].connections.relatives;

    filmValue = new Record({
        movieTitle:Title,
        movieYear:Year,
        movieActors:Actors,
        movieDirector:Director,
        movieWriter:Writer,
        heroName:heroName,
        heroGender:heroGender,
        heroRace:heroRace,
        heroOccupation:heroOccupation,
        heroRelatives:heroRelatives
    });
    
    
    filmValue.save().then(result=>{



        console.log("Success"+result);
    }).catch(error=>{

        console.log("Error"+error);
    });
    
    res.send("<p><b>Title of the Movie:</b></p>" + Title + "<p><b>Released Year of the Movie:</b></p>" + Year + "<p><b>Actors in the Movie:</b></p>" + Actors +
    "<p><b>Director of the Movie:</b></p>" + Director + "<p><b>Writer of the Movie:</b></p>" + Writer + "<p><b>Name of the Hero:</b></p>" + heroName +
    "<p><b>Gender of the Hero:</b></p>" + heroGender + "<p><b>Race of the Hero:</b></p>" + heroRace + "<p><b>Occupation of the Hero:</b></p>" + heroOccupation + 
    "<p><b>Relatives/Family of the Hero:</b></p>" + heroRelatives + "<br><br><br>" + "<b>RECORD IS SUCCESSFULLY STORED!</b>");
}
    );
        
    }
    );



    });

    app.get('/DeletetheMovie',(req,res)=>{

        const title = req.query.title;
        console.log(title);
        Record.deleteOne({Title: Title},function(err){
            if (err) return handleError(err);
        });
    
    res.send(title + " the movie has been deleted from the database!");    
    });
    
    app.get('/DeletealltheMovies', (req,res)=>{
        const title = req.query.title;
        console.log(title);
        Record.deleteMany(function (err){
            if (err) return handleError(err);
        });
    
        res.send(title + "All movies has been deleted from the database!");
    
    });
    
    Record.updateOne({movieTitle: 'Batman'}, {movieDirector: 'Harsvin'},function(err,res){
    
    
    });
    
    app.listen(5000);