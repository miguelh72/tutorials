const express = require("express");
const members = require("../../Members");

const router = express.Router();

// Create member
router.post('/', (req, res) => {
    const newMember = {
        id: members.nextID(),
        name: req.body.name,
        email: req.body.email,
        status: 'active',
    }

    if (!newMember.name || !newMember.email) {
        res.status(400).json({ message: "You must include a name and email with request." });
    } else {
        members.push(newMember);

        //res.redirect('/');
        res.json(members);
    }
});

// Gets all members
router.get('/', (req, res) => res.json(members));

// Get single member
router.get("/:id", (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));

    if (found) {
        res.json(members.filter(member => member.id === parseInt(req.params.id)));
    } else {
        res.status(400).json({message: `No member with the id of ${req.params.id}`});
    }
});

// Update a member
router.put('/:id', (req, res) => {
    const memberID = parseInt(req.params.id);
    const found = members.some(member => member.id === memberID);

    if (found) {
        const updateMember = req.body;
        members.forEach(member => {
            if (member.id === memberID) {
               member.name = updateMember.name || member.name;
               member.email = updateMember.email || member.email;

               res.json({ message: "Member updated", member });
            }
        });
    } else {
        res.status(400).json({message: `No member with the id of ${req.params.id}`});
    }
});

// Delete a member
router.delete('/:id', (req, res) => {
    const memberID = parseInt(req.params.id);
    const found = members.some(member => member.id === memberID);

    if (found) {
        const index = members.findIndex(member => member.id === memberID);
        members.splice(index, 1);
        res.json({ message: "Member deleted", members });
    } else {
        res.status(400).json({message: `No member with the id of ${req.params.id}`});
    }
});

module.exports = router;