
# Introduction
This is the first milestone report of the Group 7 of bounswe2024. This group of CMPE451 Project Development in Software Engineering Course intends to build a software called Fitness Fact which brings people wishing to dive into the fitness world with professional trainers and dieticians. The contributed members of this project are: 
- [Abdulsamet Alan](./Abdulsamet-Alan)
- [Asım Dağ](./Asım-Dağ)
- [Deniz Bilge Akkoç](./Deniz-Bilge-Akkoc)
- [Eren Pakelgil](./Eren-Pakelgil)
- [Hanaa Zaqout](./Hanaa-Zaqout)
- [Mert Cengiz](./Mert-Cengiz)
- [Mustafa Ocak](./Mustafa-Ocak)
- [Oğuz Hekim](./Oguz-Hekim)

# 1. Executive Summary
## 1.1) Summary of Project and Any Changes That are Planned for Moving Forward
The Fitness Facts (FitFact) project is a fitness platform designed to connect people who want to improve their health and wellness. It’s a web and mobile app where users can follow fitness and diet programs, share progress, and connect with trainers and dieticians. The app also helps users track their fitness journey with progress graphs and leaderboards for streaks where users can see how many days in a row they have followed a program.

The platform supports four types of users:

- Guest users can only view forum posts and programs without interacting.
- Trainees are regular users who can join programs, track their progress, and compete with others on a leaderboard for completing workout streaks.
- Trainers are experts who create workout programs, share fitness posts, and interact with trainees.
- Dieticians provide diet programs to help users with healthy eating and nutrition.

For the first milestone, we successfully set up the project, allowing users and trainers to create posts, trainers to add programs, and created profile pages for all users. We plan to add a progress map that users can see their progress day by day and complete more features outlined in the requirements.

Our goal is to create a space where people can easily access fitness and diet plans, connect with professionals, and track their fitness journey in an encouraging and social way.

## 1.2) The status of deliverables
| Deliverable | Progress | Link |
| :---: | :---: | :---: | 
| Communication Plan | Delivered and Completed | [Communication Plan](https://github.com/bounswe/bounswe2024group7/wiki/Communication-Plan) |
| Project Plan | Delivered and Completed  | [Project Plan](https://github.com/bounswe/bounswe2024group7/wiki/Project-Plan) |
| UML Diagrams | Delivered and Completed  | [UML Diagrams](https://github.com/bounswe/bounswe2024group7/wiki/UML-Sequence-Diagrams) |
| Requirements | Delivered and Completed  | [Requirements](https://github.com/bounswe/bounswe2024group7/wiki/Requirements-of-the-New-Project) |
| Mock-ups and Scenarios | Delivered and Completed  | [Scenarios with Mock-ups](https://github.com/bounswe/bounswe2024group7/wiki/Use-Case-Scenarios) |
| Meeting Notes | Delivered and Completed  | [Meeting Notes](https://github.com/bounswe/bounswe2024group7/wiki/Meeting-Notes) |
| Lab Reports | Delivered and Completed  | [Lab Reports](https://github.com/bounswe/bounswe2024group7/wiki/Lab-Notes) |
| Milestone Report | Delivered and Completed  | [Milestone Report](https://github.com/bounswe/bounswe2024group7/wiki/CMPE451-Customer-Milestone-Report-%E2%80%90-1) |
| Responsibility Assignment Matrix (RAM) | Delivered and Completed  | [RAM](https://github.com/bounswe/bounswe2024group7/wiki/Responsivity-Assignment-Matrix-(RAM)) |

## 1.3) Requirements Addressed in this Customer Milestone
- 1.1.1.1 Guest user shall be able to register with an unique username, a hard password and an unique email.
- 1.1.1.1.1 Password must contain at least one number, symbol, uppercase and lowercase letter. Password must be at least 8 characters and at most 20 characters long.
- 1.1.1.1.2 Username shall start with a letter and can contain uppercase, lowercase letters, numbers and underscore and dash. Username shall not end with underscore or dash. Username shall be at least 4 characters long and at most 20 characters long.
- 1.1.1.2 User shall be able to login with their registered username and password.
- 1.1.1.3 Logged in users shall be able to logout.
- 1.1.3.2.1 Trainers shall be able to create training programs for Trainees to join.
- 1.1.3.2.2 Trainers shall be able to select the program type as group or individual.
- 1.1.3.2.3 Each program shall include location categorization, such as club, home, and outdoor.
- 1.1.3.2.4 Users shall be able to see the specific muscles or cardio targeted in each program.
- 1.1.3.3.1 Trainees shall be able to join training programs created by Trainers.
- 1.1.5.1 Registered users shall be able to follow and unfollow other registered users.
- 1.1.8.1.1 Training programs shall have one of two program types: group or individual.
- 1.1.8.1.2 Each program shall include location categorization, such as club, home and outdoor.
- 1.1.8.1.3 The specific muscles targeted in each muscle training program shall be visible to viewing users.
- 1.1.8.1.4 Training programs shall include daily exercise plans.
- 1.1.8.1.5 Each exercise information shall include its type, reps, and sets
- 1.1.9.1 Posts that are created by users shall be visible on the feed by all the users.
- 2.4.1 All content shall be seen in English
- 2.4.2 Using the program shall be not difficult for everyone


## 1.4) Summary of Customer Feedback and Reflections
The meeting with the customers obviously helped the team realize the strengths and weaknesses of both the team itself and the application developed by the feedback they gave and the reflections and reactions they expressed. They could be listed as below:
### 1.4.1) Customer Reflections and Reactions
- Customers did not interested in login, sign-up, and creating a training program features, which is expected. It is natural that customers do not pay attention to the features existing in almost any software application, but instead, they look for specific features that separates our application from an ordinary application.
- Customers appreciated the motivation of the application; from their expressions, it is not wrong to say that they found the problem interesting and believe this application may be useful in real life. The team also believes that the problem is worth to develop a solution and make effort on that.
- Customers were surprised as in the presentation in the customer meeting, the application was presented from the local device, instead of the deployed address. Their reaction was quite normal; however, due to some technical problems, it became a necessity.
- Customers were expecting different user roles be available within the application; as it was already included, they could said to be satisfied.
### 1.4.2) Customer Feedback
- Customers suggested that the application shall include a tracking system. They probabably believe that one of the main purposes of the forum would be the tracking mechanism. The suggestion of the team was using the streak and labeling systems that going to be added to the forum dynamically (Labeling was static in the customer meeting). 
- Customers recommended that information for different exercises, such as good to do / bad to do in that example shall be available to the trainees wishing to select and do that training type. This recommendation was evaluated by the team and decided to put this feaure to the forum.
- Customers were confused about the recording mechanism of exercises within the application. As the team, we suggested both the progress bar where Trainees shall be able to follow their progress, and sending posts related to that specific exercise as recording mechanism; as well as the success and streak mechanism, which are asked to the team again by the customers, and explained in detail.

# 2. Evaluation of the Status of the Deliverables

- **Communication Plan**: The initial plan was set during the first lab of the semester, where we chose a fixed day for weekly meetings. However, the demands of the project led to more frequent sessions than anticipated. Discord was initially our main platform for discussions, but due to unforeseen restrictions affecting some team members, we switched primarily to WhatsApp to ensure smooth communication.

- **Project Plan**: We utilized GitHub's project management tools, which made planning more organized and transparent. Features like "To-Do," "In Progress," and issue tracking allowed us to track tasks and pull requests effectively. This setup provided a clear overview of the project's progression and responsibilities.

- **UML Diagrams**: We began drafting UML diagrams after the third lab meeting, intentionally designing them before coding to clarify our implementation approach. Some adjustments were made after initial implementation to reflect changes in the project structure, keeping the diagrams accurate and aligned with our codebase.

- **Requirements**: Requirements were discussed and defined in the third lab session, where we reviewed last year’s designs and identified areas for improvement. This collaborative discussion, concluding with feedback from the TA, helped us establish clear, realistic requirements for this year's project.

- **Mockups and Scenarios**: Mockups and scenarios were essential to our design process, allowing us to draw from real-world situations. By defining scenarios early, we could design and refine features that transformed abstract ideas into concrete, actionable items for the implementation phase.

- **Meeting Notes**: We took notes at every meeting, which helped us track discussions, decisions, and actions taken. These notes served as a valuable reference, making it easy to revisit ideas and details, which supported both our project tracking and design consistency.

- **Lab Reports**: While similar to meeting notes, lab reports were more formal and included summaries of authoritative decisions, which required extra attention and precision. Since these reports were shared with TAs and instructors, we aimed for thoroughness and accuracy.

- **RAM (Responsibility Assignment Matrix)**: The RAM allowed us to track individual contributions, giving a clear view of task distribution across the team. This provided a helpful perspective on the overall project workload and task ownership, ensuring a balanced distribution and accountability. 


# 3. The Effort Table of Members
| # | Person | Responsibilities | Main Contributions | Code Related Significant Issues | Non-Code Related Significant Issues | PRs | Additional Information |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | 
| 1 | Abdulsamet Alan | Contributed to the features and requirements of the application. Worked with other members on to decide how can we implement a requirement less coupling in the services.| Implemented the Frontend of the application and integrated Frontend and Backend. Created the final version of the dockerization and composition. Reviewed and tested the PR's. Deployed the application to the cloud service. Made the pre-release.|https://github.com/bounswe/bounswe2024group7/issues/178. https://github.com/bounswe/bounswe2024group7/issues/177. https://github.com/bounswe/bounswe2024group7/issues/176. https://github.com/bounswe/bounswe2024group7/issues/168. https://github.com/bounswe/bounswe2024group7/issues/167. https://github.com/bounswe/bounswe2024group7/issues/161. https://github.com/bounswe/bounswe2024group7/issues/158. https://github.com/bounswe/bounswe2024group7/issues/155. https://github.com/bounswe/bounswe2024group7/issues/179. These issues are related to mostly frontend and also to the infrastructure of the application. |https://github.com/bounswe/bounswe2024group7/issues/156 | I haven't create any PR's because frontend team worked together with pair programming. | |
| 2 | Asım Dağ | I was part of the mobile team until the first initialization of the projects. Also I was responsible from the use case scenarios, mockup datas and summary of the project. | I helped designing the architecture of the app. I also contributed to the creation of scenarios and created mockup data for the application. In the mobile part, I worked together with Eren and Mert. Then I merged the mobile part with main. | Issues: [#164](https://github.com/bounswe/bounswe2024group7/issues/164), [#147](https://github.com/bounswe/bounswe2024group7/issues/147), [#136](https://github.com/bounswe/bounswe2024group7/issues/136), [#131](https://github.com/bounswe/bounswe2024group7/issues/131) | Issues: [#142](https://github.com/bounswe/bounswe2024group7/issues/142), [#157](https://github.com/bounswe/bounswe2024group7/issues/157) | PR: [#181](https://github.com/bounswe/bounswe2024group7/pull/181) | |
| 3 | Deniz Bilge Akkoç |  Creating sequence diagrams and contributing to discussions during meetings and labs. I was part of the frontend team for the implementation part.| Created sequence diagrams and worked on frontend. | Issues: [#128](https://github.com/bounswe/bounswe2024group7/issues/128), [#132](https://github.com/bounswe/bounswe2024group7/issues/132), [#140](https://github.com/bounswe/bounswe2024group7/issues/140), [#144](https://github.com/bounswe/bounswe2024group7/issues/144) | Issues: [#155](https://github.com/bounswe/bounswe2024group7/issues/155), [#161](https://github.com/bounswe/bounswe2024group7/issues/161) | PRs: [#163](https://github.com/bounswe/bounswe2024group7/pull/163)| | |
| 4 | Eren Pakelgil | Updating communication plan, creating requirements & sequence diagrams and contributing to discussions during meetings and labs. I was part of the mobile team for the implementation part. | Updated communication plan, created requirements, created sequence diagrams, initialized the mobile app with React Native, added necessary components to the mobile app, created RAM| Issues: [#136](https://github.com/bounswe/bounswe2024group7/issues/136), [#147](https://github.com/bounswe/bounswe2024group7/issues/147), [#149](https://github.com/bounswe/bounswe2024group7/issues/149), [#164](https://github.com/bounswe/bounswe2024group7/issues/164) | Issues: [#130](https://github.com/bounswe/bounswe2024group7/issues/130), [#140](https://github.com/bounswe/bounswe2024group7/issues/140), [#183](https://github.com/bounswe/bounswe2024group7/issues/183) | PRs: [#151](https://github.com/bounswe/bounswe2024group7/pull/151), [#181](https://github.com/bounswe/bounswe2024group7/pull/181) | |
| 5 | Hanaa Zaqout | Creating sequence diagrams, editing requirements and contributing to discussions during meetings and labs. I was part of the backend team for the implementation part.| Created sequence diagrams, edited requirements and contributing to discussions. I faced issues running Docker for the backend on my laptop, so, following Oguz's advice, I decided to run everything locally, which delayed my contributions during the first milestone. Now, the environment—including PostgreSQL, Postman, and IntelliJ—is running successfully. As the milestone progressed, more effort was needed on the mobile side. I downloaded Android Studio to contribute but was unable to run it successfully, despite trying to debug the situation with Eren. | Issues: [#135](https://github.com/bounswe/bounswe2024group7/issues/135), [#138](https://github.com/bounswe/bounswe2024group7/issues/138), [#147](https://github.com/bounswe/bounswe2024group7/issues/147), [#164](https://github.com/bounswe/bounswe2024group7/issues/164) | Issues: [#148](https://github.com/bounswe/bounswe2024group7/issues/148) | | |
| 6 | Mert Cengiz | Deciding on the Meetings and Organizing, Requirement Specification, Reviewing Diagrams, Creating a Mobile Application that Covers Requirements that Decided as a Team | Handling Requirements, Reviewing Diagrams, Inititalizing the React Native Project with Docker and Mock Data, and Adding Necessary Components to the Web Page | In the issues [#164](https://github.com/bounswe/bounswe2024group7/issues/164), [#147](https://github.com/bounswe/bounswe2024group7/issues/147), and [#136](https://github.com/bounswe/bounswe2024group7/issues/136), the initialization, Dockerization and creating with pages with mock data was performed, resulted in PRs [Mobile branch](https://github.com/bounswe/bounswe2024group7/pull/181) and [Issue#136 initialize mobile application](https://github.com/bounswe/bounswe2024group7/pull/139) and commits inside them with addition to the issue [#149](https://github.com/bounswe/bounswe2024group7/issues/149), where pages in the Web pages created, resulting in PR [Issue#149 connect web frontend and backend](https://github.com/bounswe/bounswe2024group7/pull/151) | Issues [#129](https://github.com/bounswe/bounswe2024group7/issues/129), where the Requirements page is integrated from the last project, containing all initial requirements; [#130](https://github.com/bounswe/bounswe2024group7/issues/130), where Requirements page is updated according to the meeting with the TA and the needs of the team; [#141](https://github.com/bounswe/bounswe2024group7/issues/141), where the Class Diagram is reviewed and updated by introducing a new class. | The PR [Issue#149 connect web frontend and backend](https://github.com/bounswe/bounswe2024group7/pull/151) was created and merged by Abdulsamet Alan without any conflicts. Additionally, contributed with many commits to the branches [Mobile branch](https://github.com/bounswe/bounswe2024group7/pull/181) and [Issue#136 initialize mobile application](https://github.com/bounswe/bounswe2024group7/pull/139), but mostly with the latter branch even though the former branch went faster than the other in the final stages. | In Labs, Discussed with Team Members and Made Suggestions that Resulted in Successful Diagrams and Features in the Application|
| 7 | Mustafa Ocak | API, DB, and Docker setup, created user scenarios, use case diagrams, and core training program and post endpoints.|Established API, DB, Docker environments, and developed essential endpoints for training programs and posts | [Issue#133](https://github.com/bounswe/bounswe2024group7/issues/133), [Issue#135](https://github.com/bounswe/bounswe2024group7/issues/135),[Issue#137](https://github.com/bounswe/bounswe2024group7/issues/137), [Issue#138](https://github.com/bounswe/bounswe2024group7/issues/138), [Issue#160](https://github.com/bounswe/bounswe2024group7/issues/160), [Issue#171](https://github.com/bounswe/bounswe2024group7/issues/171) | [Issue#131](https://github.com/bounswe/bounswe2024group7/issues/131), [Issue#142](https://github.com/bounswe/bounswe2024group7/issues/142)| [PR#152](https://github.com/bounswe/bounswe2024group7/pull/152), [PR#159](https://github.com/bounswe/bounswe2024group7/pull/159), [PR#170](https://github.com/bounswe/bounswe2024group7/pull/170), [PR#175](https://github.com/bounswe/bounswe2024group7/pull/175),| |
| 8 | Oğuz Hekim | Creating project plan, class diagram and contributing to discussions during meetings and labs. I was part of the backend team for the implementation part. | Contributed to requirements. Prepared class diagram. Created project plan. Implemented several endpoints and refactored existing ones. | [Issue#145](https://github.com/bounswe/bounswe2024group7/issues/145), [Issue#153](https://github.com/bounswe/bounswe2024group7/issues/153), [Issue#162](https://github.com/bounswe/bounswe2024group7/issues/162), [Issue#166](https://github.com/bounswe/bounswe2024group7/issues/166), [Issue#173](https://github.com/bounswe/bounswe2024group7/issues/173) | [Issue#130](https://github.com/bounswe/bounswe2024group7/issues/130), [Issue#141](https://github.com/bounswe/bounswe2024group7/issues/141), [Issue#182](https://github.com/bounswe/bounswe2024group7/issues/182)| [PR#146](https://github.com/bounswe/bounswe2024group7/pull/146), [PR#154](https://github.com/bounswe/bounswe2024group7/pull/154), [PR#165](https://github.com/bounswe/bounswe2024group7/pull/165), [PR#169](https://github.com/bounswe/bounswe2024group7/pull/169), [PR#172](https://github.com/bounswe/bounswe2024group7/pull/172), [PR#174](https://github.com/bounswe/bounswe2024group7/pull/174) | |


# 4. Evaluation of Tools and Processes
## 4.1 Tools
### 4.1.1) Github
- Github is the platform that where every information regarding to our group and the project. All plans, researches, personal pages, templates, and the meeting notes are put on Github.
- We have created issues for almost everything we do about the project and class. Issues and PR's mostly created with our predefined templates.

### 4.1.3) Whatsapp
- We have discussed and communicated through Whatsapp as our main platform for our group. Since Discord is banned, our communication is held on here.

### 4.1.4) Discord/Google Meet
- We have used the Discord/Google Meet for the pair programming sessions, solving bugs, reviewing code, etc. Since we are doing the most of the planning on the labs, we didn't use Discord/Google Meet that much.
- We preferred Google Meet instead of Discord for the pair programming sessions, solving bugs, reviewing code, etc. after the unfortunate ban on Discord in Türkiye.

## 4.2 Processes
### 4.2.1) Team Meetings
- Team meetings in the labs were really efficient. We have made our decisions about the project faster than before because our full focus was on the project. We created Lab reports rather than meeting notes this time as required.
- Division of tasks were done on the weekly meetings. 
- We didn't require any other meeting with the help of labs.

### 4.2.2) Separation of Responsibilities
- We distributed responsibilities to people according to their interests and skills on the subject. Experienced members of the group were the leads on the different parts of the project.
- Each responsibility required an issue related to it. We have set deadlines for the responsibilities on the weekly lab sessions.

# 5. The Software
The deployed pre-release including the related `.apk` file is [available](https://github.com/bounswe/bounswe2024group7/releases/tag/customer-milestone-1) in GitHub from the website http://144.126.246.157:3000/