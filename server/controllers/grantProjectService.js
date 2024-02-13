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
    npoName,
    npoURL,
    backgroundImage,
    grantProjectName,
    grantURL,
    description,
    grantorName,
    grantorURL,
    blobContainer,
    tag1,
    tag2,
    tag3,
    tag4,
    submitted
  } = req.body;
  const grantProject = new GrantProject({ npoName, npoURL, backgroundImage, grantProjectName, description, grantorName, grantorURL, grantURL, blobContainer, tag1, tag2, tag3, tag4, submitted });

  grantProject.save().then(() => {
    res.json(grantProject);
  })
    .catch(err => {
      res.status(500).send(err);
    });
};

export function updateGrantProject(req, res) {
  const {
    _id,
    npoName,
    npoURL,
    backgroundImage,
    grantProjectName,
    grantURL,
    description,
    grantorName,
    grantorURL,
    blobContainer,
    tag1,
    tag2,
    tag3,
    tag4,
    submitted
  } = req.body;
  const docquery = GrantProject.findOne({ _id });
  docquery
    .exec()
    .then(grantProject => {
      grantProject.npoName = npoName;
      grantProject.npoURL = npoURL;
      grantProject.backgroundImage = backgroundImage;
      grantProject.grantProjectName = grantProjectName;
      grantProject.grantURL = grantURL;
      grantProject.description = description;
      grantProject.grantorName = grantorName;
      grantProject.grantorURL = grantorURL;
      grantProject.blobContainer = blobContainer;
      grantProject.tag1 = tag1;
      grantProject.tag2 = tag2;
      grantProject.tag3 = tag3;
      grantProject.tag4 = tag4;
      grantProject.submitted = submitted;
      grantProject.save().then(res.json(grantProject));
    })
    .catch(err => {
      res.status(500).send(err);
    });
};

export function deleteGrantProject(req, res) {
  const { _id } = req.params;
  const docquery = GrantProject.findOneAndDelete( { _id });

  docquery
    .exec()
    .then(grantProject => {
      res.json(grantProject);
    })
    .catch(err => {
      res.status(500).send(err);
    });
};