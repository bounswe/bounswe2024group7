/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';

// Note: import explicitly to use the types shipped with jest.
import {it} from '@jest/globals';
import jestConfig from '../jest.config';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

import Home from '../components/Home'
import Login from '../components/Login'
import Register from '../components/Register';
import SearchPage from '../components/SearchPage'
import CreatePost from '../components/CreatePost'
import CreateProgram from '../components/CreateProgram'
import CreateFeedback from '../components/CreateFeedback';
import Survey from '../components/Survey';
import Feed from '../components/Feed';
import JoinedExercise from '../components/JoinedExercise';
import PostDetail from '../components/PostDetail';
import FeedbackDetail from '../components/FeedbackDetail';
import ProfilePage from '../components/ProfilePage';
import ProgramCard from '../components/ProgramCard';
import ProgramDetail from '../components/ProgramDetail';
import UserProfile from '../components/UserProfile';

it('Renders Whole Application Correctly', () => {
  renderer.create(<App />);
});

const Home = require('../components/Home');

test('Renders Home Page Correctly', () => {
  const tree = renderer.create(<Home />).toJSON();
  expect(tree).toMatchSnapshot();
});

const Login = require('../components/Login');
const Register = require('../components/Register');

test('Renders Login Page Correctly', () => {
    const tree = renderer.create(<Login />).toJSON();
    expect(tree).toMatchSnapshot();
});

test('Logs In Correctly', async () => {     
  const mockUsername = jest.fn();
  const mockPassword = jest.fn();

  const response  = await apiInstance().post("auth/login", { mockUsername, mockPassword });
  expect(response.status).not.toBe(200);
});

test('Renders Register Page Correctly', () => {
    const tree = renderer.create(<Register />).toJSON();
    expect(tree).toMatchSnapshot();
});

test('Registers Correctly', async () => {     
    const mockFullName = jest.fn();
    const mockUsername = jest.fn();
    const mockPassword = jest.fn();
    const mockEmail = jest.fn();
    const mockRole = "TRAINEE";

    const response  = await apiInstance().post("auth/register", { mockFullName, mockUsername, mockEmail, mockPassword, mockRole });
    expect(response.status).toBe(201);
});

const SearchResult = require('../components/SearchPage');

test('Renders Search Page Correctly', () => {
    const tree = renderer.create(<SearchPage  />).toJSON();
    expect(tree).toMatchSnapshot();
});

test('Searches Correctly', async () => {
  const response  = await apiInstance().get("api/exercises");
    expect(response).not.toBeNull();
});

const CreatePost = require('../components/CreatePost');

test('Renders Create Post Page Correctly', () => {
  const tree = renderer.create(<CreatePost />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Create Post Correctly', async () => { 
  const mockContent = jest.fn();
  const mockTrainingProgramId = jest.fn();
  const mockLabels = jest.fn();
  const mockProfile = jest.fn();

  const response  = await apiInstance().post("api/posts", {mockContent, mockTrainingProgramId, mockLabels, mockProfile });
  expect(response.status).toBe(200);
});

const CreateProgram = require('../components/CreateProgram');

test('Renders Create Program Page Correctly', () => {
  const tree = renderer.create(<CreateProgram checkDatabase={() => {}} />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Create Program Correctly', async () => { 
  const mockTitle = jest.fn();
  const mockDescription = jest.fn();
  const mockType = "BODY_BUILDING";
  const mockLevel = "PROFESSIONAL";
  const mockInterval = jest.fn();
  const mockWeeks = jest.fn();  

  const response  = await apiInstance().post("createProgram", { mockTitle, mockDescription, mockType, mockLevel, mockInterval, mockWeeks });
  expect(response.status).toBe(201);
});

const CreateFeedback = require('../components/CreateFeedback');

test('Renders Create Feedback Page Correctly', () => {
  const tree = renderer.create(<CreateFeedback />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Create Feedback Correctly', async() =>{
  const trainingProgram = jest.fn(); 
  const bodyPart = jest.fn();
  const weekNumber = jest.fn();
  const exerciseNumber = jest.fn();
  const feedbackText = jest.fn();

  const response  = await apiInstance().post("api/feedback", { trainingProgram, bodyPart, weekNumber, exerciseNumber, feedbackText});
  expect(response.status).toBe(201);
});

const Survey = require('../components/Survey');

test('Renders Survey Page Correctly', () => {
  const tree = renderer.create(<Survey />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Survey Correctly', async() =>{
  const fitnessGoals = jest.fn(); 
  const fitnessLevel = jest.fn();

  const response  = await apiInstance().post("api/surveys", { fitnessGoals, fitnessLevel});
  expect(response.status).toBe(201);
});

// Feed Page
const Feed = require('../components/Feed');

test('Renders Feed Page Correctly', () => {
  const tree = renderer.create(<Feed />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Training Programs in Feed Working Correctly', async () => {
  const response  = await apiInstance().get('api/training-programs');
  expect(response).not.toBeNull();
});

test('Random Posts in Feed Working Correctly', async () => {
  const response  = await apiInstance().get('api/posts/random');
  expect(response).not.toBeNull();
});

// Joined Exercise
const JoinedExercise = require('../components/JoinedExerxise');

test('Renders Joined Exercise Page Correctly', () => {
  const tree = renderer.create(<JoinedExercise />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Progress Submission in Joined Exercise Correctly', async () => {
  const programId = jest.fn();
  const exerciseId = jest.fn();
  const newInputs = jest.fn();
  // TODO: This creates mock data, maybe we should change to real values

  const response  = await apiInstance().post(`/api/training-programs/${programId}/workout-exercises/${exerciseId}/complete`, newInputs);
  expect(response).toBe(200);
});

// Post Detail
const PostDetail = require('../components/PostDetail');

test('Renders Post Detail Page Correctly', () => {
  const tree = renderer.create(<PostDetail />).toJSON();
  expect(tree).toMatchSnapshot();
});

// Feedback Detail
const FeedbackDetail = require('../components/FeedbackDetail');

test('Renders Feedback Detail Page Correctly', () => {
  const tree = renderer.create(<FeedbackDetail />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Feedback Detail Works Correctly', async () => {
  const ownUsername = jest.fn();
  // TODO: This creates mock data, maybe we should change to a real ownUsername

  const response  = await apiInstance().get(`api/user/${ownUsername}/following`);
  expect(response).not.toBeNull();
});

// Profile Page
const ProfilePage = require('../components/ProfilePage');

test('Renders Profile Page Correctly', () => {
  const tree = renderer.create(<ProfilePage />).toJSON();
  expect(tree).toMatchSnapshot();
});

// Program Card
const ProgramCard = require('../components/ProgramCard');

test('Renders Program Card Page Correctly', () => {
  const tree = renderer.create(<ProgramCard />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Program Card Works Correctly', async () => {
  const username = jest.fn();
  // TODO: This creates mock data, maybe we should change to a real username

  const response  = await apiInstance().get(`api/training-programs/joined/${username}`);
  expect(response).not.toBeNull();
});

// Program Detail
const ProgramDetail = require('../components/ProgramDetail');

test('Renders Program Detail Page Correctly', () => {
  const tree = renderer.create(<ProgramDetail />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Program Detail Works Correctly', async () => {
  const programId = jest.fn();
  // TODO: This creates mock data, maybe we should change to a real progam_ID

  const response  = await apiInstance().get(`api/training-programs/${programId}/join`);
  expect(response).not.toBeNull();
});

// User Profile
const UserProfile = require('../components/UserProfile');

test('Renders User Profile Page Correctly', () => {
  const tree = renderer.create(<UserProfile />).toJSON();
  expect(tree).toMatchSnapshot();
});