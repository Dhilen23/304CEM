const mongoose = require ( 'mongoose' ); 


const db = "mongodb+srv://Dhilboo:D12345@heroesmov.qezv1gl.mongodb.net/?retryWrites=true&w=majority";
mongoose . connect (db) . then (() =>{

    console . log("Connected to database");

} ) . catch(() => { console . log ("Error Connecting to Database");

})

const heroSchema = new mongoose . Schema ({
    movieTitle : {type : String },
    movieActors : {type : String },
    movieYear : {type : String },
    movieDirector : {type : String },
    movieWriter : {type : String },
    heroName : {type : String },
    heroGender : {type : String },
    heroRace : {type : String },
    heroOccupation : {type : String },
    heroRelatives : {type : String }
}
);

const Record = mongoose . model ('movies', heroSchema);
module . exports = Record;