const fs = require('fs');
const {v4:uuidv4} = require('uuid');

let LOADED_FLASHCARDS = [];

const FLASHCARD_FILE = "./files/flashcards.json";

const getFlashCards = () => {
    return LOADED_FLASHCARDS;
}

// Retrieve all flashcards into memory from local file
const loadFlashCards = () => {
    try {
        const data = fs.readFileSync(FLASHCARD_FILE, {encoding:'utf8'});
        LOADED_FLASHCARDS = JSON.parse(data);
        return getFlashCards();
    } catch (e) {
        return [];
    }
}

// In a realistic scenario, a DB would be used to facilitate performant saving
// For local json file this will suffice
const saveFlashCards = () => {
    const outputString = JSON.stringify(LOADED_FLASHCARDS);

    try {
    fs.writeFileSync(FLASHCARD_FILE, outputString);
    } catch (err) {
        console.log(err);
            throw err;
    }
    
    console.log(`File saved successfully.`);

    return (loadFlashCards());
}

const editFlashCard = async(cardId, updatedCard) => {
    try {
        let editingCard = LOADED_FLASHCARDS.find(el => el.id==cardId);
        editingCard.title=updatedCard.title;
        editingCard.text=updatedCard.text;
    } catch (err) {
        console.log(err);
        throw err;
    }

    return (await saveFlashCards());
}

let deleteFlashCard = async(cardId) => {
    try {
        let editingCard = LOADED_FLASHCARDS.findIndex(el => el.id==cardId);
        LOADED_FLASHCARDS.splice(editingCard,1);
    } catch (err) {
        console.log(err);
        throw err;
    }

    return (await saveFlashCards());
}

let createFlashCard = async(newCard) => {
    try {
        let newFlashCard = {id:uuidv4(), title:newCard.title, text:newCard.text};
        LOADED_FLASHCARDS.push(newFlashCard);
    } catch (err) {
        console.log(err);
        throw err;
    }

    return (await saveFlashCards());
}

module.exports = {
    loadFlashCards,
    getFlashCards,
    deleteFlashCard,
    editFlashCard,
    createFlashCard
}