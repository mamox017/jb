# The Job Board
The Job Board is made primarily with the Bootstrap framework as well as JavaScript.  It uses the Firebase Firestore technology in order to store information about jobs and users.  The Job Board also has authentication and authorization which is implemented through Firebase's authentication library.

<p align="center">
  <img src="https://i.imgur.com/d1mVjsI.png">
</p>

# Release
The job board is a functioning website that is deployed at the following link:

- https://thejobboard.now.sh

# Site Images

## Landing

The landing page of The Job Board.

## Job Listings

Jobs are listed on each page 5 at a time.  The jobs can be queried through job category or by searching.

## Posting Jobs

Jobs can be posted on this page, the form information is sent and stored into the firebase database.

## Login

The login is handled by the Firebase authentication library.

## Profile

The profile information is populated by the user's attributes pulled from the active session user object.

## Logged In Job Listings

Job listings are available to users to browse and mark whether or not they are applied.  If they are marked applied, they are stored in the user's database subcollection for viewing in the applied tab.

## Applied

This is the applied tab.  Users applied jobs are saved here.

# todo
- tweak pagination further
- tweak search bar/querying algorithm
- track application status
- let profile details be editable
