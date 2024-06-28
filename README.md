# Thesis Management System

Develop an integrated information system prototype for efficiently managing the thesis workshops for Systems Engineering, facilitating the administration of registrations, tutor assignments, proposal reviews, and student progress tracking.

## Table of Contents

<details>
  <summary>Click to expand</summary>

- [Project Description](#project-description)
  - [Inform and Create News](#inform-and-create-news)
  - [Library Search Tool](#library-search-tool)
  - [Tutor Management](#tutor-management)
  - [Teacher Registration Management](#teacher-registration-management)
  - [Student Registration Management](#student-registration-management)
  - [Dropout and Withdrawal Management](#dropout-and-withdrawal-management)
  - [Thesis Proposal Review](#thesis-proposal-review)
  - [Tutor and Reviewer Assignment](#tutor-and-reviewer-assignment)
  - [Task Management and Progress Tracking](#task-management-and-progress-tracking)
  - [Final Document Generation](#final-document-generation)
  - [User Management](#user-management)
- [Initial Problems and Requirements](#initial-problems-and-requirements)
- [Preliminary Analysis](#preliminary-analysis)
  - [University Overview](#university-overview)
- [Problem Identification and Analysis](#problem-identification-and-analysis)
  - [For Students](#for-students)
  - [For Coordinators](#for-coordinators)
- [Problem Formulation](#problem-formulation)
- [Objectives](#objectives)
  - [General Objective](#general-objective)
  - [Specific Objectives](#specific-objectives)
- [Justification](#justification)
  - [Practical Justification](#practical-justification)
  - [Social Justification](#social-justification)
- [Scope](#scope)
- [Preliminary Project Analysis](#preliminary-project-analysis)
  - [IDF0 Diagram](#idf0-diagram)
- [Solution Proposal](#solution-proposal)
- [Interface Design](#interface-design)
  - [Global](#global)
  - [Students](#students)
  - [Tutors](#tutors)
  - [Coordinators](#coordinators)
  - [Head of Department](#head-of-department)
- [System Videos](#system-videos)
  - [Overview](#overview)
  - [Student Features](#student-features)
  - [Tutor Features](#tutor-features)
  - [Proposal Management and Tutor Assignment](#proposal-management-and-tutor-assignment)
- [Technologies Used](#technologies-used)

</details>

# Project Documentation: Thesis Management System

Develop an integrated information system prototype for efficiently managing the thesis workshops for Systems Engineering, facilitating the administration of registrations, tutor assignments, proposal reviews, and student progress tracking.

## Videos del Sistema

### Video 1: Overview del Sistema

[![Video 1](https://img.youtube.com/vi/23lxNeG95Ok/hqdefault.jpg)](https://youtu.be/23lxNeG95Ok)

### Video 2: Funcionalidades para Estudiantes

[![Video 2](https://img.youtube.com/vi/1Rt57z2EsCw/hqdefault.jpg)](https://youtu.be/1Rt57z2EsCw)

### Video 3: Funcionalidades para Docentes

[![Video 3](https://img.youtube.com/vi/_59Nvi9AFvg/hqdefault.jpg)](https://youtu.be/_59Nvi9AFvg)

### Video 4: Gestión de Propuestas y Asignación de Tutores

[![Video 4](https://img.youtube.com/vi/y-Z-ewLgTkY/hqdefault.jpg)](https://youtu.be/y-Z-ewLgTkY)

## Project Screenshots

### 1. Home Page with Information for Student Users

![Home Page](imgs/image.png)

### 2. News Tab for News Made by the Person in Charge of Informing Students

![News Tab](imgs/image-1.png)

### 3. Tool for UCB Library for Searching Older Thesis Projects, Grade Projects, and in Various Departments and Careers

![Library Search Tool](imgs/image-2.png)

[![Video: How to Use Advanced Research Directly on Library UCB](https://img.youtube.com/vi/0KHJ_l3ZZYE/hqdefault.jpg)](https://youtu.be/0KHJ_l3ZZYE)

The video shows how to use the library interface manually for searching older thesis projects, grade projects, and in various departments and careers.

"Searched result for 'Redes Neuronales' in 'La Paz' department, Only in the career of 'SIS'":
![Search Result](imgs/image-3.png)

### 4. Tutors Page for Students

A place where a student can find contact information and relevant information about the experience of a tutor. They can sort and filter by subjects (experience of the professors).

![Tutors Page](imgs/image-10.png)

#### Filter Example: Filter by Subject Topic "Robotica"

![Filter by Robotica](imgs/image-13.png)

#### Sort Example: Search Bar "Jua"

![Search Bar](imgs/image-14.png)

More information if the student clicks on a professor:
![Professor Info 1](imgs/image-11.png)
![Professor Info 2](imgs/image-12.png)

### 5. Inscription Process for Students and Evaluation of Proposals

1. After the student has read all the information and prerequisites for inscription, they can fill the inscription form when it is open. (The Coordinator can enable or disable the inscription forms from the system.)

   ![Inscription Form](imgs/image-20.png)

2. The student has to talk in person with the coordinator or the career director about their project to see if the project is acceptable regarding technologies and duplicity. With the provided information, there shouldn't be any problem.

3. The student has to submit the project proposal in a letter. The project and the director must accept it.

From the Coordinator or career director's part, they have to accept your request:
![Request Acceptance](imgs/image-21.png)

They can write any conditions for your case, for special cases and conditions of inscriptions:
![Special Conditions](imgs/image-22.png)

The student receives their credentials: username and autogenerated password:
![Credentials](imgs/image-23.png)

4. After logging into the system, the student can now see the new tab "Mi propuesta de trabajo," where they can upload a link to the drive photo or scan of the letter with a stamp from the coordinator/career director.

   Letter example for "degree workshop proposal":
   ![Letter Example 1](imgs/image-24.png)
   ![Letter Example 2](imgs/image-25.png)

   Modal of confirmation for sending the letter:
   ![Confirmation Modal](imgs/image-26.png)

After sending the degree workshop proposal, the student can wait until the response from the meeting of the career director and executives in charge of the review of the proposals.

![Proposal Response](imgs/image-27.png)

### Proposal Review

Panel with the proposals of all students:
![Proposals Panel](imgs/image-28.png)

Reviewing the proposal:
![Reviewing Proposal 1](imgs/image-29.png)
![Reviewing Proposal 2](imgs/image-30.png)

**PD: The proposal has 4 states:**

1. Approved (in this case)
2. Observed
   ![Observed State](imgs/image-43.png)
3. Rejected
   ![Rejected State](imgs/image-42.png)
4. Ready for review (default state for every proposal)

Coordinator view of all the states:
![All States](imgs/image-44.png)

Modal of confirmation:
![Confirmation Modal](imgs/image-31.png)

New state from the Coordinator's view:
![New State](imgs/image-32.png)

Now they can see in "details" all the important information about the approval of that card:
![Approval Details](imgs/image-33.png)

Now, with the proposal information, the student has a "grade profile":
![Grade Profile](imgs/image-35.png)

### Tutor Assignment for the Student

![Tutor Assignment](imgs/image-36.png)

### Reviewer Assignment for the Student

![Reviewer Assignment](imgs/image-37.png)

### Title Assignment

![Title Assignment](imgs/image-38.png)

### Graduation Mode Assignment

![Graduation Mode Assignment](imgs/image-39.png)

### Final View with All Assigned

![Final View](imgs/image-40.png)

### Student View

The student can see the state of their proposal, and if it is approved, they can see their "grade profile":
![Student Grade Profile](imgs/image-34.png)
![Student Profile](imgs/image-41.png)

Rejected student view:
![Rejected View](imgs/image-45.png)

Observed student view:
![Observed View](imgs/image-46.png)

Sending another proposal letter for review:
![Sending Proposal 1](imgs/image-47.png)
![Sending Proposal 2](imgs/image-48.png)
![Sending Proposal 3](imgs/image-49.png)

All the proposal letters need to have the "Approval" score to be able to have a "grade profile."

## Process for Creating an Account (DOCENTE)

### Admin Part (COORDINADOR)

1. First, the Professor can send their email to the system admin, and the admin writes it down on the "Create temporal code" page.
   ![Create Temporal Code](imgs/image-15.png)

### Professor Part

1. The professor receives the code in their email.
   ![Email Code](imgs/image-16.png)

2. They use it in the system and can access the form.
   ![Form Access 1](imgs/image-17.png)
   ![Form Access 2](imgs/image-18.png)

3. They fill out the form with their personal information.
   ![Personal Information Form](imgs/image-4.png)

4. They receive an email from "tallergradoucb@gmail.com" with their username and autogenerated password.
   ![Email Credentials 1](imgs/image-9.png)
   ![Email Credentials 2](imgs/image-19.png)

5. After login, they can edit their personal information and photo.
   ![Edit Personal Info 1](imgs/image-5.png)
   ![Edit Personal Info 2](imgs/image-6.png)

6. They can add subjects to their information and write some experience about that. It will be shown to the students who need a tutor for their thesis project.
   ![Add Subjects](imgs/image-7.png)

7. They can add a LinkedIn link for more information for their students. They can also add multiple links if needed.
   ![Add LinkedIn](imgs/image-8.png)

## Project Description

### Inform and Create News

Provides essential information about the thesis process and official documentation. Allows creating and publishing news with any start and end date to inform students about changes or recommendations.

### Library Search Tool

Simple interface to search thesis projects within the department by keywords, authors, topics, with a usage tutorial.

### Tutor Management

Provides information on available tutors, including their experience and contact details to help students choose a tutor.

### Teacher Registration Management

Verifies teacher access through email and two-factor authentication to prevent identity theft.

### Student Registration Management

Students can fill out a registration form reviewed by a teacher to validate if they can take the thesis course. Students can submit project proposals for review and access.

### Dropout and Withdrawal Management

Students can withdraw from the course, and the coordinator can approve or reject withdrawal requests.

### Thesis Proposal Review

Provides interfaces for submitting and reviewing thesis proposals, facilitating feedback between the department council and students.

### Tutor and Reviewer Assignment

Helps the thesis coordinator assign tutors and reviewers to students.

### Task Management and Progress Tracking

Enables virtual or in-person meetings between students and tutors, task assignments, progress tracking, and feedback with grades.

### Final Document Generation

Facilitates the generation of the final document for formal defense.

### User Management

Allows managing users, changing roles, and deregistering students.

## Initial Problems and Requirements

The project was initiated with a document of few requirements, later expanded with additional requirements obtained through interviews with the director of the department, thesis workshop coordinator, and associated teachers. We used JIRA for task management and project tracking.

## Preliminary Analysis

### University Overview

The Bolivian Catholic University “San Pablo” offers nine modalities of graduation, with the most common in Engineering being the project, thesis, directed work, and graduation with excellence. The graduation process has deficiencies in organization, lack of information, and communication.

## Problem Identification and Analysis

### For Students

- Inadequate communication between workshop coordination and topic proposals.
- Lack of proper guides and formats.
- Lack of documentation to support proposals.
- Lack of knowledge about the schedule and tutor availability.

### For Coordinators

- Lack of knowledge about the number of interested students.
- Delayed communication with students.
- Lack of centralized record of proposals.
- Delays in issuing results of council meetings.
- Rudimentary student tracking (Excel sheets).
- Difficulty generating statistics.

## Problem Formulation

**How can the management and control of graduation modalities in the Systems Engineering department be improved?**

## Objectives

### General Objective

Develop an information system focused on managing graduation modalities to automate the necessary processes.

### Specific Objectives

1. Identify necessary roles for restricted access to sensitive information.
2. Develop a module for proposal registration and its requirements.
3. Design a module for the evaluation of proposals and documentation by teachers.
4. Generate a schedule modifiable by teachers for the presentation of documentation.
5. Expose statistics on students and modalities.

## Justification

### Practical Justification

The system will improve the organization of graduation modalities by centralizing documentation and facilitating communication between students, teachers, and tutors.

### Social Justification

It will provide convenience to teachers by centralizing documentation in one place and allow students to view submission dates and receive effective feedback.

## Scope

1. Web platform accessible from different devices.
2. Real-time visibility of documentation status.
3. Record of comments and feedback.
4. Visualization of statistics through graphs.
5. Data download capabilities.
6. Generation of a schedule with submission dates.
7. Early alert notifications to students.

## Preliminary Project Analysis

### IDF0 Diagram

1. **Inputs**: Data and proposals from the student for registration.
2. **Subjects**: Students, teachers, and tutors.
3. **Outputs**: Tutor assignment, schedule visualization, and statistics.
4. **Controls**: University regulations and academic calendar.

## Solution Proposal

Develop an information system for managing graduation work with specific roles (student, teacher, tutor). The system will allow registrations, proposal registration, document tracking, statistics generation, and more.

## Interface Design

### Global

1. Navigation map for global users.
2. Visualization of past project statistics.
3. Search for past projects.
4. Registration requirements visualization.
5. Registration and login.

### Students

1. Navigation map for students.
2. Schedule and submission details visualization.
3. Submission of deliverables and personal data modification.

### Tutors

1. Navigation map for tutors.
2. Session control and record.
3. Schedule and requirements visualization.
4. Student statistics and feedback on deliverables.

### Coordinators

1. Navigation map for coordinators.

### Head of Department

1. Navigation map for the head of department.
2. Visualization of finalized project statuses.

## System Videos

### Overview

[![Video 1](https://img.youtube.com/vi/23lxNeG95Ok/hqdefault.jpg)](https://youtu.be/23lxNeG95Ok)

### Student Features

[![Video 2](https://img.youtube.com/vi/1Rt57z2EsCw/hqdefault.jpg)](https://youtu.be/1Rt57z2EsCw)

### Tutor Features

[![Video 3](https://img.youtube.com/vi/_59Nvi9AFvg/hqdefault.jpg)](https://youtu.be/_59Nvi9AFvg)

### Proposal Management and Tutor Assignment

[![Video 4](https://img.youtube.com/vi/y-Z-ewLgTkY/hqdefault.jpg)](https://youtu.be/y-Z-ewLgTkY)

## Technologies Used

- **Frontend**:
  ![React](https://img.shields.io/badge/-React-61DAFB?logo=react&logoColor=white)
  ![Next.js](https://img.shields.io/badge/-Next.js-000000?logo=next-dot-js&logoColor=white)
  ![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?logo=typescript&logoColor=white)
  ![Tailwind CSS](https://img.shields.io/badge/-Tailwind%20CSS-38B2AC?logo=tailwind-css&logoColor=white)

- **Backend**:
  ![Spring Boot](https://img.shields.io/badge/-Spring%20Boot-6DB33F?logo=spring-boot&logoColor=white)
  ![PostgreSQL](https://img.shields.io/badge/-PostgreSQL-336791?logo=postgresql&logoColor=white)

- **Development Tools**:
  ![Docker](https://img.shields.io/badge/-Docker-2496ED?logo=docker&logoColor=white)
  ![Jira](https://img.shields.io/badge/-Jira-0052CC?logo=jira&logoColor=white)

This documentation is a summary of the complete project, covering from conceptualization to final implementation, highlighting the objectives, problems, solutions, and functionalities of the system. For a more extensive documentation, technical details, architecture diagrams, installation and usage guides, and a log of problems and solutions encountered during development will be included.
