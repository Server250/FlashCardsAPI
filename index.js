var flashCards = require('./flashcards');
var express = require("express");
var cors = require("cors");
var app = express();

app.use(cors()); 
app.use(express.json());

const PORT = 4020;

app.patch('/:id', async(req, res) => {
    console.log(`Patching ${req.params.id}`);
    try {
        let newFlashCards = await flashCards.editFlashCard(req.params.id, req.body);
        res.status(200).send(newFlashCards);
    } catch(err) {
        res.status(500).send(err.message);
    }
});

app.delete('/:id', async(req, res) => {
    console.log(`Deleting ${req.params.id}`);
    try {
        let newFlashCards = await flashCards.deleteFlashCard(req.params.id);
        res.status(200).send(newFlashCards);
    } catch(err) {
        res.status(500).send(err.message);
    }
});

app.get('/', async(req,res) => {
    console.log(`Retrieving flash cards.`);
    try {
        let retrievedFlashCards = await flashCards.getFlashCards();
        res.status(200).send(retrievedFlashCards);
    } catch(err) {
        res.status(500).send(err.message);
    }
});

app.post('/', async(req,res) => {
    console.log(`Creating a flash card.`);
    try {
        let updatedFlashCards = await flashCards.createFlashCard(req.body);
        res.status(200).send(updatedFlashCards);
    } catch(err) {
        res.status(500).send(err.message);
    }
});

app.listen(PORT, async() => {
    console.log(`Node server started on port: ${PORT}`);
    flashCards.loadFlashCards();
    console.log(`Successfully loaded ${flashCards.getFlashCards().length} flash cards.`);

    console.log(`\nReady.\n`);
});

// Gracefully handle an exit
const shutdown = () => {
    console.log(`\nNode server shutting down..`)
    console.log(`Done.`)

    process.exit(0);
}

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

