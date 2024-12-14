
# Introduction
This is the second customer milestone report of the Group 7 of bounswe2024. This group of CMPE451 Project Development in Software Engineering Course intends to build a software called Fitness Fact which brings people wishing to dive into the fitness world with professional trainers and dieticians. The contributed members of this project are: 
- [Abdulsamet Alan](https://github.com/bounswe/bounswe2024group7/wiki/Abdulsamet-Alan)
- [Asım Dağ](https://github.com/bounswe/bounswe2024group7/wiki/As%C4%B1m-Da%C4%9F)
- [Deniz Bilge Akkoç](https://github.com/bounswe/bounswe2024group7/wiki/Deniz-Bilge-Akkoc)
- [Eren Pakelgil](https://github.com/bounswe/bounswe2024group7/wiki/Eren-Pakelgil)
- [Hanaa Zaqout](https://github.com/bounswe/bounswe2024group7/wiki/Hanaa-Zaqout)
- [Mert Cengiz](https://github.com/bounswe/bounswe2024group7/wiki/Mert-Cengiz)
- [Mustafa Ocak](https://github.com/bounswe/bounswe2024group7/wiki/Mustafa-Ocak)
- [Oğuz Hekim](https://github.com/bounswe/bounswe2024group7/wiki/Oguz-Hekim)

# 1. Milestone Review
## 1.1 Requirements Addressed in This Customer Milestone
Requirements adressed after the First Customer Milestone may be found below. The ones that were addressed in the previous Customer Milestone may be found in the [previous report](https://github.com/bounswe/bounswe2024group7/wiki/CMPE451-Customer-Milestone-Report-%E2%80%90-1).
- 1.1.3.1.1 User shall be able to create new posts containing visual, textual, video, and external link with a title.
- 1.1.3.1.1.1 User shall be able to post their own material with its text, photo, video, or URL. Users shall be able to add labels optionally (in 1.2.3).
- 1.1.3.1.2 Users shall be able to view user posts they saved earlier in their own personal pages.
- 1.1.3.1.3 Users shall be able to create collection of bookmarks for saving the user posts.
- 1.1.5.3 User shall be able to comment on posts.
- 1.1.5.5 Users shall be able to save user posts to their personal profiles.
- 1.1.5.6 Users shall be able to view the diet and training programs they have joined on their personal profiles.
- 1.1.5.7 Users shall be able to submit their daily progress within the program they have registered in by providing a checklist of completed items and the time spent on the exercises.
- 1.1.6.1 Users shall have a personal page that shows their posts, comments they have made on other posts.
- 1.1.6.2 Trainees shall be able to select specific muscle(s) to work on.
- 1.1.6.3 Trainees shall be able to see their previous exercises on a graph.
- 1.1.6.4 Training programs shall be displayed in the profile page of the trainer who created them.
- 1.1.6.5 Diet programs shall be displayed in the profile page of the dietician who created them.
- 1.1.8.2.1 Each program shall include diet type categorization, such as low-calorie, low-fat and high-protein.
- 1.1.8.2.2 Each program shall include daily meal plans.
- 1.2.1.1 System shall send notifications to users when someone comments on or likes their posts.
- 1.2.1.2 System shall send notifications to users when a user starts to follow them.
- 1.2.2.1 System shall allow users to search for material related to fitness.
- 1.2.2.1.3 System shall allow searching by name of the muscle. System shall display the list of the visual and/or textual information related to that muscle as a result of this search.
- 1.2.4.1 Post labels such as cardio, powerlifting, and fat loss shall be provided by the system.
- 1.2.4.4 Transformation, form check and PR sub-forums shall be available for all types of registered users.
- 2.2.1 The system shall be available as a website via any web browser.
- 2.2.2 The system shall be a mobile application on Android platforms

## 1.2 Deliverables
### 1.2.1 List and Status of the Deliverables
| Deliverable | Progress |
| :---: | :---: |
| Milestone Review | Completed |
| Individual Contributions | Completed |
| [Pre-release of the Software](https://github.com/bounswe/bounswe2024group7/releases/tag/0.2.0-alpha) | Completed  |
| [Responsivity Assignment Matrix](https://github.com/bounswe/bounswe2024group7/wiki/Responsivity-Assignment-Matrix-(RAM)) | Completed  |
| [Lab Reports](https://github.com/bounswe/bounswe2024group7/wiki/Lab-Notes) | Completed  |
### 1.2.2 UX Design
#### Overview
The design of the Fitness Fact application prioritizes usability, ensuring accessibility for users across various platforms. The interface is designed to provide a smooth experience for fitness enthusiasts, trainers, and soon for dieticians. The main design goals are:
- **Consistency**: Achieving visual and functional harmony between the mobile and web platforms.
- **Accessibility**: Making the application easy to use for people with different fitness goals and technical proficiency.
- **Responsiveness**: Ensuring smooth navigation across devices of varying screen sizes, from desktops to smartphones.
- **Feature Integration**: Seamless access to critical features such as training programs, profile management, and interactive posts.

#### Key Features of the UX Design
1. **Unified Theme**:
   - Both the mobile and web versions share a unified colosrs, fonts, and layout structure to ensure a complete user experience.

2. **Interactive Post Creation**:
   - Users can create posts with rich images using external links. User can use tags to categorize content for easier discovery. Labels such as "Powerlifting" or "Fat Loss" categorize content for easier discovery.

3. **Search Functionality**:
   - Implemented a powerful search bar on both mobile and web platforms, allowing users to find relevant content by muscle name, exercise type, or posts.

4. **Personal Profiles**:
   - Each user has a personalized page showcasing their posts, saved programs, progress graphs, and completed exercises.

5. **Responsiveness**:
   - Mobile-first design principles were utilized, ensuring the application adjusts dynamically to device sizes without compromising user experience.

6. **Progress Visualization**:
   - The application includes graphical representations of training progress, showing completed exercises.

### 1.2.3 Description of the Standard Being Utilized
In our project, we decided to use JSON-LD as our projects standard. JSON-LD is mainly aiming on linked data and in our project, we will be implementing a forum application which users will search topics related to gym exercises. Since the project highly depends on semantic search and our endpoints include many context that is linked with each other, we wanted to find a standard that supports semantic search. We had other options like activity streams, activitypub, wacg but we decided to choose JSON-LD.
As the team, we decided to use JSON-LD but couldn’t completely integrated our software with the standard in practice, yet we plan to completely make it compatible until next milestone.

#### 1.2.3.1 Purpose of the standard:
JSON-LD is a method of encoding linked data using JSON. One goal of the standard that made us choose is the adaptability of transforming existing JSON to JSON-LD. JSON-LD allows data to be serialized in a way that is similar to traditional JSON and our team transfers data mainly using JSON. 
JSON-LD, by their words in their [official page](https://json-ld.org), is developed for developers to help JSON data interoperate at Web-scale and it is an ideal data format for REST Web services. It is a lightweight linked data format that structures data in a way softwares can understand semantically, That’s why we decided to use this standard.
#### 1.2.3.2 Benefits
- Better Searchability: With JSON-LD, search engines and external systems can better recognize and index content on fitness topics like we use in our application: exercises, diet programs and user interactions.
- Interoperability: JSON-LD makes our forum’s data easy to link and reuse by other apps, which could make future integration with other fitness platforms and search tools smoother.
- Improved User Experience: JSON-LD should make search results more accurate for users, especially when they look up specific programs, exercises etc.

### 1.2.4 API Documentation
API documentation can be accessed [here](https://github.com/bounswe/bounswe2024group7/wiki/API-Documentation).

## 1.3 Testing
### 1.3.1 General Test Plan
Our general test plan consists of two separate parts: Unit testing of Backend, Web, and Mobile functionalities, and integration testing.
- Firstly, all functions and functionalities in the Backend, Web, and Mobile are going to be tested one-by-one, separately, by members of related sub-team.
- Secondly, integration among integrable functions and functionalities within Backend, Web, and Mobile are going to be done, again one-by-one, separately, by members of related sub-team.
- Lastly, integration testing between Backend-Web and Backend-Mobile phase is going to be performed. These tests are going to be written all related members (Backend-Web sub-teams and Backend-Mobile sub-teams)
### 1.3.2 Generated Test Results
### **Generated Test Results**

---

#### **Authentication Service Test Results**

| **Test Case**                             | **Description**                                                                                      | **Result**              | **Remarks**                                                                                               |
|-------------------------------------------|------------------------------------------------------------------------------------------------------|-------------------------|----------------------------------------------------------------------------------------------------------|
| **Register - Success**                    | Registered a user with a unique username and email.                                                  | Passed                 | User data was correctly saved, and a valid session token was returned.                                   |
| **Register - Username Exists**            | Attempted to register with a username that already exists.                                           | Passed                 | Registration failed with an "Username already exists" error message, as expected.                        |
| **Login - Success**                       | Logged in with valid credentials.                                                                    | Passed                 | Correct session token was generated and returned for the user.                                           |
| **Login - Invalid Credentials**           | Logged in with incorrect credentials.                                                                | Passed                 | Login failed with an "Invalid credentials" error message, as expected.                                   |
| **Logout - Success**                      | Logged out a user by invalidating the session token.                                                 | Passed                 | User's session token was correctly invalidated in the database.                                          |
| **Get Authenticated User - Logged In**    | Retrieved details of the currently authenticated user with a valid session token.                    | Passed                 | User details (username, email, and role) were correctly returned.                                        |
| **Get Authenticated User - Guest User**   | Attempted to retrieve details when no session token was provided.                                    | Passed                 | Returned `null`, indicating no authenticated user.                                                       |
| **Get Authenticated User Internal - Valid Token** | Retrieved internal user details with a valid session token.                                           | Passed                 | The correct user object was retrieved and matched the session token.                                     |
| **Get Authenticated User Internal - No Token**    | Attempted to retrieve internal user details without a session token.                                 | Passed                 | Returned `null`, as expected for unauthenticated users.                                                  |

---

#### **Search Controller Test Results**

| **Test Case**                             | **Description**                                                                                      | **Result**              | **Remarks**                                                                                               |
|-------------------------------------------|------------------------------------------------------------------------------------------------------|-------------------------|----------------------------------------------------------------------------------------------------------|
| **Search - Valid Query**                  | Performed a search with a valid query string (e.g., "fitness program").                              | Passed                 | Correct results were returned, including posts, exercises, and training programs.                        |
| **Search - No Results**                   | Performed a search with a query that matches no records.                                             | Passed                 | Returned empty arrays for posts, exercises, and training programs.                                       |
| **Search - Invalid Query**                | Performed a search with invalid inputs (e.g., empty query, special characters).                      | Passed                 | Gracefully handled invalid inputs, returning empty results or appropriate error messages.                |

#### 1.3.2.1 Backend

### **1. Objectives**
The primary goal of this test plan is to validate the functionality, reliability, and correctness of:
1. The **Authentication Service**:
   - User registration, login, logout, and session handling.
   - Retrieval of authenticated user details.
2. The **Search Controller**:
   - Proper functioning of the `/search` endpoint, ensuring it retrieves relevant results from posts, exercises, and training programs.

---

### **2. Test Scope**
The scope includes:
1. Unit tests for core business logic and methods within `AuthenticationService` and `SearchService`.
2. Integration tests for endpoints exposed by `SearchController` and interactions with mocked services.
3. Edge cases, error handling, and expected system behavior for invalid inputs.

---

### **3. Test Cases**
#### **Authentication Service Tests**
| **Test Case**                             | **Description**                                                                                      | **Expected Outcome**                                                                                      |
|-------------------------------------------|------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------|
| **Register - Success**                    | Register a user with a unique username and email.                                                    | User is registered, and data is saved in the database.                                                   |
| **Register - Username Exists**            | Attempt to register with a username that already exists.                                             | Registration fails with an appropriate error message.                                                    |
| **Login - Success**                       | Log in with valid credentials.                                                                       | A session token is returned, and the user's credentials are authenticated.                               |
| **Login - Invalid Credentials**           | Log in with incorrect credentials.                                                                   | Login fails with an "Invalid credentials" error.                                                         |
| **Logout - Success**                      | Log out a user by invalidating the session token.                                                    | User's session token is cleared in the database.                                                         |
| **Get Authenticated User - Logged In**    | Retrieve details of the currently authenticated user using a valid session token.                    | Returns user details with a valid session.                                                               |
| **Get Authenticated User - Guest User**   | Retrieve details when no session token is provided.                                                  | Returns `null` or an indication that the user is not logged in.                                           |
| **Get Authenticated User Internal - Valid Token** | Retrieve internal user details with a valid session token.                                           | Returns the user object matching the token.                                                              |
| **Get Authenticated User Internal - No Token**    | Attempt to retrieve internal user details without a session token.                                   | Returns `null` indicating no authenticated user.                                                         |

#### **Search Controller Tests**
| **Test Case**                             | **Description**                                                                                      | **Expected Outcome**                                                                                      |
|-------------------------------------------|------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------|
| **Search - Valid Query**                  | Perform a search with a valid query string (e.g., "fitness program").                                | Returns JSON response with relevant posts, exercises, and training programs.                             |
| **Search - No Results**                   | Perform a search with a query that matches no records.                                               | Returns an empty array for each entity type (posts, exercises, training programs).                       |
| **Search - Invalid Query**                | Perform a search with invalid inputs (e.g., empty query, special characters).                        | Returns appropriate error response or empty results, ensuring no crashes or unexpected behavior.         |

---

### **4. Test Data**
- **Mock Users**:
  - User with valid credentials.
  - User with duplicate username or email.
- **Mock Search Results**:
  - Mock response for queries matching posts, exercises, and training programs.
  - Scenarios where no records match the query.

---

### **5. Test Tools and Frameworks**
- **JUnit** for unit testing.
- **Mockito** for mocking dependencies like `UserRepository` and `SearchService`.
- **Spring Boot Test** for integration testing of controllers.
- **MockMvc** for testing endpoints and validating HTTP responses.

---

#### 1.3.2.2 Mobile
We used React Native Test Renderer (`npx test`).
- Implemented unit test for all available components and features within the mobile application.
---
#### 1.3.2.3 Frontend
- Implemented unit test for progressToday component that shows the progress circular bar in React. 

## 1.4 Planning and Team Process
### 1.4.1 Changes to Improve the Development Process
To address issues faced in Milestone 2 and improve the development process for the final milestone:

1. **Earlier Integration Testing:**
   - Begin connecting the backend and frontend at least one week before the deadline to identify and resolve issues earlier.

2. **Improved Time Management:**
   - Discuss in every lab the next week deliverables, and follow up on any issues related to last week deliverables.
   - Allocate time for polishing features and debugging after achieving core functionality.
   - Avoid introducing new changes in the last few days to prevent unexpected failures.

3. **Simulated Demo Preparation:**
   - Conduct a mock demo 2–3 days before the final presentation to catch small issues and improve delivery.
### 1.4.2 Plan to Complete the Project
1. **Focus on Core Functionality:**
   - Prioritize completing and testing key features such as: trainee progress maps after joining different training and diet programs, leaderboards, and optimized recommendations for posts and training and diet programs.
   - Ensure that mobile and frontend have same functionalities. 
2. **Mitigating Risks:**
   - Regular checkpoints to ensure synchronization between backend, frontend, and mobile teams.
### 1.4.3 The Project Plan
The Project Plan is available on our [Wiki page](https://github.com/bounswe/bounswe2024group7/wiki/Project-Plan).

## 1.5 Evaluation
### 1.5.1 Summary of Customer Feedback and Reflections
Any meeting with the customers obviously helps the team realize the strengths and weaknesses of both the team itself and the application developed by the feedback the customers give and the reflections and reactions they expressed. Their reflections, reactions, and their feedback could be listed as:
#### 1.5.1.1 Customer Reflections and Reactions
- Customers were unsatisfied as posting an image was not error-free. Their expectations include at least being able to make any post with all available content successfully. This situation shadowed the success of creating any post without an image.
- Customers were surprised as it was not possible to delete an exercise after adding it, which could be appreciated as people expect such a basic  operation could be reversible as it does not control vital parts of the application. 
- Customers were expecting a better scenario in the presentation, which could be possible but due to unexpected problems in the project, some parts that are going to be shown were delayed to the next presentation. 
#### 1.5.1.2 Customer Feedback
- Customers suggested that the application shall include a questionaire in the registration process. They probabably believe that one of the main purposes of the forum would be the tracking mechanism. The suggestion of the team was creating a highly inclusive questionaire that going to be added to the register part of the application.
- Customers recommended that the number of posts could be seen within a page shall be restricted as infinite number of posts are not user-friendly.  This recommendation was evaluated by the team and decided to define some restrictions of the maximum number of posts and programs within a page to the forum.
### 1.5.2 Evaluation of the Status of Deliverables
Compared to the first milestone, we adhered more strictly to the requirement specifications and prioritized the functionalities that identified the characteristic of our application. We tried to increase the similarity of web frontend and mobile frontend especially in the UI aspect which was also expected by the teaching staff. We used more endpoints in frontend apps and avoid using mock components/pages as much as we can. We also updated our deployment by resolving some issues which accelerated the development process of our applications. Corresponding lab reports were prepared encapsulating the work done in the lab and scheduling & distribution of future work which helped us become more organized. Meetings were mostly held within each subgroup rather than the whole group itself therefore we didn't prepare separate meetings notes for these. The intercommunication between subgroups were mostly done in labs. 
### 1.5.3 Evaluation of Tools and Processes
#### 1.5.3.1 Evaluation of Tools
In the project, four different tools were used, and explained below.
##### 1.5.3.1.1 GitHub
- GitHub is the platform that where every information regarding to our group and the project. All plans, researches, personal pages, templates, and the meeting notes are put on GitHub.
- We have created issues for almost everything we do about the project and class. Issues and PR's mostly created with our predefined templates.
- Code-related progress was tracked and that type of communication was held on GitHub mainly via commenting on related issues and Pull Requests (PRs). 

##### 1.5.3.1.2 WhatsApp
- We have discussed and communicated through WhatsApp as our main platform for code-unrelated jobs, such as determining the meeting date and time if necessary. Before the ban of Discord in Türkiye, such communication was held there, but we had to switch to WhatsApp as it is available in all members without any VPN requirements.

##### 1.5.3.1.3 Discord/Google Meet
- We have used the Discord/Google Meet for the pair programming sessions, solving bugs, reviewing code, etc. Since we are doing the most of the planning on the labs, we didn't use Discord/Google Meet that much for planning purposes.
- We preferred Google Meet instead of Discord for the pair programming sessions, solving bugs, reviewing code, etc. after the unfortunate ban on Discord in Türkiye.
- Screen sharing availability in Google Meet enabled to reveal the individual progress among the group in any type of meeting. Different members evaluated that progress easily and faster progress was obtained instead of trying to find specific members physically, or waiting the Labs.

##### 1.5.3.1.4 Phone Call
- In urgent conditions, members called each other for immediate progress. Especially in limited time, it increased the efficiency as immediate actions could taken, when compared with written communication channels, such as but not limited to WhatsApp.

#### 1.5.3.2 Evaluation of Processes
- Team meetings in the labs were really efficient. We have made our decisions about the project faster than before because our full focus was on the project. We created Lab Reports as well as Meeting Notes in this time as required.
- Division of tasks were generally done on the weekly meetings, in lab hours. 
- We didn't require any other meeting with the help of labs before the previous Customer Milestone; however, such online meetings became necessary after a while as pair programming, solving some strange bugs, and reviewing code together became a necessity at a point, so the number of online meetings has risen sharply.

# 2. Individual Contributions
## 2.1 Abdulsamet Alan
#### 2.1.1 Responsibilities
- Leading the web team.
- Coordinating integration between the frontend and backend teams.
- Leading discussions on architectural decisions to address compatibility issues.
- Facilitating meetings to resolve blockers during implementation.

#### 2.1.2 Main Contributions
- Directed efforts to integrate frontend and backend functionalities seamlessly, ensuring seamless communication between components.
- Conducted pair programming sessions and troubleshooting workshops with team members to address architectural and code-related issues.
- Played a significant role in aligning the web application's feature set and visual design.

#### 2.1.3 API Contributions
- Collaborated on designing secure and scalable endpoints for creating, retrieving, and updating user-generated content such as posts, bookmarks, and training programs.

#### 2.1.4 Code-Related Significant Issues
- [#242: Adding bookmark part](https://github.com/bounswe/bounswe2024group7/issues/242): Developed the backend and frontend functionality for bookmarking posts to personal collections.
- [#239: Fix api/tags endpoint to unauthorized endpoints](https://github.com/bounswe/bounswe2024group7/issues/239): Adjusted security configurations to resolve unauthorized access issues for the `/api/tags` endpoint.
- [#237: Add search bar in frontend](https://github.com/bounswe/bounswe2024group7/issues/237): Enhanced the frontend by adding a search bar feature for improved content discoverability. Worked with @DenizBilgeAkkoc
- [#236: Add completionDate to UserExerciseDetail](https://github.com/bounswe/bounswe2024group7/issues/236): Contributed to an additional attribute in the backend for tracking the completion date of exercises. Worked with @oguzhekim
- [#235: HOTFIX - Frontend Critical Bug](https://github.com/bounswe/bounswe2024group7/issues/235): Addressed a critical bug in the frontend that impacted deployment and usage.
- [#233: Trainers should be able to join other programs as normal users](https://github.com/bounswe/bounswe2024group7/issues/233): Adjusted backend logic to allow trainers to register for programs not created by them.
- [#232: Responsive feed page](https://github.com/bounswe/bounswe2024group7/issues/232): Enhanced the responsiveness of the feed page to improve user experience on various devices.
- [#231: TrainingProgram DTO shows left users as participants](https://github.com/bounswe/bounswe2024group7/issues/231): Resolved an issue where participants who had left programs were still displayed.
- [#230: Remove unused functions and elements from PostFeedCard](https://github.com/bounswe/bounswe2024group7/issues/230): Cleaned up redundant elements and functions in the `PostFeedCard` component to optimize performance.
- [#229: Fix training program creation](https://github.com/bounswe/bounswe2024group7/issues/229): Addressed critical bugs in the training program creation functionality.
- [#214: Create program with exercises](https://github.com/bounswe/bounswe2024group7/issues/214): Implemented the backend and frontend features to allow users to create training programs with selected exercises.
- [#212: Add exercise list to app context](https://github.com/bounswe/bounswe2024group7/issues/212): Refactored the frontend to use `AppContext` for managing and accessing exercise lists efficiently.
- [#198: Change deployment platform from GCP to DigitalOcean and change CI/CD pipeline](https://github.com/bounswe/bounswe2024group7/issues/198): Migrated deployment infrastructure and updated the CI/CD pipeline to align with the new platform. But we reverted from GCP to DigitalOcena. Worked with @m1u1s1

#### 2.1.5 Management-Related Significant Issues
- Led discussions during team meetings to allocate responsibilities and align development priorities with milestone goals.
- Regularly monitored project progress, identifying and addressing team concerns promptly.

#### 2.1.6 Pull Requests
- [#243: Create post, like, and bookmark](https://github.com/bounswe/bounswe2024group7/pull/243): Successfully merged post creation and bookmarking features with minimal conflicts.
- [#240: Add API/tags to security config permitted endpoints](https://github.com/bounswe/bounswe2024group7/pull/240): Improved API security measures.
- [#238: Add search bar and result page](https://github.com/bounswe/bounswe2024group7/pull/197): Improved the search bar from CMPE352 with @DenizBilgeAkkoc


## 2.2 Asım Dağ
### 2.2.1 Responsibilites
I was a part of backend team and mainly worked in the backend of the project. But sometimes I was responsible from the applications integration with frontend into backend too. Mainly, in this milestone my responsibilities were implementing the Like and Bookmark features for posts and storing bookmarked posts in the profile. I also helped other backend related issues when needed like deploying etc. 
### 2.2.2 Main Contibutions
In the Fitness Fact, we wanted to implement a like feature in posts for users. For example, when a signed in user likes a post, we wanted to add a way to show this like to other users. So I implemented a like endpoint, added a post-user relation for likes and added a count that shows the total number of likes made by other users. Detailed information about this can be found in API Contributions part.

Another feature I implemented was bookmark. Similar to like, each post has a bookmark button that helps user to save the post for later use and make it easier to access. Also I had to make sure the post model and profile responses were still functioning correctly after implementing this bookmark feature because adding new relation and fields could break existing database structure. After completing the bookmark button, I also added an endpoint to show the bookmarked posts of the logged in user.

### 2.2.3 API Contributions
There were 5 new endpoints I implemented:

1. **Like**:
   - POST /api/posts/{post_id}/like
   - This endpoint should be called when user tries to like a post.
   - There must be a logged in user and its authentication token in headers for this request to response successfully.
   - Adds a Post-User relation in likes table.
   - Returns OK response with status code 200 if user is authenticated and post with given id exists. 
   - if user is not authenticated (guest user), this error returns with status code 401 Unauthorized:
```json
{
    "message": "You must be logged in to perform this action",
    "timestamp": "2024-11-25T04:54:49.8285567"
}
```

2. **Unlike**:
   - DELETE /api/posts/{post_id}/like
   - This endpoint should be called when user tries to take their like back from a post, delete the like in other words.
   - There must be a logged in user and its authentication token in headers for this request to response successfully.
   - Removes the Post-User relation in likes table if exists.
   - Returns OK response with status code 200 if user is authenticated and post with given id exists. 
   - if user is not authenticated (guest user), this error returns with status code 401 Unauthorized:
```json
{
    "message": "You must be logged in to perform this action",
    "timestamp": "2024-11-25T04:54:49.8285567"
}
```

3. **Bookmark**:
   - POST /api/posts/{post_id}/bookmark
   - This endpoint should be called when user tries to add the post into their bookmarked posts.
   - There must be a logged in user and its authentication token in headers for this request to response successfully.
   - Adds the Post-User relation in bookmarks table.
   - Returns OK response with status code 200 if user is authenticated and post with given id exists. 
   - if user is not authenticated (guest user), this error returns with status code 401 Unauthorized:
```json
{
    "message": "You must be logged in to perform this action",
    "timestamp": "2024-11-25T04:54:49.8285567"
}
```

4. **Remove the Bookmark**:
   - DELETE /api/posts/{post_id}/bookmark
   - This endpoint should be called when user tries to remove their bookmark of the post, delete the bookmark in other words.
   - There must be a logged in user and its authentication token in headers for this request to response successfully.
   - Removes the Post-User relation in bookmarks table if exists.
   - Returns OK response with status code 200 if user is authenticated and post with given id exists. 
   - if user is not authenticated (guest user), this error returns with status code 401 Unauthorized:
```json
{
    "message": "You must be logged in to perform this action",
    "timestamp": "2024-11-25T04:54:49.8285567"
}
```

5. **Get all bookmarked posts of the authenticated user**:
   - GET /api/posts/bookmarked
   - This endpoint should be called when user wants to list their bookmarked posts.
   - There must be a logged in user and its authentication token in headers for this request to response successfully.
   - Returns the list of posts response with status code 200 if user is authenticated. Here is an example response:
```
[
   {
      “id”: 128,
      “content”: “How to recover faster after intense workouts.”,
      “tags”: [“fitness”],
      “createdAt”: “2024-11-26T11:57:34.565932”,
      “username”: “oguzasim”,
      “trainingProgram”: null,
      “likeCount”: 1,
      “imageUrl”: null,
      “liked”: true,
      “bookmarked”: true
   },
   {
      “id”: 129,
      “content”: “Mindfulness and meditation for better focus.”,
      “tags”: [“Mindfullness”],
      “createdAt”: “2024-11-26T11:57:34.568765”,
      “username”: “oguzasim”,
      “trainingProgram”: null,
      “likeCount”: 0,
      “imageUrl”: null,
      “liked”: false,
      “bookmarked”: true
   }
]
```

   - if user is not authenticated (guest user), this error returns with status code 401 Unauthorized:
```json
{
    "message": "You must be logged in to perform this action",
    "timestamp": "2024-11-25T04:54:49.8285567"
}
```

### 2.2.4 Code-Related Significant Issues
  - [Issue#201](https://github.com/bounswe/bounswe2024group7/issues/201): Enhance Search Functionality for Exercises and Forum Posts. I simply reviewed after Mustafa Ocak implemented it. 
  - [Issue#202](https://github.com/bounswe/bounswe2024group7/issues/202): Implement Bookmark and Like Features for Posts. 
  - [Issue#203](https://github.com/bounswe/bounswe2024group7/issues/203): Feature to share training programs in posts. Discussed with Oguz and Mustafa about how to implement it.
  - [Issue#204](https://github.com/bounswe/bounswe2024group7/issues/204): Tracking mechanism for training programs. Discussed about how the functionality of tracking should be like. 
  - [Issue#253](https://github.com/bounswe/bounswe2024group7/issues/253): Unit tests for the Post service.

### 2.2.5 Management-Related Significant Issues
### 2.2.6 Pull Requests
  - [PR#207](https://github.com/bounswe/bounswe2024group7/pull/207): Feature to share training programs in posts. Reviewed it.
  - [PR#225](https://github.com/bounswe/bounswe2024group7/pull/225): Implemented bookmark and like feature for posts. 
### 2.2.7 Additional Information
I also edited the Standard part of the report and in backend we worked together in most of the part before deploy. Since some of the features were urgent, I included the unit tests issue in here but didnt merged into the release yet. It will be avaliable in next milestone.

## 2.3 Deniz Bilge Akkoç
#### 2.3.1 Responsibilities
- Being a part of the web team.
- Connecting frontend components to the backend.
#### 2.3.2 Main Contributions
- Implementing visual components in frontend to improve user experience
- Attended pair programming sessions and troubleshooting workshops with team members to address architectural and code-related issues.

#### 2.3.3 API Contributions
- Collaborated on designing endpoints to improve team work.

#### 2.3.4 Code-Related Significant Issues
- [#215: Adding human body search component for muscle search](h https://github.com/bounswe/bounswe2024group7/issues/215): Developed the frontend component for muscle search search by using human body component.
- [#237: add search bar in frontend ]( https://github.com/bounswe/bounswe2024group7/issues/237): Adding search bar and connecting to endpoint to get search results and displaying these results.
- [#242: adding bookmark part ]( https://github.com/bounswe/bounswe2024group7/issues/242): Adding bookmark page to profile page to display bookmarked posts.
- [#248: add training program modal to postcard]( https://github.com/bounswe/bounswe2024group7/issues/248): Modified postfeedcard to show training programs in a modal.
#### 2.3.5 Management-Related Significant Issues
- Added the following lab reports [lab report 5](https://github.com/bounswe/bounswe2024group7/issues/185)

#### 2.3.6 Pull Requests
- [#238: added search bar and result page]( https://github.com/bounswe/bounswe2024group7/pull/238): Succesfully added searchbar and displayed the results.
- [#244: added bookmark page](https://github.com/bounswe/bounswe2024group7/pull/244): Added bookmarks page to user profile page
- [#249: added modal post view]( https://github.com/bounswe/bounswe2024group7/pull/249): Modified post feedcard to make it prettier

### 2.3.7 Additional Information

## 2.4 Eren Pakelgil
### 2.4.1 Responsibilites
- Implementing requirements in the mobile application
- Connecting mobile with backend

### 2.4.2 Main Contibutions
- Created user&post requests and local storage for states
- Added necessary components/pages to mobile app
- Tested and debugged code updates in mobile using Android Studio emulator

### 2.4.3 API Contributions
- **POST api/user/{username}/follow**  
**Example Call:**   ```const response = await apiInstance(sessionToken).post(`api/user/mockusername1111/follow`, {})```  
**Example Response: ```You already follow this user```**   
**Context:** Following a user

- **POST auth/login**  
**Example Call:** ```const response = await apiInstance().post("auth/login",{mockusername1111,mockpassword})```  
**Example Response:** ```{"sessionToken":"ca08d57c-cb08-432b-ab32-ccea536d264a","role":"TRAINEE","username":"mockusername1111","email":"mockemail@gmail.com"}```  
**Context:** Send entered username and password to login endpoint for user validation
### 2.4.4 Code-Related Significant Issues
- [#186: Similarize the Mobile App with Web](https://github.com/bounswe/bounswe2024group7/issues/186)
- [#195: Connect the Mobile Application to the Server Side](https://github.com/bounswe/bounswe2024group7/issues/195)
- [#206: Create Diet Page](https://github.com/bounswe/bounswe2024group7/issues/206)
- [#219: Update PostDetail and ProgramDetail components](https://github.com/bounswe/bounswe2024group7/issues/219)
- [#220: Add ProgressTracker and ProgramProgress Pages To Mobile](https://github.com/bounswe/bounswe2024group7/issues/220)
- [#245: Connecting Feed and Profile with Backend](https://github.com/bounswe/bounswe2024group7/issues/245)
### 2.4.5 Management-Related Significant Issues
### 2.4.6 Pull Requests
- [#187: Similarizing the Mobile Application With the Web Application](https://github.com/bounswe/bounswe2024group7/pull/187)
- [#194: Added Search Feature to the Mobile Application](https://github.com/bounswe/bounswe2024group7/pull/194)
- [#200: Adding Endpoints, Unit Tests, and Diet/Dietician Page](https://github.com/bounswe/bounswe2024group7/pull/200)
- [#247: Connecting the Post Feature in the Mobile Application with Backend](https://github.com/bounswe/bounswe2024group7/pull/247): There was a confict in this branch when merging; the reason was that related branch was too behind than the main branch, and using the previous deployed URI. Conflicts were resolved manually using GitHub web GUI. PR was merged succesfully.
- [#250: Bugs in the Mobile Application are Fixed and the Application Updated](https://github.com/bounswe/bounswe2024group7/pull/250): There was no confict. Bugs related with the mobile application in the previous PR were detected and resolved.
- [#251: Added follow and unfollow functionality that is responsive for user profiles](https://github.com/bounswe/bounswe2024group7/pull/251): There was no confict. Made follow button responsive. Sent request to post follow endpoint when follow button is clicked and delete follow endpoint when followed button is clicked in user profile page. Made use of user following data while determining the state of the follow button when page is initially rendered.

### 2.4.7 Additional Information


## 2.5 Hanaa Zaqout

### 2.5.1 Responsibilities
- Implementing requirements in the frontend part.  
- Connecting frontend components to the backend.

### 2.5.2 Main Contributions
- Creating an interactive page for training program exercises.  
- Developing program progress tracking components, added to the feed and profile pages.  
- Connecting the progress bar to backend endpoints and calculating the progress in the frontend.

### 2.5.3 API Contributions
- [#236: Feature Request: Add completionDate to UserExerciseDetail](https://github.com/bounswe/bounswe2024group7/issues/236)  
  This feature is required for calculating more detailed user progress over a time period.

### 2.5.4 Code-Related Significant Issues
- [#127: Adding Progress Board Component](https://github.com/bounswe/bounswe2024group7/issues/217)  
- [#192: Implementing Training Program Page with Exercise Steps and Progress Tracking](https://github.com/bounswe/bounswe2024group7/issues/192)  
- [#210: Connecting Frontend to Deployed Backend](https://github.com/bounswe/bounswe2024group7/issues/210)

### 2.5.5 Management-Related Significant Issues
- [Adding 7th Lab Report](https://github.com/bounswe/bounswe2024group7/wiki/Lab-Report-%237)

### 2.5.6 Pull Requests
- [#218: Issue 192 Program Page](https://github.com/bounswe/bounswe2024group7/pull/218)  
  Merged the new components I added to the frontend with the main branch. There was a conflict as my branch was behind the main, due to new features being added to the frontend.

### 2.5.7 Additional Information

## 2.6 Mert Cengiz
### 2.6.1 Responsibilites
- Deciding on the Meetings Related to the Entire Group and Organizing Them
- Dividing the Code-Related or Non-Code-Related Tasks Among Members If Necessary
- Developing the Mobile Application of the Project
### 2.6.2 Main Contibutions
- Decided on the Meetings Related to the Entire Group and Organized Them
- Divided Tasks Among Members If Necessary
- Created Contexes to Connect Server Side and Mobile Application
- Added Necessary Components to the Mobile Application
### 2.6.3 API Contributions
As worked as a mobile developer, no API endpoints have developed, but instead used some of them in the mobile application.
- 1) Receiving the Information of a Post From the Database
```
const [postState, setPostState] = useState({
    title: null, 
    description: null,
    owner: null,
    date: null,
    likeCount: null,
    commentCount: null
  });
```
The information coming from the database alters these fields from `null`, and displays it by using its related component.
- 2) Receiving the Information of a Program From the Database
```
const [programState, setProgramState] = useState({
    title: null, 
    description: null,
    labels: null,
    exercises: null
  });
```
Similar to the previous case, the information coming from the database alters these fields from `null`, and displays it by using its related component.
### 2.6.4 Code-Related Significant Issues
- [#186: Similarize the Mobile App with Web](https://github.com/bounswe/bounswe2024group7/issues/186): Our mobile application and the website did not resemble one another, so we have altered the appearance of the mobile application, using the colour palettes of the Web part. This feature enabled to convince customers that these two application belong to the same project.
- [#193: Add Search Feature to Mobile Application](https://github.com/bounswe/bounswe2024group7/issues/193): This feature enabled to make searches from the visual application and obtain result in the presentation.
- [#195: Connect the Mobile Application to the Server Side](https://github.com/bounswe/bounswe2024group7/issues/195): This feature enabled to transfer data between client-side and server-side, which disables the dependency of being static.
- [#206: Create Diet Page](https://github.com/bounswe/bounswe2024group7/issues/206): This feature enabled to reveal a diet page, which is one of the main features of the project, in the mobile application.
- [#208: Adding Search, Post Creation and Program Creation Endpoints](https://github.com/bounswe/bounswe2024group7/issues/208): This feature enabled to obtain some results after making any search, creating any post or program and see it later in the presentation.
- [#245: Connecting Feed and Profile with Backend](https://github.com/bounswe/bounswe2024group7/issues/245): This feature enabled to see a feed and profile page with necessary information available in the database in the presentation.
### 2.6.5 Management-Related Significant Issues
- [#185: Adding Fifth Lab Report](https://github.com/bounswe/bounswe2024group7/issues/185): Even though all the management-related issues evolved in a code-related one somewhere, this one did not evolve as discussion and design was done only. Contributed as reviewing and evaluating all progress in that lab, and divided the future tasks, similar to all labs.
### 2.6.6 Pull Requests
- [#187: Similarizing the Mobile Application With the Web Application](https://github.com/bounswe/bounswe2024group7/pull/187). There was no confict. After this PR, the mobile and Web parts resemble each other.
- [#194: Added Search Feature to the Mobile Application](https://github.com/bounswe/bounswe2024group7/pull/194). There was no confict. Created a search bar component and the component that returns results of that search, as well as the component containing all that results.
- [#200: Adding Endpoints, Unit Tests, and Diet/Dietician Page](https://github.com/bounswe/bounswe2024group7/pull/200). There was no confict. Added some unit tests in the mobile application, a dietician page by creating the necessary component, and SearchContext, ProgramContext, PostContext contexes, while initalizing PostContext as the assignee of this PR.
- [#247: Connecting the Post Feature in the Mobile Application with Backend](https://github.com/bounswe/bounswe2024group7/pull/247). There was a confict in this branch when merging; the reason was that related branch was too behind than the main branch, and using the previous deployed URI.
- [#250: Bugs in the Mobile Application are Fixed and the Application Updated](https://github.com/bounswe/bounswe2024group7/pull/250). There was no confict. Bugs related with the mobile application in the previous PR were detected, and [Eren](https://github.com/bounswe/bounswe2024group7/wiki/Eren-Pakelgil) implemented our proposed solution.
### 2.6.7 Additional Information
Trying to run Android Studio was too hard as many different problems happened both in building the mobile application and running the Android emulator phases. Too much time was wasted into it, unfortunately. As a consequence, the mobile part experienced a slower progress than the other parts.

## 2.7 Mustafa Ocak
### **2.7.1 Responsibilities**  
- Implemented and enhanced backend functionality for search and tagging in the application.
- Designed and managed the database schema for tag and search related entities, generate mock data for them.
- Set up CI/CD pipelines for streamlined deployment and ensured reliability in Kubernetes-based environments.

---

### **2.7.2 Main Contributions**  
- Enabled keyword-based search functionality across exercises, posts, and training programs.
- Developed a new endpoins to retrieve all available tags for better client-side functionality.
- Generated mock data for testing and development purposes, ensuring robustness in the application.

---

### **2.7.3 API Contributions**  
1. **Search Endpoint:**
   - **`/api/search`**: Allows keyword-based search across multiple entities like exercises, posts, and training programs.
   - Supports both single and multi-word queries with flexible whitespace handling.

2. **Tags Retrieval Endpoint:**
   - **`GET /api/tags`**: Provides all tags available in the system for tagging features in exercises, posts, and programs.

---

### **2.7.4 Code-Related Significant Issues**  

- [Issue#255](https://github.com/bounswe/bounswe2024group7/issues/255): Insert Mock Data for Posts and Tags  
  Generated 50+ fitness-related posts and 150+ unique tags for testing and UI scenarios.

- [Issue#254](https://github.com/bounswe/bounswe2024group7/issues/254): Add Unit and Integration Tests for `/search` Endpoint and Tag Retrieval Service  
  Developed unit and integration tests to validate `/search` and `GET /api/tags` endpoints, ensuring accurate functionality and robust query handling.

- [Issue#201](https://github.com/bounswe/bounswe2024group7/issues/201): Implement/Enhance Search Functionality  
  Enhanced search logic to support multi-word queries, whitespace handling, and advanced filtering, improving usability and accuracy.

---

### **2.7.5 Management-Related Significant Issues**  

- [Issue#199](https://github.com/bounswe/bounswe2024group7/issues/199): Set up Kubernetes Cluster in Digital Ocean Droplet  
  Configured Kubernetes clusters for reliable deployments, integrated with CI/CD pipelines for streamlined operations.

- [Issue#198](https://github.com/bounswe/bounswe2024group7/issues/198): Change Deployment Platform from GCP to Digital Ocean  
  Migrated deployment from GCP to DigitalOcean to optimize costs and decrease latency.

- [Issue#188](https://github.com/bounswe/bounswe2024group7/issues/188): Migrate Deployment from Digital Ocean to GCP but revert it later since GCP cause latency.
---

### **2.7.6 Pull Requests**  
- [PR#224](https://github.com/bounswe/bounswe2024group7/pull/224): Created `GET /api/tags` endpoint for retrieving all tags, Managed mock data generation scripts to streamline local development and testing.
- [PR#223](https://github.com/bounswe/bounswe2024group7/pull/223): Added `/search` endpoint to `SearchController`, enabling keyword-based search.


## 2.8 Oğuz Hekim
### 2.8.1 Responsibilites
As a member of the backend team, I was responsible for managing the database, developing and documenting the API, and handling requests from the frontend teams by providing the necessary endpoints.
### 2.8.2 Main Contributions

  - Getting exercises from an external API and modifying the model structures according to the new data. [Issue#190](https://github.com/bounswe/bounswe2024group7/issues/190), [PR#191](https://github.com/bounswe/bounswe2024group7/pull/191)
  - Creating user stories during the lab session. [Issue#189](https://github.com/bounswe/bounswe2024group7/issues/189), [User Stories](https://github.com/bounswe/bounswe2024group7/wiki/User-Stories)
  - Implementing a feature to share training programs in posts. [Issue#203](https://github.com/bounswe/bounswe2024group7/issues/203), [PR#207](https://github.com/bounswe/bounswe2024group7/pull/207)
  - Implementing a tracking mechanism for training programs. [Issue#204](https://github.com/bounswe/bounswe2024group7/issues/204), [PR#211](https://github.com/bounswe/bounswe2024group7/pull/211)
  - Refactoring training program endpoints to add response body to POST requests. [PR#221](https://github.com/bounswe/bounswe2024group7/pull/221)
  - Adding an optional image URL field for Posts. [PR#222](https://github.com/bounswe/bounswe2024group7/pull/222)
  - Implementing unit tests for the authentication service. [Issue#226](https://github.com/bounswe/bounswe2024group7/issues/226), [PR#227](https://github.com/bounswe/bounswe2024group7/pull/227)
  - Refactoring training program endpoints to check ongoing programs. [PR#228](https://github.com/bounswe/bounswe2024group7/pull/228)
  - Creating API documentation for the project. [Issue#252](https://github.com/bounswe/bounswe2024group7/issues/252), [API Documentation](https://github.com/bounswe/bounswe2024group7/wiki/API-Documentation)

### 2.8.3 API Contributions
- I developed `/api/exercises` to use the data I have acquired from an external API. 
- I implemented these new endpoints.
  -  `/api/training-programs/{trainingProgramId}/exercises/{exerciseId}/complete`
  - `/api/training-programs/{trainingProgramId}/exercises/{exerciseId}/uncomplete`
  - `/api/training-programs/{trainingProgramId}/complete` 
 - In addition to new ones, I modified every endpoint in the Training Program Controller/Service because I changed the structure of the training programs to incorparate new exercise structure and tracking mechanism.
- The new exercise structure is used inside the new training program structure. There two response types for training programs. One of them is purely the training program that trainer created. The other one is to track the progress of a specific user that has joined that training program. Here are the main response structures for each one:
  - Exercise: 
	```json
	
	  {
	    "id": 0,
	    "name": "string",
	    "gifUrl": "string",
	    "bodyPart": "BACK",
	    "targetMuscle": "ABDOMINALS",
	    "equipment": "ASSISTED",
	    "instructions": [
	      "string"
	    ],
	    "secondaryMuscles": [
	      "ABDOMINALS"
	    ]
	  }
	
	``` 
   - Training Program (without tracking elements): 
		```json
		{
		    "id": 0,
		    "title": "string",
		    "exercises": [
		      {
		        "id": 0,
		        "exercise": {
		          "id": 0,
		          "name": "string",
		          "gifUrl": "string",
		          "bodyPart": "BACK",
		          "targetMuscle": "ABDOMINALS",
		          "equipment": "ASSISTED",
		          "instructions": [
		            "string"
		          ],
		          "secondaryMuscles": [
		            "ABDOMINALS"
		          ]
		        },
		        "repetitions": 0,
		        "sets": 0
		      }
		    ],
		    "description": "string",
		    "trainerUsername": "string",
		    "participants": [
		      "string"
		    ],
		    "createdAt": "2024-11-29T12:45:57.388Z"
		  }
		```
    - Training Program (with tracking elements): 
		```json
		{
		  "id": 0,
		  "title": "string",
		  "exercises": [
		    {
		      "id": 0,
		      "exercise": {
		        "id": 0,
		        "name": "string",
		        "gifUrl": "string",
		        "bodyPart": "BACK",
		        "targetMuscle": "ABDOMINALS",
		        "equipment": "ASSISTED",
		        "instructions": [
		          "string"
		        ],
		        "secondaryMuscles": [
		          "ABDOMINALS"
		        ]
		      },
		      "repetitions": 0,
		      "sets": 0,
		      "completed": true
		    }
		  ],
		  "description": "string",
		  "trainerUsername": "string",
		  "participants": [
		    "string"
		  ],
		  "status": "ONGOING",
		  "joinedAt": "2024-11-29T12:47:19.112Z",
		  "completedAt": "2024-11-29T12:47:19.112Z"
		}
		```

### 2.8.4 Code-Related Significant Issues
 - [Issue#190](https://github.com/bounswe/bounswe2024group7/issues/190): Pulling exercises with script to enter them to database and creating new exercise structure in the code. 
  - [Issue#203](https://github.com/bounswe/bounswe2024group7/issues/203): Feature to share training programs in posts.
  - [Issue#204](https://github.com/bounswe/bounswe2024group7/issues/204): Tracking mechanism for training programs.
  - [Issue#226](https://github.com/bounswe/bounswe2024group7/issues/226): Unit tests for the authentication service.
### 2.8.5 Management-Related Significant Issues
- [Issue#252](https://github.com/bounswe/bounswe2024group7/issues/252): API documentation for the project.
- [Issue#189](https://github.com/bounswe/bounswe2024group7/issues/189): User stories.

### 2.8.6 Pull Requests
  - [PR#191](https://github.com/bounswe/bounswe2024group7/pull/191): New exercise structure.
  - [PR#207](https://github.com/bounswe/bounswe2024group7/pull/207): Feature to share training programs in posts.
  - [PR#211](https://github.com/bounswe/bounswe2024group7/pull/211): Tracking mechanism for training programs.
  - [PR#221](https://github.com/bounswe/bounswe2024group7/pull/221): Add response body to POST requests for training program endpoints. 
  - [PR#222](https://github.com/bounswe/bounswe2024group7/pull/222): Optional imageUrl field for Posts. 
  - [PR#227](https://github.com/bounswe/bounswe2024group7/pull/227): Unit tests for the authentication service.
  - [PR#228](https://github.com/bounswe/bounswe2024group7/pull/228): Refactoring training program endpoints to check ongoing programs. 


# 3. The Software

The deployed pre-release including the related `.apk` file is [available](https://github.com/bounswe/bounswe2024group7/releases/tag/0.2.0-alpha) in GitHub. 
<details>
<summary>
Web Frontend Deploy Link
</summary>

http://165.227.166.132:30001/
</details>
<details>
<summary>
Backend Deploy Link
</summary>

http://165.227.166.132:30002/
</details>
