const router = require('express').Router();
const { Event, UserEvents } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {

  console.log(req.body);

  // check to see if id already exists
  const dupEventCheck = await Event.findOne({
    where:{ id: req.body.id}
  })

  console.log("dupEventCheck: ",dupEventCheck)
if (dupEventCheck === null){
  try {
    const newEvent = await Event.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newEvent);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
}
 
});

router.post('/savedEvents', withAuth, async (req, res) => {
  console.log(req.body);



  try {
    const saveEvent = await UserEvents.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    console.log("SaveEvent", saveEvent)

    res.status(200).json(saveEvent);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const projectData = await Event.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!projectData) {
      res.status(404).json({ message: 'No project found with this id!' });
      return;
    }

    res.status(200).json(projectData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
