const express = require("express");
const Room = require("../models/Room");

const router = express.Router();

//create roomcode
router.post("/create", async (req, res) => {
  const { roomCode } = req.body;

  let room = await Room.findOne({ roomCode });

  if (!room) {
    room = await Room.create({ roomCode });
  }

  res.json(room);
});
//get the room data 
router.get("/:code", async (req, res) => {
  try {
    const room = await Room.findOne({
      roomCode: req.params.code,
    });

    if (!room) {
      return res.status(404).json({
        message: "Room not found",
      });
    }

    res.json(room);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
//create word 
router.post("/:code/word", async (req, res) => {
  try {
    const room = await Room.findOne({
      roomCode: req.params.code,
    });

    if (!room) {
      return res.status(404).json({
        message: "Room not found",
      });
    }

    room.words.push({
      text: req.body.text,
    });

    await room.save();

    res.status(201).json(room);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

//delete word 

router.delete("/:code/word/:wordId", async (req, res) => {
  try {
    const room = await Room.findOne({
      roomCode: req.params.code,
    });

    if (!room) {
      return res.status(404).json({
        message: "Room not found",
      });
    }

    room.words = room.words.filter(
      (word) => word._id.toString() !== req.params.wordId
    );

    await room.save();

    res.json(room);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

//create word 
router.post("/:code/quote", async (req, res) => {
  try {
    const room = await Room.findOne({
      roomCode: req.params.code,
    });

    if (!room) {
      return res.status(404).json({
        message: "Room not found",
      });
    }

    room.quotes.push({
      text: req.body.text,
    });

    await room.save();

    res.status(201).json(room);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

//delete quotes 
router.delete("/:code/quote/:quoteId", async (req, res) => {
  try {
    const room = await Room.findOne({
      roomCode: req.params.code,
    });

    if (!room) {
      return res.status(404).json({
        message: "Room not found",
      });
    }

    room.quotes = room.quotes.filter(
      (quote) => quote._id.toString() !== req.params.quoteId
    );

    await room.save();

    res.json(room);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});



//create goal
router.post("/:code/goal", async (req, res) => {
  try {
    const room = await Room.findOne({
      roomCode: req.params.code,
    });

    if (!room) {
      return res.status(404).json({
        message: "Room not found",
      });
    }

    room.goals.push({
      text: req.body.text,
    });

    await room.save();

    res.status(201).json(room);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

//toggle goal status 
router.patch("/:code/goal/:goalId", async (req, res) => {
  try {
    const room = await Room.findOne({
      roomCode: req.params.code,
    });

    if (!room) {
      return res.status(404).json({
        message: "Room not found",
      });
    }

    const goal = room.goals.id(req.params.goalId);

    if (!goal) {
      return res.status(404).json({
        message: "Goal not found",
      });
    }

    goal.done = !goal.done;

    await room.save();

    res.json(room);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

//delete goals 
router.delete("/:code/goal/:goalId", async (req, res) => {
  try {
    const room = await Room.findOne({
      roomCode: req.params.code,
    });

    if (!room) {
      return res.status(404).json({
        message: "Room not found",
      });
    }

    room.goals = room.goals.filter(
      (goal) => goal._id.toString() !== req.params.quoteId
    );

    await room.save();

    res.json(room);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});