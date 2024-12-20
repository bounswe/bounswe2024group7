# Introduction
This is the third customer milestone report of the Group 7 of bounswe2024. This group of CMPE451 Project Development in Software Engineering Course intends to build a software called Fitness Fact which brings people wishing to dive into the fitness world with professional trainers and dieticians. The contributed members of this project are: 
- [Abdulsamet Alan](https://github.com/bounswe/bounswe2024group7/wiki/Abdulsamet-Alan)
- [Asım Dağ](https://github.com/bounswe/bounswe2024group7/wiki/As%C4%B1m-Da%C4%9F)
- [Deniz Bilge Akkoç](https://github.com/bounswe/bounswe2024group7/wiki/Deniz-Bilge-Akkoc)
- [Eren Pakelgil](https://github.com/bounswe/bounswe2024group7/wiki/Eren-Pakelgil)
- [Hanaa Zaqout](https://github.com/bounswe/bounswe2024group7/wiki/Hanaa-Zaqout)
- [Mert Cengiz](https://github.com/bounswe/bounswe2024group7/wiki/Mert-Cengiz)
- [Mustafa Ocak](https://github.com/bounswe/bounswe2024group7/wiki/Mustafa-Ocak)
- [Oğuz Hekim](https://github.com/bounswe/bounswe2024group7/wiki/Oguz-Hekim)

# 1. Group Milestone Report
## 1.1 Executive Summary
### 1.1.1 Summary of The Project Status
### 1.1.2 Status of Deliverables
| Deliverable | Progress | Link |
| :---: | :---: | :---: | 
| Communication Plan | Delivered and Completed | [Communication Plan](https://github.com/bounswe/bounswe2024group7/wiki/Communication-Plan) |
| Project Plan | Delivered and Completed  | [Project Plan](https://github.com/bounswe/bounswe2024group7/wiki/Project-Plan) |
| UML Diagrams | Delivered and Completed  | [UML Diagrams](https://github.com/bounswe/bounswe2024group7/wiki/UML-Sequence-Diagrams) |
| Requirements | Delivered and Completed  | [Requirements](https://github.com/bounswe/bounswe2024group7/wiki/Requirements-of-the-New-Project) |
| Mock-ups and Scenarios | Delivered and Completed  | [Scenarios with Mock-ups](https://github.com/bounswe/bounswe2024group7/wiki/Use-Case-Scenarios) |
| Meeting Notes | Delivered and Completed  | [Meeting Notes](https://github.com/bounswe/bounswe2024group7/wiki/Meeting-Notes) |
| Lab Reports | Delivered and Completed  | [Lab Reports](https://github.com/bounswe/bounswe2024group7/wiki/Lab-Notes) |
| Milestone Report | Delivered and Completed  | [Milestone Report](https://github.com/bounswe/bounswe2024group7/wiki/CMPE451-Customer-Milestone-Report-%E2%80%90-3) |
| Responsibility Assignment Matrix (RAM) | Delivered and Completed  | [RAM](https://github.com/bounswe/bounswe2024group7/wiki/Responsivity-Assignment-Matrix-(RAM)) |
| User Stories | Delivered and Completed  | [User Stories](https://github.com/bounswe/bounswe2024group7/wiki/User-Stories) |
| API Documentation | Delivered and Completed  | [API Documentation](https://github.com/bounswe/bounswe2024group7/wiki/API-Documentation) |
### 1.1.3 Final Release Notes
### 1.1.4 Changes Made or Planned Based on Previous Milestones

#### 1.1.4.1 Feedback Form

**Implemented:**
- Trainees can provide feedback on the training program they are participating in by selecting muscles from a body diagram and adding comments.
- Feedback can be provided for multiple muscles in a single submission.
- Trainers have access to all feedback provided by trainees.

**Improvements that could not be implemented in the given time:**
- The ability for trainers to follow up with trainees directly via messaging regarding the feedback received could not be implemented within the given time frame.

---

#### 1.1.4.2 Training Program Structure

**Previous Design:**  
- The program structure featured exercises that could be marked as completed or not, using checkboxes to indicate progress (0% or 100%).

**Current Design and Implementation:**
- The training program is now divided into weekly segments, each containing a series of workouts. Each workout includes multiple exercises with defined sets and repetitions.
- Trainees must submit their completion for all exercises within a workout before moving on to the next workout.
- Similarly, trainees must submit their completion for all exercises in a week before progressing to the following week.
- Trainees are free to complete exercises within a workout in any order.
- For each exercise, trainees must input the number of completed repetitions for each set. Once submitted, the information cannot be edited.
- Trainees can view detailed information for the training program or workout at any time, including progress status.
- Reminder cards are displayed on the feed page to prompt users about exercises in the current active workout (implemented on web, but not on mobile due to time constraints).
** Improvements that could not be implemented in the given time:**
- Allow trainee to edit the submitted completed sets for a given exercise.
- Allow trainer to edit training program details.
---

#### 1.1.4.3 Training Guidance

**Current Design and Implementation:**
- When the trainer creates the training program, they decide on rest days and recommend a rest period of X days before continuing workouts. This will help trainees to recover and maximize performance.
- If the trainee tries to do an exercise during the rest period, a warning will appear on the screen reminding the trainee that he/she is in the rest period. It is then up to the trainee to either take this advice or continue with the exercise anyway.
- System does not allow users to join more than one training program of the same type at the same time.

---

#### 1.1.4.4 Progress Tracking

**Previous Design:**  
- The program suggested a fixed number of repetitions and sets for each exercise, but trainees could only mark exercises as "completed" or "not completed," which did not reflect actual progress.

**Current Design and Implementation:**
- Trainees are now required to input the number of repetitions completed for each set, providing a more accurate representation of their progress.
- The backend logs the date and time when each set is completed, enabling detailed tracking.
- **Progress Visualization**: Trainees can track their progress through graphs on their profile page:
  - **Web Version:** Graphs display progress for each muscle trained across various programs.
  - **Mobile Version:** Displays the daily commitment percentage for all active programs.

**Planned but Not Implemented:**

- **Progress Bar Calculation:**  
  - Mockups initially showed a detailed progress bar calculation, factoring in the number of exercises, expected repetitions, and actual completed repetitions.  
  - However, in the current implementation, this detailed calculation is applied only at the exercise level, not at the overall program level.
  - The system currently assumes that any submitted progress fully satisfies the suggested sets and repetitions, without accounting for the actual number completed.

- Update the system to reflect actual completed sets and repetitions in the overall program progress, rather than assuming full completion upon submission.
- Exercises should be visually categorized (gray, yellow, orange, green) based on the trainee’s progress relative to the required sets, as indicated in the mockups.
- Further enhancements could include more detailed progress graphs that are consistent across both the web and mobile platforms.

---

#### 1.1.4.5 Recommended Posts and Training Programs in Feed

**Previous Design:**  
- No optimized algorithm for post and training programs recommendations on the feed page.

**Current Design and Implementation:**
- The sign-up form includes fields for Level and Interest Area, which are added to the user's profile.
- Posts in the "For You" section are suggested based on the user's chosen preferences.
- An "Explore" section is added, where the user can view posts from any interest area.
- The training programs' recommendation section is ordered based on the number of users who have joined each program, with the program that has the most users displayed at the top of the recommendations.

**Proposed Improvements:**
- The user should be able to change their level and topic of interest after signing up.
- Currently, a user can see their own posts in the Explore section, which should not be the case.

---
### 1.1.5 Reflections Related to Final Milestone Demo and Lessons Learned 
Any meeting with the customers obviously helps the team realize the strengths and weaknesses of both the team itself and the application developed by the feedback the customers give and the reflections and reactions they expressed. Their reflections, reactions, and lessons learned from the demo could be listed as:
#### 1.1.5.1 Customer Reflections To The Final Milestone Demo
Before the Final Milestone Demo, many formal and informal meetings were held with the Customer and their demands are listened and tried to be understood carefully. There were serious alterations were made as a consequence of these meetings. However, there were some unclear points in their minds about the application as they asked many questions to clarify some mechanisms in the Final Milestone Demo. In the presentation, such points could be emphasize at the very beginning, yet the Presentation Plan was not designed according to these facts since it couldn't been foreseen. As a consequence, they were partially satisfied as there were many implemented core bug-free functionalities, while obviously there were many parts that could be improved in order to develop a more user-friendly application.
#### 1.1.5.2 Lessons Learned From The Final Milestone Demo
It is essential to ask Customers for their demands more frequently in order to avoid miscommunication-related problems. Additionally, testing should be done earlier as handling many errors and bugs while trying to present a finalized application is difficult than thought at the first time. Furthermore, before presenting to the Customers, presenting someone else for feedback about unclear parts about the both presentation and the application itself in order to give more importance of that points as it is possible to not detect the unclear parts as developers.

### 1.1.6 What Could Have Been Done Differently at the Beginning of The Project
Obviously our choices throughout the semester has determined our progress and the quality of our final product. Although all of our members put their best effort throughout the semester, there were three essential points that determine the final product, which could be listed as:
1. **Frequency of Meetings:** We have chosen to have only one meeting per week as we first though it is sufficient. In fact it was not a problem in requirement specification and design phases. On the other hand, in the implementation phase, more meetings were needed, and finding a suitable time slot for everyone was difficult as all members have filled their time with their other jobs.
2. **More Meetings With The Customer:** One of the major problems that our team has encountered was the late demands of the customer. Customer demanded many features that was not mentioned in the [Software Requirements Specification (SRS)](https://github.com/bounswe/bounswe2024group7/wiki/Requirements-of-the-New-Project) as their thoughts were different from ours. The miscommunication was detected and solved too late, with a burden of extremely increased additional work to the team.
3. **Determining the Subteams:** At the very beginning, our team was not strictly divided into three subteams, but instead, a more flexible approach was preferred, which is that every member should be able to perform what is necessary. Though this approach seems more efficient in theory, it did not work due to not only technical problems encountered especially in Android Studio and the prior knowledge of some group members, but also the return of increased learning curve which is impossible to handle within a short amount of time.

## 1.2 Progress Based on Teamwork
### 1.2.1 Status Of Requirements
| Requirement Number | Progress| 
| :---: | :---: |
| 1.1.1.1.1 | In Progress | 
| 1.1.1.1.2 | In Progress | 
| 1.1.1.2 | Completed | 
| 1.1.1.3 | Completed | 
| 1.1.1.4 | Not Started | 
| 1.1.2.1 | Completed | 
| 1.1.2.2 | Completed | 
| 1.1.3.1.1 | Completed |
| 1.1.3.1.1.1 | Completed |
| 1.1.3.1.1.2 | In Progress |
| 1.1.3.1.1.3 | In Progress |
| 1.1.3.1.2 | Completed |
| 1.1.3.1.3 | Completed |
| 1.1.3.2.1 | Completed |
| 1.1.3.2.2 | Completed |
| 1.1.3.2.3 | Completed |
| 1.1.3.2.4 | Completed |
| 1.1.3.3.1 | Completed |
| 1.1.3.4.1 | Not Started |
| 1.1.4 | Completed |
| 1.1.5.1 | Completed |
| 1.1.5.2 | Not Started |
| 1.1.5.3 | In Progress |
| 1.1.5.4 | Not Started |
| 1.1.5.5 | In Progress |
| 1.1.5.6 | Completed |
| 1.1.5.7 | Completed |
| 1.1.6.1 | Completed |
| 1.1.6.2 | Completed |
| 1.1.6.3 | Completed |
| 1.1.6.4 | Completed |
| 1.1.6.5 | Not Started|
| 1.1.7 | In Progress |
| 1.1.8.1 | Completed |
| 1.1.8.2 | Not Started |
| 1.1.9.1 | Completed |
| 1.1.9.2 | In Progress |
| 1.1.9.3 | In Progress |
| 1.2.1 | Completed |
| 1.2.2.1.1 | In Progress |
| 1.2.2.1.2 | In Progress |
| 1.2.2.1.3 | Completed |
| 1.2.2.2.1 | In Progress |
| 1.2.3 | Started|
| 1.2.4.1 | Completed |
| 1.2.4.2 | Completed |
| 1.2.4.3 | In Progress |
| 1.2.4.4 | Completed |
| 2.1 | Completed |
| 2.2 | Completed |
| 2.3 | Not Started |
| 2.4 | Completed |

### 1.2.2 API Endpoints
The updated API Documentation Wikipage can be accesed [here](https://github.com/bounswe/bounswe2024group7/wiki/API-Documentation). This page contains descriptions of each endpoint. For more detailed info such as request and responses, you can open [OpenAPI specification file](https://github.com/bounswe/bounswe2024group7/blob/main/backend/fitnessfact.yaml) in [Swagger Editor](https://editor.swagger.io).

We also have a Postman Workspace to use the enpoints. You can use [this workspace](https://www.postman.com/science-cosmologist-43761281/group7-workspace/request/jjzd1p9/create-training-program) to send requests to the API. In order to make calls with Postman, first select the environment as `prod` in the top right corner. This will send the requests to our deployed API at `http://165.227.166.132:30002/`. 

Follow these steps to test the API using Postman:

#### 1. Register a User

- Select `register` under the **Authentication** collection.
- In the **Body** tab, you will see an example request body. Change the details here but keep the role as `TRAINEE`.
- Send the request. 
- **Response:** You will receive a token in the response. Save this token for authentication in further requests.

#### 2. Join a Training Program

- Select `join training program` under the **Training Program** collection.
- Go to the **Header** tab and set the value of `x-session-token` to the token obtained from the `register` response.
- Keep the URL as `{{base_url}}/api/training-programs/11/join`.
- Send the request.
- **Response:** You will receive a response object with tracking details, such as `completedAt` and `completionPercentage`.

#### 3. Complete an Exercise

- Select `complete exercise` under the **Training Program** collection.
- Go to the **Header** tab and set the value of `x-session-token` to the token obtained from the `register` response.
- Keep the URL as `{{base_url}}/api/training-programs/11/workout-exercises/26/complete`.
- In the **Body** tab, you can enter the number of reps you did for each set. You can modify the values in the array or leave them as is.
- Send the request.
- **Response:** You will receive a similar response as the previous step, but some of the tracking elements, such as `completionPercentage` and `completedAt`, for the first exercise will be updated.

#### 4. Get Exercise Progress

- Select `get exercise progress` under the **Exercise** collection.
- Go to the **Header** tab and set the value of `x-session-token` to the token obtained from the `register` response.
- Keep the URL as `{{base_url}}/api/exercises/651/progress`.
- Send the request.
- **Response:** In the `progress` field of the response, you will see an array of `completedDate` and `completedCount` pairs. The `completedCount` should equal the sum of the reps you did in each set in the previous step.

### 1.2.3 Links to The Code in the Project Repository For Each User Interface Design
#### 1.2.3.1 Web
* [Profile Page](https://github.com/bounswe/bounswe2024group7/blob/main/frontend/src/components/profilePage.component.jsx)
* [Reminder Card of Active Workouts' Exercises Component in Feed Page](https://github.com/bounswe/bounswe2024group7/blob/main/frontend/src/components/UserJoinedProgramsCard.component.jsx)
* [Training Program Page](https://github.com/bounswe/bounswe2024group7/blob/main/frontend/src/components/Training.component.jsx)
* [Progress Graphs Component in Profile Page](https://github.com/bounswe/bounswe2024group7/blob/main/frontend/src/components/ProgressGraphs.component.jsx)
* [Exercise Details Modal](https://github.com/bounswe/bounswe2024group7/blob/main/frontend/src/components/Detailed_Ex_Modal.component.jsx)
* [Workout Details Modal](https://github.com/bounswe/bounswe2024group7/blob/main/frontend/src/components/Detailed_Workout_Modal.component.jsx)
* [Training Program Details Modal](https://github.com/bounswe/bounswe2024group7/blob/main/frontend/src/components/Detailed_Training_Modal.component.jsx)
#### 1.2.3.2 Mobile
* [Own Profile](https://github.com/bounswe/bounswe2024group7/blob/main/mobile/components/ProfilePage.js)
* [Other User Profile](https://github.com/bounswe/bounswe2024group7/blob/main/mobile/components/UserProfile.js)
* [Training Program Card](https://github.com/bounswe/bounswe2024group7/blob/main/mobile/components/ProgramCard.js)
* [Training Program Detail](https://github.com/bounswe/bounswe2024group7/blob/main/mobile/components/ProgramDetail.js)
* [Joined Training Program](https://github.com/bounswe/bounswe2024group7/blob/main/mobile/components/JoinedProgramDetail.js)
* [Progress Tracker Component in Profile Page](https://github.com/bounswe/bounswe2024group7/blob/main/mobile/components/ProgressTracker.js)
* [Exercise Detail](https://github.com/bounswe/bounswe2024group7/blob/main/mobile/components/JoinedExercise.js)
* [Workout Detail](https://github.com/bounswe/bounswe2024group7/blob/main/mobile/components/JoinedWorkout.js)
* [Week Detail](https://github.com/bounswe/bounswe2024group7/blob/main/mobile/components/JoinedWeek.js)
* [Feed](https://github.com/bounswe/bounswe2024group7/blob/main/mobile/components/Feed.js)
* [Post Card](https://github.com/bounswe/bounswe2024group7/blob/main/mobile/components/PostCard.js)
* [Post Detail](https://github.com/bounswe/bounswe2024group7/blob/main/mobile/components/PostDetail.js)
* [Survey](https://github.com/bounswe/bounswe2024group7/blob/main/mobile/components/Survey.js)
* [Search](https://github.com/bounswe/bounswe2024group7/blob/main/mobile/components/SearchResults.js)
* [Search by Muscle](https://github.com/bounswe/bounswe2024group7/blob/main/mobile/components/SearchPage.js)


### 1.2.4 Screenshots of All Implemented Web and Mobile Interfaces

You can access the screenshots of all implemented web and mobile interfaces [here](https://github.com/bounswe/bounswe2024group7/wiki/Screenshots-of-All-Implemented-Web-and-Mobile-Interfaces).
### 1.2.5 The Work Completed Towards Applying W3C Standards
### 1.2.6 Scenario Encompassing All Core Functionalities of The Project

## 1.3 Individual Documentation
### 1.3.1 Abdulsamet Alan

#### 1.3.1.1 Responsibilities
- Leading the web team.
- Coordinating integration between the frontend and backend teams.
- Leading discussions on architectural decisions to address compatibility issues.
- Facilitating meetings to resolve blockers during implementation.

#### 1.3.1.2 Main Contributions
- Directed efforts to integrate frontend and backend functionalities seamlessly, ensuring effective communication between components.
- Conducted pair programming and troubleshooting sessions to resolve architectural and code-related issues.
- Played a significant role in aligning the web application's feature set and visual design to project requirements.
- Managed and resolved critical issues affecting the system's stability and performance.

#### 1.3.1.3 Code-Related Significant Issues
- [#375](https://github.com/bounswe/bounswe2024group7/issues/375) Add program type to FeedCard
- [#373](https://github.com/bounswe/bounswe2024group7/issues/373) Fix active programs all workouts show 
- [#372](https://github.com/bounswe/bounswe2024group7/issues/372) Fix progress bar on the training page 
- [#368](https://github.com/bounswe/bounswe2024group7/issues/368) Fix programs bug on feed page 
- [#367](https://github.com/bounswe/bounswe2024group7/issues/367) Add recommended and explore programs 
- [#365](https://github.com/bounswe/bounswe2024group7/issues/365) Add explore and for you posts
- [#360](https://github.com/bounswe/bounswe2024group7/issues/360) User cannot join two programs with same area at any time
- [#357](https://github.com/bounswe/bounswe2024group7/issues/357) Fix 404 on Training page
- [#355](https://github.com/bounswe/bounswe2024group7/issues/355) Fix training page require reload to show the progress
- [#353](https://github.com/bounswe/bounswe2024group7/issues/353) Fix feed page user joined programs
- [#350](https://github.com/bounswe/bounswe2024group7/issues/350) Change create program modal intervals
- [#348](https://github.com/bounswe/bounswe2024group7/issues/348) Fix join program bug on Training page
- [#342](https://github.com/bounswe/bounswe2024group7/issues/348) Update styles for mobile responsive 
- [#341](https://github.com/bounswe/bounswe2024group7/issues/341) Add progress request to profile page 
- [#332](https://github.com/bounswe/bounswe2024group7/issues/332) Ask user to rest before starting another workout
- [#311](https://github.com/bounswe/bounswe2024group7/issues/311) Remove Progress Today from feed page 
- [#308](https://github.com/bounswe/bounswe2024group7/issues/308) Fix Start Practicing on ProgramFeedCard
- [#304](https://github.com/bounswe/bounswe2024group7/issues/304) Show tags on posts
- [#299](https://github.com/bounswe/bounswe2024group7/issues/299) Add level and interest areas to user register


#### 1.3.1.4 Management-Related Significant Issues
- Actively monitored team progress to ensure alignment with milestones and timely delivery of tasks.
- Provided mentorship to team members, enhancing the team's overall productivity and skillset.
- [Lab 8 Report](https://github.com/bounswe/bounswe2024group7/pull/256) - Contributed to the Lab Report 8
- [Lab 9 Report](https://github.com/bounswe/bounswe2024group7/wiki/Lab-Report-%239) - Led the last demo session details. Assigned the tasks to the frontend team.

#### 1.3.1.5 Pull Requests
You can see the PR's related to the above issues.
- [#369 Fix programs bug on feed page ](https://github.com/bounswe/bounswe2024group7/pull/369)
- [#366 Add explore and for you posts](https://github.com/bounswe/bounswe2024group7/pull/366)
- [#359 ask user to rest](https://github.com/bounswe/bounswe2024group7/pull/359)
- [#358 Fix 404 on Training page](https://github.com/bounswe/bounswe2024group7/pull/358)
- [#356 fix Training page require reload to progress ](https://github.com/bounswe/bounswe2024group7/pull/369)
- [#354 fix user profile bug on joined programs](https://github.com/bounswe/bounswe2024group7/pull/356)
- [#351 Change interval definition the rest days ](https://github.com/bounswe/bounswe2024group7/pull/351)
- [#349 Add user from context ](https://github.com/bounswe/bounswe2024group7/pull/349)
- [#347 add progress data to profile page ](https://github.com/bounswe/bounswe2024group7/pull/347)
- [#344 Add supporting features to training program ](https://github.com/bounswe/bounswe2024group7/pull/344)
- [#343 Update styles for mobile responsive Feed page](https://github.com/bounswe/bounswe2024group7/pull/343)
- [#333 transition from start to completed](https://github.com/bounswe/bounswe2024group7/pull/333)
- [#312 Remove ProgressToday from feed page ](https://github.com/bounswe/bounswe2024group7/pull/312)
- [#309 fix handleStartPracticing ](https://github.com/bounswe/bounswe2024group7/pull/309)
- [#307 Update ProgramFeedCard trainerUsername to trainer ](https://github.com/bounswe/bounswe2024group7/pull/307)
- [#305 Update PostFeedCard.component.jsx](https://github.com/bounswe/bounswe2024group7/pull/305)
- [#300 Add interest areas and level to user register ](https://github.com/bounswe/bounswe2024group7/pull/300)

#### 1.3.1.6 Unit Tests
#### Login Page Tests

| **Test Case**                             | **Result**              |                                                                                        
|-------------------------------------------|-------------------------|
| **Render the component correctly** | Passed |
| **Handle username and password input** | Passed |
| **Call login API and dispatch actions on successful login** | Passed |
| **Show an error toast on failed login** | Passed |

#### CreatePostModal Tests

| **Test Case**                             | **Result**              |                                                                                        
|-------------------------------------------|-------------------------|
| **Renders the modal with all fields** | Passed |
| **Allows users to fill out the form fields** | Passed |
| **Displays the training programs in the dropdown** | Passed |
| **Displays the tags in the dropdown** | Passed |
| **Shows an error toast if no tags are selected** | Passed |
| **Shows a success toast on successful post creation** | Passed |
| **Resets fields and closes the modal when cancel is clicked** | Passed |

### 1.3.2 Asım Dağ - Group 7 - Backend
#### 1.3.2.1 Responsibilities
As a backend team's member, I was responsible from implementing post and recommendation related features, checking the compatibility of endpoints with requests from frontend and mobile, and other backend related issues like database and security management etc.
Before milestone 3, I both worked for mobile and backend. The details can be found in other milestone reports.
#### 1.3.2.2 Main Contributions (Code-Related / Management-Related Significant Issues)
- I worked for the recommendation system mainly.
- I implemented user's preferences based post and training program recommendation system.
- For posts, I added the endpoints about liking a post and bookmarking a post.
- I also implemented the logic to add the favorite tags of a user into the database.
- In report, I filled the User Manual and System Manual for Backend.
- These are for the issues between milestone 2 and milestone 3. The other responsibilities of mine can be found in second milestone report.

**Code-Related Significant Issues:**
- [Issue#337](https://github.com/bounswe/bounswe2024group7/issues/337): Implement ordering for posts pages.
- [Issue#334](https://github.com/bounswe/bounswe2024group7/issues/334): Implement Recommendation System for Training Programs in Backend.
- [Issue#315](https://github.com/bounswe/bounswe2024group7/issues/315): Removing username from Survey request and response to apply authentication.
- [Issue#313](https://github.com/bounswe/bounswe2024group7/issues/313): Bug Fix: some enum values require local encodings in backend.
- [Issue#276](https://github.com/bounswe/bounswe2024group7/issues/276): Create endpoint for exercise based progress over time.
- [Issue#275](https://github.com/bounswe/bounswe2024group7/issues/275): Add Survey for Registration.
- [Issue#270](https://github.com/bounswe/bounswe2024group7/issues/270): Add weekly completion endpoint (tracking mechanism).
- [Issue#269](https://github.com/bounswe/bounswe2024group7/issues/269): Add workout based progress (tracking mechanism).
- [Issue#268](https://github.com/bounswe/bounswe2024group7/issues/268): Add finish endpoint for exercise of workout.
- [Issue#265](https://github.com/bounswe/bounswe2024group7/issues/265): Add week based progress (tracking mechanism).
- [Issue#264](https://github.com/bounswe/bounswe2024group7/issues/264): Add Total Progress Percent for joined Training Program(tracking mechanism).
- [Issue#263](https://github.com/bounswe/bounswe2024group7/issues/263): Add Rating (evaluation mechanism) for Training Program.
- [Issue#261](https://github.com/bounswe/bounswe2024group7/issues/261): Change Training Program Model.
- [Issue#253](https://github.com/bounswe/bounswe2024group7/issues/253): Merge the Unit Tests for PostService and PostController in backend written in local.
- [Issue#204](https://github.com/bounswe/bounswe2024group7/issues/204): Implement Tracking Mechanism for Training Programs.
- [Issue#203](https://github.com/bounswe/bounswe2024group7/issues/203): Implement Feature to Share Training Program in Posts.
- [Issue#202](https://github.com/bounswe/bounswe2024group7/issues/202): Implement Bookmark and Like Features for Posts.
- [Issue#201](https://github.com/bounswe/bounswe2024group7/issues/201): Implement / enhance Search functionality.
- [Issue#164](https://github.com/bounswe/bounswe2024group7/issues/164): Add Components To Mobile.
- [Issue#147](https://github.com/bounswe/bounswe2024group7/issues/147): Run Mobile Application.
- [Issue#136](https://github.com/bounswe/bounswe2024group7/issues/136): Initialize Mobile Application.

**Management-Related Significant Issues:**
- [Issue#258](https://github.com/bounswe/bounswe2024group7/issues/258): Create Mockups.
- [Issue#184](https://github.com/bounswe/bounswe2024group7/issues/184): Commit the report of milestone 1.
- [Issue#157](https://github.com/bounswe/bounswe2024group7/issues/157): Mock Data for Presentation.
- [Issue#142](https://github.com/bounswe/bounswe2024group7/issues/142): Create Use Case Diagrams.
- [Issue#131](https://github.com/bounswe/bounswe2024group7/issues/131): Contribute and Update Use Case Scenarios.
#### 1.3.2.3 Pull Requests
  - [PR#381](https://github.com/bounswe/bounswe2024group7/pull/381): Added 9 tests for Post endpoints and 9 passes.
  - [PR#345](https://github.com/bounswe/bounswe2024group7/pull/345): Implemented recommendation to trainingPrograms.
  - [PR#338](https://github.com/bounswe/bounswe2024group7/pull/338): Implemented order by likes in descending order.
  -  [PR#319](https://github.com/bounswe/bounswe2024group7/pull/319): Seperate feed section to seperate pages fav list and explore.
  -  [PR#316](https://github.com/bounswe/bounswe2024group7/pull/316): removed redundant username field from Survey related requests.
  -  [PR#314](https://github.com/bounswe/bounswe2024group7/pull/314): added Locale English to the uppercase function.
  -  [PR#256](https://github.com/bounswe/bounswe2024group7/pull/256): Lab 8 PR.
  -  [PR#225](https://github.com/bounswe/bounswe2024group7/pull/225): Implemented bookmark and like feature for posts.
  -  [PR#181](https://github.com/bounswe/bounswe2024group7/pull/181): Mobile branch.
#### 1.3.2.4 Unit Tests
**Post Controller Unit Tests ([PR#381](https://github.com/bounswe/bounswe2024group7/pull/381))**

| **Test Case**                             | **Description**                                                                                      | **Result**              | **Remarks**                                                                                               |
|-------------------------------------------|------------------------------------------------------------------------------------------------------|-------------------------|----------------------------------------------------------------------------------------------------------|
| **Create Post - Success** | Tests creating a new post with content and tags | Passed | Verified that the service correctly processes the request and returns the created post with expected fields |
| **Fetch Posts - With Tags** | Tests retrieving posts filtered by specific tags | Passed | Successfully returns filtered posts when tags are provided in the request |
| **Fetch Posts - Without Tags** | Tests retrieving all posts when no tags are specified | Passed | Correctly falls back to returning all posts when no filtering is requested |
| **Delete Post - Success** | Tests successful deletion of a post by its ID | Passed | Confirms proper authorization and successful deletion with appropriate success message |
| **Delete Post - Unauthorized** | Tests deletion attempt without proper authorization | Passed | Correctly returns forbidden status when user lacks permission to delete |
| **Get Random Posts - Success** | Tests retrieving a specified number of random posts | Passed | Successfully returns the requested number of random posts from the available pool |
| **Like Post - Success** | Tests the post liking functionality | Passed | Confirms that a post can be liked by an authorized user |
| **Unlike Post - Success** | Tests the post unliking functionality | Passed | Verifies that a previously liked post can be unliked |
| **Get Bookmarked Posts - Success** | Tests retrieving all posts bookmarked by the user | Passed | Successfully returns the list of posts that the user has bookmarked |


#### 1.3.2.5 Additional Information

### 1.3.3 Deniz Bilge Akkoç - Group 7 - Frontend
#### 1.3.3.1 Responsibilities
#### 1.3.3.2 Main Contributions (Code-Related / Management-Related Significant Issues)
#### 1.3.3.3 Pull Requests
#### 1.3.3.4 Unit Tests
#### 1.3.3.5 Additional Information

### 1.3.4 Eren Pakelgil - Group 7 - Android
#### 1.3.4.1 Responsibilities
* Developing necessary components/features for mobile application
* Connecting mobile features with backend
* Debugging & Testing Mobile App
#### 1.3.4.2 Main Contributions (Code-Related / Management-Related Significant Issues)
* Implementing new program design structure to mobile
* Implementing features related to recently created endpoints
* Testing and debugging code changes using Android Studio emulator

**Code-Related Significant Issues:**
- [Issue#280](https://github.com/bounswe/bounswe2024group7/issues/280): Issue for adding new components that reflect the updated design for nested training program structure for mobile
- [Issue#285](https://github.com/bounswe/bounswe2024group7/issues/285): Issue for adding exercise detail component for mobile
- [Issue#290](https://github.com/bounswe/bounswe2024group7/issues/290): Issue for implementing program join/leave feature for mobile
- [Issue#292](https://github.com/bounswe/bounswe2024group7/issues/292): Issue for adding progress graph to progress tracker component for mobile
- [Issue#294](https://github.com/bounswe/bounswe2024group7/issues/294): Issue for updating program creation page and request for mobile
- [Issue#320](https://github.com/bounswe/bounswe2024group7/issues/320): Issue for updating survey page according to updated endpoint response for mobile
- [Issue#324](https://github.com/bounswe/bounswe2024group7/issues/324): Issue for updating the search mechanism for mobile 
- [Issue#325](https://github.com/bounswe/bounswe2024group7/issues/325): Issue for connecting workout&week pages to backend for mobile
- [Issue#325](https://github.com/bounswe/bounswe2024group7/issues/325): Issue for connecting workout&week pages to backend for mobile
- [Issue#330](https://github.com/bounswe/bounswe2024group7/issues/330): Issue for adding rate program feature for mobile

**Managemant-Related Significant Issues:**

#### 1.3.4.3 Pull Requests
- [PR#284](https://github.com/bounswe/bounswe2024group7/pull/284): Add exercise detail
- [PR#286](https://github.com/bounswe/bounswe2024group7/pull/286): Issue 283 - Add Survey To Register Page
- [PR#291](https://github.com/bounswe/bounswe2024group7/pull/291): Connect join/leave program
- [PR#293](https://github.com/bounswe/bounswe2024group7/pull/293): Progress Graph Added
- [PR#295](https://github.com/bounswe/bounswe2024group7/pull/295): Update create program
- [PR#296](https://github.com/bounswe/bounswe2024group7/pull/296): Program added to Post
- [PR#317](https://github.com/bounswe/bounswe2024group7/pull/317): Delete post and create progress
- [PR#323](https://github.com/bounswe/bounswe2024group7/pull/323): Survey Altered, Feedback Added
- [PR#326](https://github.com/bounswe/bounswe2024group7/pull/326): Connect workout and week progress
- [PR#328](https://github.com/bounswe/bounswe2024group7/pull/328): Issue#324 - Add Search Mechanism Mobile
- [PR#346](https://github.com/bounswe/bounswe2024group7/pull/346): Added More Mobile Unit Tests
- [PR#364](https://github.com/bounswe/bounswe2024group7/pull/364): Add rating for mobile
- [PR#377](https://github.com/bounswe/bounswe2024group7/pull/377): Bugs fixed


#### 1.3.4.4 Unit Tests

| **Test Case**                             | **Description**                                                                                      | **Result**              | **Remarks**                                                                                               |
|-------------------------------------------|------------------------------------------------------------------------------------------------------|-------------------------|----------------------------------------------------------------------------------------------------------|
| **Join Program**  | Join program with specific `id` correctly  | Passed  | Returned status code is `200`  |
| **Leave Program**  | Leave joined program with specific `id` correctly  | Passed  | Returned status code is `200`  |
| **Delete Post**  | Deleted previously created post with specific `id` | Passed | Returned status code is `200` |
| **Get Training Program**  | Get the correct program inside the post | Passed | Returned program is not null |
| **Search Query** | Search for a query correctly | Passed | Returned status code is `200` |
| **Render Search Bar** | Render the search bar component | Passed | Render the search bar component correctly |
| **Render Search Results** | Render the search results page | Passed | Rendered the search results page correctly |
| **Render Diet Card Component** | Render the diet card component | Passed | Rendered the diet card component correctly |
| **Render Diet Detail Component** | Render the diet detail component | Passed | Rendered the diet detail component correctly |
| **Rate Program** | Rate a program with specific `id` with `rating` between 0 and 5 correctly | Passed | Returned status code is `200` |
| **Follow User**| Follow user with a specific `username` correctly | Passed | Returned status code is `200` |
| **Unfollow User**| Unfollow already followed user with a specific `username` correctly | Passed | Returned status code is `200` |

#### 1.3.4.5 Additional Information

### 1.3.3 Deniz Bilge Akkoç - Group 7 - Frontend
#### 1.3.3.1 Responsibilities
* Developing necessary components/features for the web application.  
* Connecting web features to the backend.  
* Debugging and testing the web application.  

#### 1.3.3.2 Main Contributions (Code-Related / Management-Related Significant Issues)
- [Issue#335](https://github.com/bounswe/bounswe2024group7/issues/335): Improving search
- [Issue#370](https://github.com/bounswe/bounswe2024group7/issues/370): Implementing giving feedback and displaying page
- [Issue#248](https://github.com/bounswe/bounswe2024group7/issues/248): Implementing show program page (not used in the latest version because two people implemented the same page)
#### 1.3.3.3 Pull Requests
- [PR#303](https://github.com/bounswe/bounswe2024group7/pull/303) : implemented modal page
- [PR#374](https://github.com/bounswe/bounswe2024group7/pull/374) : fixed a bug in search page
- [PR#371](https://github.com/bounswe/bounswe2024group7/pull/371) : added feedback pages
#### 1.3.3.4 Unit Tests
#### 1.3.3.5 Additional Information

### 1.3.4 Eren Pakelgil - Group 7 - Android
#### 1.3.4.1 Responsibilities
* Developing necessary components/features for mobile application
* Connecting mobile features with backend
* Debugging & Testing Mobile App
#### 1.3.4.2 Main Contributions (Code-Related / Management-Related Significant Issues)
* Implementing new program design structure to mobile
* Implementing features related to recently created endpoints
* Testing and debugging code changes using Android Studio emulator

**Code-Related Significant Issues:**
- [Issue#280](https://github.com/bounswe/bounswe2024group7/issues/280): Issue for adding new components that reflect the updated design for nested training program structure for mobile
- [Issue#285](https://github.com/bounswe/bounswe2024group7/issues/285): Issue for adding exercise detail component for mobile
- [Issue#290](https://github.com/bounswe/bounswe2024group7/issues/290): Issue for implementing program join/leave feature for mobile
- [Issue#292](https://github.com/bounswe/bounswe2024group7/issues/292): Issue for adding progress graph to progress tracker component for mobile
- [Issue#294](https://github.com/bounswe/bounswe2024group7/issues/294): Issue for updating program creation page and request for mobile
- [Issue#320](https://github.com/bounswe/bounswe2024group7/issues/320): Issue for updating survey page according to updated endpoint response for mobile
- [Issue#324](https://github.com/bounswe/bounswe2024group7/issues/324): Issue for updating the search mechanism for mobile 
- [Issue#325](https://github.com/bounswe/bounswe2024group7/issues/325): Issue for connecting workout&week pages to backend for mobile
- [Issue#325](https://github.com/bounswe/bounswe2024group7/issues/325): Issue for connecting workout&week pages to backend for mobile
- [Issue#330](https://github.com/bounswe/bounswe2024group7/issues/330): Issue for adding rate program feature for mobile

**Managemant-Related Significant Issues:**

#### 1.3.4.3 Pull Requests
- [PR#284](https://github.com/bounswe/bounswe2024group7/pull/284): Add exercise detail
- [PR#286](https://github.com/bounswe/bounswe2024group7/pull/286): Issue 283 - Add Survey To Register Page
- [PR#291](https://github.com/bounswe/bounswe2024group7/pull/291): Connect join/leave program
- [PR#293](https://github.com/bounswe/bounswe2024group7/pull/293): Progress Graph Added
- [PR#295](https://github.com/bounswe/bounswe2024group7/pull/295): Update create program
- [PR#296](https://github.com/bounswe/bounswe2024group7/pull/296): Program added to Post
- [PR#317](https://github.com/bounswe/bounswe2024group7/pull/317): Delete post and create progress
- [PR#323](https://github.com/bounswe/bounswe2024group7/pull/323): Survey Altered, Feedback Added
- [PR#326](https://github.com/bounswe/bounswe2024group7/pull/326): Connect workout and week progress
- [PR#328](https://github.com/bounswe/bounswe2024group7/pull/328): Issue#324 - Add Search Mechanism Mobile
- [PR#346](https://github.com/bounswe/bounswe2024group7/pull/346): Added More Mobile Unit Tests
- [PR#364](https://github.com/bounswe/bounswe2024group7/pull/364): Add rating for mobile
- [PR#377](https://github.com/bounswe/bounswe2024group7/pull/377): Bugs fixed


#### 1.3.4.4 Unit Tests

| **Test Case**                             | **Description**                                                                                      | **Result**              | **Remarks**                                                                                               |
|-------------------------------------------|------------------------------------------------------------------------------------------------------|-------------------------|----------------------------------------------------------------------------------------------------------|
| **Join Program**  | Join program with specific `id` correctly  | Passed  | Returned status code is `200`  |
| **Leave Program**  | Leave joined program with specific `id` correctly  | Passed  | Returned status code is `200`  |
| **Delete Post**  | Deleted previously created post with specific `id` | Passed | Returned status code is `200` |
| **Get Training Program**  | Get the correct program inside the post | Passed | Returned program is not null |
| **Search Query** | Search for a query correctly | Passed | Returned status code is `200` |
| **Render Search Bar** | Render the search bar component | Passed | Render the search bar component correctly |
| **Render Search Results** | Render the search results page | Passed | Rendered the search results page correctly |
| **Render Diet Card Component** | Render the diet card component | Passed | Rendered the diet card component correctly |
| **Render Diet Detail Component** | Render the diet detail component | Passed | Rendered the diet detail component correctly |
| **Rate Program** | Rate a program with specific `id` with `rating` between 0 and 5 correctly | Passed | Returned status code is `200` |
| **Follow User**| Follow user with a specific `username` correctly | Passed | Returned status code is `200` |
| **Unfollow User**| Unfollow already followed user with a specific `username` correctly | Passed | Returned status code is `200` |

#### 1.3.4.5 Additional Information

### 1.3.5 Hanaa Zaqout - Group 7 - Frontend
#### 1.3.5.1 Responsibilities
* Developing necessary components/features for the web application.  
* Connecting web features to the backend.  
* Debugging and testing the web application.  

#### 1.3.5.2 Main Contributions (Code-Related / Management-Related Significant Issues)
* Joined customer feedback meetings and took notes.  
* Contributed to mockup creation.  
* Implemented a new training program page for the web.  
* Implemented reminder cards to notify users of their current active exercises.  
* Implemented modals that show details about training programs, workouts, and exercises.  
* Implemented progress graphs for each trained target muscle on the profile page.  

**Code-Related Significant Issues:**  
- [Issue#259](https://github.com/bounswe/bounswe2024group7/issues/259): Feature request for a new detailed training program from the backend team based on updated mockups.  
- [Issue#260](https://github.com/bounswe/bounswe2024group7/issues/260): Implement detailed training program considering the updated mockups.  
- [Issue#318](https://github.com/bounswe/bounswe2024group7/issues/318): Requested help in debugging: progress data not reflected on frontend after a successful POST request.  
- [Issue#382](https://github.com/bounswe/bounswe2024group7/issues/382): Added progress graphs for each trained target muscle on the profile page.  
- [Issue#384](https://github.com/bounswe/bounswe2024group7/issues/384): Added a reminder card on the feed page for current active exercises.  
- [Issue#386](https://github.com/bounswe/bounswe2024group7/issues/386): Added a detailed training modal where users can display all exercises of specific training program.
- [Issue#387](https://github.com/bounswe/bounswe2024group7/issues/387): Added a detailed workout modal where users can display the details of all exercises in a specific workout. 
- [Issue#388](https://github.com/bounswe/bounswe2024group7/issues/388): Added a detailed exercise modal where users can display exercise details and submit their progress.  

**Management-Related Significant Issues:**  
- [Issue#258](https://github.com/bounswe/bounswe2024group7/issues/258): Created mockups with Asim based on customer feedback.  

#### 1.3.5.3 Pull Requests
- [PR#322](https://github.com/bounswe/bounswe2024group7/pull/322): Training program updated.  
- [PR#344](https://github.com/bounswe/bounswe2024group7/pull/344): Add supporting features to the training program.  
- [PR#363](https://github.com/bounswe/bounswe2024group7/pull/363): Progress graphs for target muscles.  

#### 1.3.5.4 Tests
| **User Test Case**                             | **Description**                                                                                      | **Result**              | **Remarks**                                                                                               |
|-------------------------------------------|------------------------------------------------------------------------------------------------------|-------------------------|----------------------------------------------------------------------------------------------------------|
| **Progress Graph for Each Target Muscle**  | [Issue#383](https://github.com/bounswe/bounswe2024group7/issues/383)  | Passed  |   |  
| **Test Active Program Reminder for Full Body Strength Program**  | [Issue#385](https://github.com/bounswe/bounswe2024group7/issues/385)  | Passed  |   |  
#### 1.3.5.5 Additional Information

### 1.3.6 Mert Cengiz - Group 7 - Android
#### 1.3.6.1 Responsibilities
* Deciding on the Meetings Related to the Entire Group and Organizing Them
* Dividing the Code-Related or Non-Code-Related Tasks Among Members If Necessary
* Developing the Mobile Application of the Project
#### 1.3.6.2 Main Contributions (Code-Related / Management-Related Significant Issues)
* Implemented new pages on the mobile application and connected to the backend with the endpoints.
* Contributed to class and use-case diagrams and especially requirements.
* As the Communicator, communicated with the Instructor or the Assistants if necessary.

**Code-Related Significant Issues:**
- [Issue#330](https://github.com/bounswe/bounswe2024group7/issues/330): Added program rating mechanism to the mobile application.
- [Issue#324](https://github.com/bounswe/bounswe2024group7/issues/324): Updated the search mechanism to the mechanism used in the Web application.
- [Issue#321](https://github.com/bounswe/bounswe2024group7/issues/321): Added feedback page to the mobile application.
- [Issue#320](https://github.com/bounswe/bounswe2024group7/issues/320): Fixed the endpoints of the survey page as their endpoints had changed.
- [Issue#294](https://github.com/bounswe/bounswe2024group7/issues/294): Updated the program creation mechanism in the mobile application.
- [Issue#292](https://github.com/bounswe/bounswe2024group7/issues/292): Added progress graph for progress tracking mechanism.
- [Issue#283](https://github.com/bounswe/bounswe2024group7/issues/283): Added a survey page to the mobile application.
- [Issue#245](https://github.com/bounswe/bounswe2024group7/issues/245): Connected feed and profile to the backend.
- [Issue#208](https://github.com/bounswe/bounswe2024group7/issues/208): Connected search, post and program creation endpoints.
- [Issue#206](https://github.com/bounswe/bounswe2024group7/issues/206): Added mock data for the demonstration session.
- [Issue#205](https://github.com/bounswe/bounswe2024group7/issues/205): Added unit tests in the mobile application.
- [Issue#195](https://github.com/bounswe/bounswe2024group7/issues/195): Connected the mobile application to the server side for the first time.
- [Issue#193](https://github.com/bounswe/bounswe2024group7/issues/193): Added search component to the mobile application.
- [Issue#186](https://github.com/bounswe/bounswe2024group7/issues/186): Resembling the mobile application to the Web page.
- [Issue#164](https://github.com/bounswe/bounswe2024group7/issues/164): Adding components (pages) to the mobile application.
- [Issue#149](https://github.com/bounswe/bounswe2024group7/issues/149): Connecting Web frontend with the server side.
- [Issue#147](https://github.com/bounswe/bounswe2024group7/issues/147): Ensuring the mobile application is running.
- [Issue#136](https://github.com/bounswe/bounswe2024group7/issues/136): Initializing the mobile application with basic pages.

**Managemant-Related Significant Issues:**
- [Issue#185](https://github.com/bounswe/bounswe2024group7/issues/185): Contributed to the Fifth Lab Report.
- [Issue#141](https://github.com/bounswe/bounswe2024group7/issues/141): Reviewing the class diagram.
- [Issue#130](https://github.com/bounswe/bounswe2024group7/issues/130): Updating requirements with new features.
- [Issue#129](https://github.com/bounswe/bounswe2024group7/issues/129): Initializing the requirements page with initial requirements.

#### 1.3.6.3 Pull Requests
  -  [PR#346](https://github.com/bounswe/bounswe2024group7/pull/346): Adding more unit tests.
  -  [PR#328](https://github.com/bounswe/bounswe2024group7/pull/328): Creating and connecting the search page on the mobile application.
  -  [PR#323](https://github.com/bounswe/bounswe2024group7/pull/323): Adding feedback mechanism and altering survey page in mobile application.
  -  [PR#317](https://github.com/bounswe/bounswe2024group7/pull/317): Enabling post deletion and connecting progress.
  -  [PR#296](https://github.com/bounswe/bounswe2024group7/pull/296): Training programs added to the mobile application.
  -  [PR#293](https://github.com/bounswe/bounswe2024group7/pull/293): Progress graph added to the mobile application.
  -  [PR#286](https://github.com/bounswe/bounswe2024group7/pull/286): Survey page added to the mobile application.
  -  [PR#250](https://github.com/bounswe/bounswe2024group7/pull/250): Some bug fixes and updates were made.
  -  [PR#247](https://github.com/bounswe/bounswe2024group7/pull/247): Connecting post creating feature to the server side.
  -  [PR#209](https://github.com/bounswe/bounswe2024group7/pull/209): Unit Tests, Mock Diet Page, and Post, Program, Search Endpoints Added.
  -  [PR#200](https://github.com/bounswe/bounswe2024group7/pull/200): Connecting login and register features to the server side.
  -  [PR#194](https://github.com/bounswe/bounswe2024group7/pull/194): Adding the searching ability to the mobile application statically.
  -  [PR#181](https://github.com/bounswe/bounswe2024group7/pull/181): Bug fixes and initial pages added in the mobile application.
  -  [PR#151](https://github.com/bounswe/bounswe2024group7/pull/151): Creating the home page, login page, and register pages instead of a single static page.
  -  [PR#139](https://github.com/bounswe/bounswe2024group7/pull/139): Creating the initial version of the mobile application.
#### 1.3.6.4 Unit Tests
| **Test Case**                             | **Description**                                                                                      | **Result**              | **Remarks**                                                                                               |
|-------------------------------------------|------------------------------------------------------------------------------------------------------|-------------------------|----------------------------------------------------------------------------------------------------------|
| **Render Home Page**  | Rendered the home page  | Passed  | The home page rendered correctly  |
| **Render Login Page**  | Rendered the login page  | Passed | Rendered the login page correctly |
| **Render Register Page**  | Rendered the register page | Passed | Rendered the register page correctly. |
| **Render Search Page** | Rendered the search page | Passed | Rendered the search page correctly.  |
| **Render Post Creation** | Rendered the post creation page | Passed | Rendered the post creation page correctly |
| **Render Progam Creation** | Rendered the program creation page | Passed | Rendered the program cration page correctly. |
| **Render Create Feedback Page** | Rendered the feedback creation page | Passed | Rendered the feedback creation page correctly. |
| **Render Survey Page** | Rendered the survey page | Passed | Rendered the survey page correctly. |
| **Log In** | Attempted to login with a `username` and `password` | Passed | Returned `200`, as expected for the response status. |
| **Register**| Attempted to register with a `username`, `password`, valid `role` and `email`| Passed | Returned `201`, as expected for the response status. |
| **Get Exercises**| Attempted to fetch all exercises available | Passed | Didn't returned `null`, as expected to obtain some data. |
| **Create Feedback** | Attempted to create a feedback with a `program`, `body part`, `feedback text`, `week` and `exercise number` | Passed | Returned `201`, as expected for the status. |
| **Make a Survey** | Attempted to make a survey with a valid `level` and `goals`| Passed | Returned `201`, as expected for the status. |
| **Submit Progress in a Joined Program** | Attempted to submit progress with a `programId`, `exerciseId`, `newInputs` and a `token`| Passed | Returned `200`, as expected for the status. |
| **Random Posts In Feed** | Attempted to fetch posts randomly | Passed | Didn't returned `null`, as expected to obtain some data. |


### 1.3.7 Mustafa Ocak - Group 7 - Backend
#### 1.3.7.1 Responsibilities

I handle the backend development, adding features like user interactions, training programs, and progress tracking. I also take care of deployments, including setting up CI/CD, containerizing the app, and managing the Kubernetes cluster. On top of that, I help with project planning, like creating use case scenarios and diagrams.
#### 1.3.7.2 Main Contributions (Code-Related / Management-Related Significant Issues)

- Developed backend services and endpoints, including user favorite tags, workout progress tracking, and exercise start/finish functionalities.
- Created endpoints for training program feedback, ratings, and total progress tracking.
- Designed and implemented survey functionality for user registration.
- Set up and containerized the database and API backend with Docker.
- Managed deployment pipelines by initializing CI/CD infrastructure and migrating between DigitalOcean and GCP.
- Set up and configured a Kubernetes cluster on DigitalOcean.
- Added mock data for posts and tags to support frontend development.
- Contributed to project planning by writing use case scenarios and creating use case diagrams.

**Code-Related Significant Issues:**


- [Issue#288](https://github.com/bounswe/bounswe2024group7/issues/288): *Split the feed section to different Pages*
- [Issue#278](https://github.com/bounswe/bounswe2024group7/issues/278): *Implement User Favorite Tags/Goals Endpoint*
- [Issue#276](https://github.com/bounswe/bounswe2024group7/issues/276): *Add exercise based progress over time for tracking*
- [Issue#275](https://github.com/bounswe/bounswe2024group7/issues/275): *Add Survey for Registration*
- [Issue#270](https://github.com/bounswe/bounswe2024group7/issues/270): *Add weekly completion mechanism*
- [Issue#269](https://github.com/bounswe/bounswe2024group7/issues/269): *Add workout based progress*
- [Issue#268](https://github.com/bounswe/bounswe2024group7/issues/268): *Add finish endpoint for exercise of workout*
- [Issue#267](https://github.com/bounswe/bounswe2024group7/issues/267): *Start endpoint for exercises in workout*
- [Issue#265](https://github.com/bounswe/bounswe2024group7/issues/265): *Add week based progress tracking mechanism.*
- [Issue#264](https://github.com/bounswe/bounswe2024group7/issues/264): *Add Total Progress Percent for joined Training Program*
- [Issue#263](https://github.com/bounswe/bounswe2024group7/issues/263): *Add Rating (evaluation mechanism) for Training Program*
- [Issue#262](https://github.com/bounswe/bounswe2024group7/issues/262): *Add Feedback Option for Training Program*
- [Issue#261](https://github.com/bounswe/bounswe2024group7/issues/261): *Change Training Program Model*

**Management-Related Significant Issues:**

- [Issue#131](https://github.com/bounswe/bounswe2024group7/issues/131): *Contribute and Update Use Case Scenarios*  
- [Issue#134](https://github.com/bounswe/bounswe2024group7/issues/134): *Initialize  CI/CD Infrastructure*  
- [Issue#135](https://github.com/bounswe/bounswe2024group7/issues/135): *Initialize DB using Postgresql*  
- [Issue#137](https://github.com/bounswe/bounswe2024group7/issues/137): *Containerize DB, create docker image*  
- [Issue#138](https://github.com/bounswe/bounswe2024group7/issues/138): *Containerize API Backend, create docker image*  
- [Issue#142](https://github.com/bounswe/bounswe2024group7/issues/142): *Create Use Case Diagrams*  
- [Issue#188](https://github.com/bounswe/bounswe2024group7/issues/188): *Migrate deployment from Digitial Ocean to GCP*  
- [Issue#198](https://github.com/bounswe/bounswe2024group7/issues/198): *Change deployment platform from GCP to Digital Ocean and change CI/CD pipeline*  
- [Issue#199](https://github.com/bounswe/bounswe2024group7/issues/199): *Set up Kubernetes cluster in Digital Ocean droplet*  
- [Issue#255](https://github.com/bounswe/bounswe2024group7/issues/255): *Insert Mock Data for Posts and Tags*  





#### 1.3.7.3 Pull Requests
**PRs:**


- [PR#380](https://github.com/bounswe/bounswe2024group7/pull/380): *Add Unit test for Survey Service*  
- [PR#352](https://github.com/bounswe/bounswe2024group7/pull/352): *Change rating mechanism and query parameters of rating endpoint*  
- [PR#319](https://github.com/bounswe/bounswe2024group7/pull/319): *Update Feed endpoint, split feed section to separate pages fav list and explore*  
- [PR#310](https://github.com/bounswe/bounswe2024group7/pull/310): *Fix feedback API and survey API endpoints authentication*  
- [PR#289](https://github.com/bounswe/bounswe2024group7/pull/289): *Change Survey API endpoint identifier to username.*  
- [PR#287](https://github.com/bounswe/bounswe2024group7/pull/287): *Add training program endpoint and new rating mechanism.*  
- [PR#282](https://github.com/bounswe/bounswe2024group7/pull/282): *Merge Weekly Completion Endpoint.*  
- [PR#279](https://github.com/bounswe/bounswe2024group7/pull/279): *Survey (Service) Endpoint Update.*  
- [PR#274](https://github.com/bounswe/bounswe2024group7/pull/274): *Add Feedback (Service) Endpoint.*  
- [PR#224](https://github.com/bounswe/bounswe2024group7/pull/224): *Add Tag Endpoint*  
- [PR#223](https://github.com/bounswe/bounswe2024group7/pull/223): *Add Search Endpoint*  
- [PR#175](https://github.com/bounswe/bounswe2024group7/pull/175): *Implement Join Training Program Endpoint*  
- [PR#170](https://github.com/bounswe/bounswe2024group7/pull/170): *Create Training Program Endpoint*  
- [PR#159](https://github.com/bounswe/bounswe2024group7/pull/159): *Implement Exercise (Service) Endpoint and Repository*  
- [PR#152](https://github.com/bounswe/bounswe2024group7/pull/152): *Add Exercise Model and Migration, DB schema change*  


#### 1.3.7.4 Unit Tests

| **Test Case**                           | **Description**                                                                                  | **Result**  | **Remarks**                                                                                               |
|-----------------------------------------|--------------------------------------------------------------------------------------------------|-------------|----------------------------------------------------------------------------------------------------------|
| **Search - Success**                    | Tested the `/api/search` endpoint with a query for fitness programs, returning posts, exercises, and training programs. | Passed      | The endpoint returned arrays for posts, exercises, and training programs as expected.                    |
| **Add Survey - Success**                | Added a new survey with fitness goals and a fitness level using the `/api/surveys` endpoint.      | Passed      | Survey details (ID, username, fitness goals, and fitness level) were correctly returned in the response. |
| **Get Survey By User - Success**        | Retrieved the survey of the authenticated user from the `/api/surveys/user` endpoint.             | Passed      | The correct survey data was returned, matching the authenticated user's details.                         |
| **Get User Fitness Goals - Success**    | Retrieved the fitness goals of the authenticated user using the `/api/surveys/fitness-goals` endpoint. | Passed      | The expected list of fitness goals was returned.                                                         |
| **Add Fitness Goals - Success**         | Added new fitness goals to the user's survey using the `/api/surveys/fitness-goals` endpoint.     | Passed      | The added fitness goals were returned correctly in the response.                                         |
| **Remove Fitness Goals - Success**      | Removed specific fitness goals from the user's survey using the `/api/surveys/fitness-goals` endpoint. | Passed      | The endpoint executed successfully, and the specified goals were removed.                                |


#### 1.3.7.5 Additional Information

### 1.3.8 Oğuz Hekim - Group 7 - Backend
#### 1.3.8.1 Responsibilities
As a member of the backend team, I was responsible for managing the database, developing and documenting the API, and handling requests from the frontend teams by providing the necessary endpoints.

#### 1.3.8.2 Main Contributions (Code-Related / Management-Related Significant Issues)
* Implemented new endpoints based on requirements and our discussions.
* Contributed to requirements, prepared class diagram and created project plan. 
* Prepared a Postman Collection for team to access endpoints more easily
* Created OpenAPI documentation and created API Documentation wikipage. 

**Code-Related Significant Issues:**
- [Issue#378](https://github.com/bounswe/bounswe2024group7/issues/378): Implementing unit tests for exercise service.
- [Issue#339](https://github.com/bounswe/bounswe2024group7/issues/339): Adding completion percentage to training program response.
- [Issue#327](https://github.com/bounswe/bounswe2024group7/issues/327): Create new endpoints for Training Programs.
- [Issue#301](https://github.com/bounswe/bounswe2024group7/issues/301): Adding last completed workout date to training program response.
- [Issue#276](https://github.com/bounswe/bounswe2024group7/issues/276): Creating endpoint for exercise based progress over time.
- [Issue#268](https://github.com/bounswe/bounswe2024group7/issues/268): Adding complete endpoint for exercise of a workout.
- [Issue#261](https://github.com/bounswe/bounswe2024group7/issues/261): Change training program model and existing endpoints.
- [Issue#226](https://github.com/bounswe/bounswe2024group7/issues/226): Unit tests for the authentication service.
- [Issue#204](https://github.com/bounswe/bounswe2024group7/issues/204): Tracking mechanism for training programs.
- [Issue#203](https://github.com/bounswe/bounswe2024group7/issues/203): Feature to share training programs in posts.
- [Issue#190](https://github.com/bounswe/bounswe2024group7/issues/190): Pulling exercises with script to enter them to database and creating new exercise structure in the code.
- [Issue#173](https://github.com/bounswe/bounswe2024group7/issues/173): Creating new to get training programs of a user.
- [Issue#166](https://github.com/bounswe/bounswe2024group7/issues/166): Creating endpoint to return posts of a specific user.
- [Issue#162](https://github.com/bounswe/bounswe2024group7/issues/162): Creating endpoint to get random posts (for milestone 1).
- [Issue#153](https://github.com/bounswe/bounswe2024group7/issues/153): Creating user related endpoints (profile, follow/unfollow etc.).
- [Issue#145](https://github.com/bounswe/bounswe2024group7/issues/145): Creating authorization endpoints.

**Management-Related Significant Issues:**
- [Issue#389](https://github.com/bounswe/bounswe2024group7/issues/389): Update API documentations and organize Postman Collection.
- [Issue#252](https://github.com/bounswe/bounswe2024group7/issues/252): API documentation for the project.
- [Issue#189](https://github.com/bounswe/bounswe2024group7/issues/189): User stories.
- [Issue#182](https://github.com/bounswe/bounswe2024group7/issues/182): Creating project plan.
- [Issue#141](https://github.com/bounswe/bounswe2024group7/issues/141): Creating class diagram.
- [Issue#130](https://github.com/bounswe/bounswe2024group7/issues/130): Updating requirements.

#### 1.3.8.3 Pull Requests
  - [PR#379](https://github.com/bounswe/bounswe2024group7/pull/379): Implemented unit test for Exercise Service.
  - [PR#362](https://github.com/bounswe/bounswe2024group7/pull/362): Changed muscle groups for feedback.
  - [PR#340](https://github.com/bounswe/bounswe2024group7/pull/340): Adding completion percentage to training program response.
  - [PR#329](https://github.com/bounswe/bounswe2024group7/pull/329): Creating new endpoints for training programs.
  - [PR#302](https://github.com/bounswe/bounswe2024group7/pull/302): Adding last completed workout date to TrainingProgramWithTrackingResponse.
  - [PR#277](https://github.com/bounswe/bounswe2024group7/pull/277): Creating endpoint for historical exercise based progress.
  - [PR#273](https://github.com/bounswe/bounswe2024group7/pull/273): Creating complete exercise endpoint.
  - [PR#272](https://github.com/bounswe/bounswe2024group7/pull/272): Add new tracking mechanisms to training programs.
  - [PR#271](https://github.com/bounswe/bounswe2024group7/pull/271): Major changes to Training Program Model.
  - [PR#228](https://github.com/bounswe/bounswe2024group7/pull/228): Refactoring training program endpoints to check ongoing programs. 
  - [PR#227](https://github.com/bounswe/bounswe2024group7/pull/227): Unit tests for the authentication service.
   - [PR#222](https://github.com/bounswe/bounswe2024group7/pull/222): Optional imageUrl field for Posts. 
  - [PR#221](https://github.com/bounswe/bounswe2024group7/pull/221): Add response body to POST requests for training program endpoints. 
  - [PR#207](https://github.com/bounswe/bounswe2024group7/pull/207): Feature to share training programs in posts.
  - [PR#211](https://github.com/bounswe/bounswe2024group7/pull/211): Tracking mechanism for training programs.
  - [PR#191](https://github.com/bounswe/bounswe2024group7/pull/191): New exercise structure.
  -  [PR#174](https://github.com/bounswe/bounswe2024group7/pull/174): Create endpoint for getting training program for user.
  -  [PR#172](https://github.com/bounswe/bounswe2024group7/pull/172): Added validation and authentication for creating and deleting programs.
  -  [PR#169](https://github.com/bounswe/bounswe2024group7/pull/169): Return posts of specific user.
  -  [PR#165](https://github.com/bounswe/bounswe2024group7/pull/165): Create endpoint to get random posts.
  -  [PR#154](https://github.com/bounswe/bounswe2024group7/pull/154): Create user endpoints.
  -  [PR#146](https://github.com/bounswe/bounswe2024group7/pull/146): Create authorization endpoints.
#### 1.3.8.4 Unit Tests
**Authentication Service Unit Tests ([Issue#226](https://github.com/bounswe/bounswe2024group7/issues/226))**

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

**Exercise Service Unit Tests ([Issue#378](https://github.com/bounswe/bounswe2024group7/issues/378))**

| **Test Case**                                      | **Description**                                                                                  | **Result**              | **Remarks**                                                                                               |
|----------------------------------------------------|--------------------------------------------------------------------------------------------------|-------------------------|----------------------------------------------------------------------------------------------------------|
| **Get All Exercises - Success**                    | Retrieved all exercises from the repository.                                                     | Passed                 | List of exercises was returned, and the repository method was called once.                               |
| **Get Exercise - Valid ID**                        | Retrieved an exercise by a valid ID.                                                              | Passed                 | The exercise with the given ID was found and returned.                                                   |
| **Get Exercise - Invalid ID**                      | Attempted to retrieve an exercise with an invalid ID.                                             | Passed                 | An `EntityNotFoundException` was thrown with the appropriate message.                                     |
| **Get User Exercise Progress - Success**           | Retrieved exercise progress for a user with valid data.                                           | Passed                 | The progress response correctly displayed the exercise and progress data.                                 |
| **Get User Exercise Progress - Exercise Not Found**| Attempted to retrieve progress for an exercise that does not exist.                              | Passed                 | An `EntityNotFoundException` was thrown when the exercise was not found.                                  |
| **Get User Exercise Progress - No Tracking Data**  | Retrieved exercise progress when no tracking data exists for the user.                           | Passed                 | The progress response returned an empty progress list as expected.                                        |

----

# 2. Project Artifacts
## 2.1 User Manual

### 2.1.1 Introduction
FitnessFact is a comprehensive fitness tracking and social platform available on web and mobile platforms. This manual will guide you through the main features and functionalities of the application.

### 2.1.2 Getting Started

#### 2.1.2.1 Registration
1. Visit the web application or download the mobile app
2. Click on "Register"
3. Fill in the required information:
   - Username
   - Email
   - Password
   - Role (Trainee or Trainer)
4. Complete the initial survey:
   - Select your fitness level
   - Choose your areas of interest from tags
5. Click "Register" to create your account

#### 2.1.2.2 Login
1. Navigate to the login page by clicking to the sign in button
2. Enter your username and password
3. Click "Login"

### 2.1.3 Main Features

#### 2.1.3.1 Feed Page
- **For You Section**: View posts tailored to your interests
- **Explore Section**: Discover posts from all interest areas
- **Active Workout Reminders**: View cards showing exercises in your current active workout (Web only)
- **Create Post**: Share your fitness journey
  - Add text content
  - Include images (optional)
  - Tag relevant topics
  - Share training programs

#### 2.1.3.2 Training Programs

##### Viewing Programs
1. Navigate to the Training Programs section
2. Browse recommended programs (sorted by popularity)
3. Click on a program to view details:
   - Program description
   - Weekly structure
   - Exercise details
   - Current user ratings

##### Joining a Program
1. Select a training program
2. Click "Join Program"
3. Confirm your selection
4. Begin with Week 1

##### Completing Exercises
1. Open your active program
2. Select the current workout
3. For each exercise:
   - View exercise details and instructions
   - Input completed repetitions for each set
   - Submit your progress
4. Complete all exercises to finish the workout

#### 2.1.3.3 Progress Tracking

##### Web Version
- View progress graphs for each trained muscle on your profile page
- Track completion percentage for each program
- Monitor weekly and workout-based progress

##### Mobile Version
- View daily commitment percentage for active programs
- Track overall program progress

#### 2.1.3.4 Feedback System
1. Navigate to the feedback section
2. Select the training program
3. Choose affected muscles from the body diagram
4. Add detailed comments
5. Submit feedback

#### 2.1.3.5 Social Features
- Follow other users
- Like posts
- Bookmark posts for later reference
- View user profiles and their progress

### 2.1.4 Tips and Guidelines
1. **Program Participation**:
   - You cannot join multiple programs of the same type simultaneously
   - Follow recommended rest periods between workouts. If you still want to workout before the suggested time, approve the terms and proceed.
   - Complete all exercises in a workout before moving to the next

2. **Progress Tracking**:
   - Submit your progress immediately after completing exercises
   - Progress submissions cannot be edited once submitted
   - Regular tracking helps in maintaining accurate progress graphs

3. **Feed Interaction**:
   - Use relevant tags when creating posts
   - Check the "For You" section for personalized content
   - Use the "Explore" section to discover new content

### 2.1.5 Troubleshooting
If you encounter any issues:
1. Verify your internet connection
2. Ensure you're using the latest version of the application
3. Try logging out and logging back in
4. Clear your browser cache (for web version)
5. Contact support if issues persist

### 2.1.6 Privacy and Security
- Your personal information is securely stored
- Progress data is private to you and your trainers
- You can control who follows you
- Feedback submissions are visible only to trainers

### 2.1.7 System Requirements
#### Web Application
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Stable internet connection
- JavaScript enabled

#### Mobile Application
- Android device
- Android version 6.0 or higher
- Minimum 2GB RAM
- 100MB free storage
- Stable internet connection

## 2.2 System Manual
### 2.2.1 Backend Manual

#### 2.2.1.1 Spring Boot + PostgreSQL Dockerized App

This project contains a Spring Boot app and a PostgreSQL database, both running inside Docker containers.

##### Prerequisites
- Docker: https://www.docker.com/get-started
- Docker Compose: https://docs.docker.com/compose/install/

#### 2.2.1.2 Setup

##### 1. Clone the Repository
```bash
git clone https://github.com/bounswe/bounswe2024group7
cd <your-repository-directory>/backend
```

##### 2. Configure Environment Variables

Create a `.env` file in the root directory(demo-group7) and add:

```
POSTGRES_DB=group7test
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_HOST=postgres-db
POSTGRES_PORT=5432
```

Alternatively, export these variables in your shell.
Also you can give those values whatever you want, the values are just example.

##### 3. Build and Run the Containers
```bash
docker-compose up --build
```

The application will be available at:
```
http://localhost:8080
```

##### 4. Stop Containers
```bash
docker-compose down
```

#### Project Structure
- **Dockerfile**: Builds the Spring Boot app image.
- **docker-compose.yml**: Orchestrates PostgreSQL and Spring Boot services.

#### Database Configuration
- **POSTGRES_DB**: Name of the database.
- **POSTGRES_USER**: Database user.
- **POSTGRES_PASSWORD**: User password.
- **POSTGRES_HOST**: Database host (use `postgres-db` to match service name).
- **POSTGRES_PORT**: Database port (`5432`).

### 2.2.2 Frontend Manual

#### 1. Add new environment variables to `.env` file created in the backend manual
```
VITE_API_URL="http://localhost:8080"
VITE_PORT=3000
SPRING_PORT=8080
```

#### 2. Local development without Docker

This part is for running the frontend of the application standalone.

##### 2.1 Create `.env` file on the frontend folder
```
cd frontend
mkdir .env
```

##### 2.2 Add environment variable
```
VITE_API_URL="http://localhost:8080" # OR THE DEPLOYMENT URL.
```

##### 2.3 Install the dependencies
```
npm run install
```

##### 2.4 Run the development script
```
npm run dev
```

### 2.2.3 Mobile Manual
#### 2.2.3.1 Prerequisites
* **Node.js**
* **Android Studio** - Environment variable `ANDROID_HOME` should be set correctly. Preferred JDK version is 17. Add jdk bin to path. Environment variable `JAVA_HOME` should be set to the jdk directory path. 
* **React Native Cli** - Install react-native-cli globally by executing `npm install -g react-native-cli`

#### 2.2.3.2 Setup
* **Clone the repository** 
`git clone https://github.com/bounswe/bounswe2024group7.git`
* **Checkout to main (default branch)**
`git checkout main`
* **Change directory to mobile** 
`cd mobile`
* **Install dependencies from package.json** 
`npm install`

#### 2.2.3.3 Run App
* **Run an Emulator** 
You can run an emulator in `AVD Manager` window in Android Studio. You can use the preinstalled device or create a new device by installing desired OS image.
* **Start Metro Bundler**
`npx react-native start`
* **Build & Launch App** 
Press a in the terminal or click the run button on the menu bar.
## 2.3 Other Artifacts
1. **[Software Requirements Specification (SRS)](https://github.com/bounswe/bounswe2024group7/wiki/Requirements-of-the-New-Project)**
2. **[Use-Case Diagram](https://github.com/bounswe/bounswe2024group7/wiki/Use-Case-Diagram)**
2. **[Class Diagram](https://github.com/bounswe/bounswe2024group7/wiki/Class-Diagram)**
3. **[UML Sequence Diagrams](https://github.com/bounswe/bounswe2024group7/wiki/UML-Sequence-Diagrams)**
3. **[User Scenarios and Mock-ups](https://github.com/bounswe/bounswe2024group7/wiki/Use-Case-Scenarios)**
4. **[The Project Plan](https://github.com/bounswe/bounswe2024group7/wiki/Project-Plan)**
5. **[Unit Tests](https://github.com/bounswe/bounswe2024group7/wiki/Unit-Tests)**

# 3. Software Package
The deployed pre-release including the related `.apk` file is [available](https://github.com/bounswe/bounswe2024group7/releases/tag/customer-presentation-3) on GitHub.
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
<details>
<summary>
Apk Drive Link
</summary>
https://drive.google.com/file/d/1C-YGDgR_8HFFwCerrPJ3Lkl5kQrZ8MvG/view?usp=sharing
</details>
