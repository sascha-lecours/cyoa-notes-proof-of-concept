const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb+srv://Admin:halfquadbenchstargrassevoke@cluster0.6layg.mongodb.net/story_test?retryWrites=true&w=majority';


const createStory = async (req, res, next) => {
  const newStory = {
    name: req.body.name,
    story: req.body.story
  };
  const client = new MongoClient(url, { useUnifiedTopology: true });

  try {
    await client.connect();
    const db = client.db();
    const result = await  db.collection('stories').insertOne(newStory);
  } catch (error) {
    return res.json({message: 'Could not store story.'});
  };
  client.close();

  res.json(newStory); // TODO: later on, this shouldn't return the entire thing
};

const getStories = async (req, res, next) => {
    const client = new MongoClient(url, { useUnifiedTopology: true });

    let stories;

    try {
        await client.connect();
        const db = client.db();
        stories = await  db.collection('stories').find().toArray();
      } catch (error) {
        return res.json({ message: 'Could not retrieve story.' });
      };
    client.close();

    res.json(stories); // Array of stories (VERY BIG!) TODO: Refactor to minimize size of return
};

exports.createStory = createStory;
exports.getStories = getStories;


// TODO: createNote, getNote, saveState, loadState