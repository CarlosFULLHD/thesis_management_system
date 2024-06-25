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

### Project Screenshots

1. Home Page with information for students users

![alt text](image.png)

2. News tab for news made by the person in charge of give information to students:

![alt text](image-1.png)

3. Tool for UCB library for searching older thesis projects, grade projects and in various departments, and in the career

![alt text](image-2.png)

[![Video How to use advanced research directly on library UCB](https://img.youtube.com/vi/0KHJ_l3ZZYE/hqdefault.jpg)](https://youtu.be/0KHJ_l3ZZYE)

The video shows how to use it manually the library interface for searching older thesis projects, grade projects and in various departments, and in the career

""
Searched result for "Redes Neuronales" in "La Paz" department, Only in the carrera de "SIS"
![alt text](image-3.png)

4.

### Admin

### Professor form

1. The professor receive the code in their email
2. He uses in the system and can acces to the form
3. He/She fills the form with their personal information

![alt text](image-4.png)

4. He/She can edit their personal information, photo
   ![alt text](image-5.png)
   ![alt text](image-6.png)

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
