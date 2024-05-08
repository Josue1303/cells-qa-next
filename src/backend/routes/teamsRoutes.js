const express = require("express");
const router = express.Router();
const teamsControllers = require("../controllers/teamsControllers");

router.get("/:userId/teams", teamsControllers.getUserTeams);
router.post("/createTeam", teamsControllers.createTeam);
module.exports = router;