/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';

// Note: import explicitly to use the types shipped with jest.
import {it} from '@jest/globals';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

import Login from '../Login'
import Register from '../Register';
import SearchResult from '../SearchResult'
import CreatePost from '../CreatePost'
import CreateProgram from '../CreateProgram'

it('renders correctly', () => {
  renderer.create(<App />);
});

const Login = require('../Login');
const Register = require('../Register');

test('Renders Login Page Correctly', () => {
    const tree = renderer.create(<Login checkDatabase={() => {}} />).toJSON();
    expect(tree).toMatchSnapshot();
});

test('Renders Register Page Correctly', () => {
    const tree = renderer.create(<Register checkDatabase={() => {}} />).toJSON();
    expect(tree).toMatchSnapshot();
});

test('Registers Correctly', async () => {     
    const mockFullName = jest.fn();
    const mockUsername = jest.fn();
    const mockPassword = jest.fn();
    const mockEmail = jest.fn();
    const mockRole = "Trainee";

    const response  = await apiInstance().post("register", { mockFullName, mockUsername, mockEmail, mockPassword, mockRole });
    expect(response).toBe( /* TODO: The Object That Returns */ );
});

const SearchResult = require('../SearchResult');

test('Renders Search Result Page Correctly', () => {
    const tree = renderer.create(<SearchResult checkDatabase={() => {}} />).toJSON();
    expect(tree).toMatchSnapshot();
});

test('Searches Correctly', async () => {    /* TODO: Change the endpoints */
    const mockTitle = jest.fn();
    const mockImage = jest.fn();
    const mockCreator = jest.fn();
    const mockType = jest.fn();

    const response  = await apiInstance().post("search", { mockTitle, mockImage, mockCreator, mockType });
    expect(response).toBe( /* TODO: The Object That Returns */ );
});

const CreatePost = require('../CreatePost');

test('Renders Create Post Page Correctly', () => {
  const tree = renderer.create(<CreatePost checkDatabase={() => {}} />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Create Post Correctly', async () => { 
  const mockTitle = jest.fn();
  const mockDescription = jest.fn();
  const mockLabels = jest.fn();
  const mockLabelTest = jest.fn();

  const response  = await apiInstance().post("createPost", { mockTitle, mockDescription, mockLabels, mockLabelTest });
  expect(response).toBe( /* TODO: The Object That Returns */ );
});

const CreateProgram = require('../CreateProgram');

test('Renders Create Program Page Correctly', () => {
  const tree = renderer.create(<CreateProgram checkDatabase={() => {}} />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Create Program Correctly', async () => { 
  const mockTitle = jest.fn();
  const mockDescription = jest.fn();
  const mockLabels = jest.fn();
  const mockLabelTest = jest.fn();
  const mockExercises = jest.fn();
  const mockExercise = jest.fn();

  const response  = await apiInstance().post("createProgram", { mockTitle, mockDescription, mockLabels, mockLabelTest, mockExercies, mockExercise });
  expect(response).toBe( /* TODO: The Object That Returns */ );
});