import '@testing-library/jest-dom/extend-expect';
import * as firebase from '@firebase/testing';
import { projectId } from './utils/testHelpers';
import fs from 'fs';
import path from 'path';

const rules = fs.readFileSync(
  path.resolve(__dirname, '../firestore.rules'),
  'utf-8'
);

beforeAll(() => {
  return firebase.loadFirestoreRules({ projectId, rules });
});

beforeEach(() => {
  return firebase.clearFirestoreData({ projectId });
});

afterAll(() => {
  return Promise.all(firebase.apps().map(app => app.delete()));
});
