# File Uploader

A stripped down version of Google Drive (or any other personal storage service)

## Design

### Database

#### Entities

The two main entities are **User** and **Post**. These are related through a
**one-to-many** cardinality, i.e., one **User** can have zero or many **Post**,
while a **Post** can only belong to one **User**.

#### Entity Relational Diagram

![](https://github.com/BradCodeCraft/odin-file-uploader/blob/main/public/designs/odin_file_uploader.jpg?raw=true)

### Routes

#### `GET` requests

`/` - retrieves welcome page

`/log-in` - retrieves log in page

`/sign-up` - retrieves sign up page

> **NOTE**: You do not need an account to access the routes above.

`/files` - retrieves files page

`/files/:fileId` - retrieves file details of file id _fileId_

`/files/new` - retrieves new file page

#### `POST` requests

`/log-in` - authenticates a user with provided credentials

`/sign-up` - creates a user if crendentials are valid

`/files/:fileId` - updates file details of file id _fileId_ if the user is the
author

`/files/new` - uploads a file

#### `DELETE` requests

`/files/:fileId/delete` - delete file details of file id _fileId_ if the user
is the author
