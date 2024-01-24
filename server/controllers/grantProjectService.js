import { GrantProject } from './grantProject-model.js';
import mongodb from 'mongodb';

const ReadPreference = mongodb.ReadPreference;

export function getGrantProjects(req, res) {
  const docquery = GrantProject.find({}).read(ReadPreference.NEAREST);
  docquery
    .exec()
    .then(grantProjects => {
      res.json(grantProjects);
    })
    .catch(err => {
      res.status(500).send(err);
    });
};

export function createGrantProject(req, res) {
  const {
        id, 
        npoName,
        grantProjectName,
        description,
        url,
        blobContainer
      } = req.body;
  const grantProject = new GrantProject({ id, npoName, grantProjectName, description, url, blobContainer });

  grantProject.save().then( () =>
  {
    res.json(grantProject);
  })
  .catch( err => {
    res.status(500).send(err);
  });
};