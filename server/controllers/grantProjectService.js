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
    backgroundImage,
    grantProjectName,
    grantURL,
    description,
    grantorName,
    grantorURL,
    blobContainer,
    tags,
    status
  } = req.body;
  const grantProject = new GrantProject({ id, npoName, backgroundImage, grantProjectName, description, grantorName, grantorURL, grantURL, blobContainer, tags, status });

  grantProject.save().then(() => {
    res.json(grantProject);
  })
    .catch(err => {
      res.status(500).send(err);
    });
};

export function updateGrantProject(req, res) {
  const {
    id,
    npoName,
    backgroundImage,
    grantProjectName,
    grantURL,
    description,
    grantorName,
    grantorURL,
    blobContainer,
    tags,
    status
  } = req.body;
  const docquery = GrantProject.findOne({ id });
  docquery
    .exec()
    .then(grantProject => {
      grantProject.npoName = npoName;
      grantProject.backgroundImage = backgroundImage;
      grantProject.grantProjectName = grantProjectName;
      grantProject.grantURL = grantURL;
      grantProject.description = description;
      grantProject.grantorName = grantorName;
      grantProject.grantorURL = grantorURL;
      grantProject.blobContainer = blobContainer;
      grantProject.tags = Array.from(tags);
      grantProject.status = status;
      grantProject.save().then(res.json(grantProject));
    })
    .catch(err => {
      res.status(500).send(err);
    });
};

export function deleteGrantProject(req, res) {
  const { id } = req.params;
  const docquery = GrantProject.findOneAndDelete( {id});

  docquery
    .exec()
    .then(grantProject => {
      res.json(grantProject);
    })
    .catch(err => {
      res.status(500).send(err);
    });
};