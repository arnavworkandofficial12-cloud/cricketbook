require('dotenv').config()
const express = require('express');
const app = express();
app.use(express.json());
const morgan = require('morgan');
app.use(morgan('tiny'));
const mongoose = require('mongoose');
const Cricketer = require('./mongo');

app.get('/api/players', (request, response, next) => {
    Cricketer.find({}).then(notes => {
        response.json(notes);
    })
        .catch(
            error => next(error)
        )
});


const PORT = process.env.PORT;
app.listen(PORT, () => { console.log(`Server running on  http://localhost:3001/api/players`) });


app.get('/api/players/:id', (request, response, next) => {
    const playername = Cricketer.findById(request.params.id)
        .then(
            playername => {
                if (playername) {
                    response.json(playername);
                }
                else {
                    response.status(404).json({
                        error: "player id not avialable"
                    })
                }
            }
        )
        .catch(error => next(error));

})

app.delete('/api/players/:id', (request, response, next) => {
    Cricketer.findByIdAndDelete(request.params.id)
        .then(
            result => {
                response.status(204).end();
            }
        )
        .catch(error => next(error));
})

app.post('/api/players', (request, response, next) => {
    const body = request.body;

    if (!body.name) {
        return response.status(400).json({
            error: "playername not available"
        })
    }
    else if (!body.battingposition) {
        return response.status(400).json({
            error: "battingposition not available"
        })
    }
    else {
        const newplayer = new Cricketer({
            "name": body.name,
            "battingposition": body.battingposition,
        });
        newplayer.save().then(
            newplayer => {
                response.json(newplayer);
            }
        )
            .catch(error => next(error));

    }
})

app.put('/api/players/:id', (request, response, next) => {
    const { name, battingposition } = request.body;

    Cricketer.findById(request.params.id)
        .then(
            cricketer => {
                if (!cricketer) {
                    return response.status(400).send({
                        error: "cricketer not found"
                    })
                }
                else {
                    cricketer.name = name;
                    cricketer.battingposition = battingposition;

                    return cricketer.save().then(
                        result => {
                            response.json(result);
                        }

                    )
                }

            }
        )
        .catch(error => next(error));
})



const errorhandler = (error, request, response, next) => {
    console.log(error.message);
    if (error.name === "CastError") {
        return response.status(400).send({
            error: "malinformed id"
        })
    }
    next(error);
}

app.use(errorhandler);