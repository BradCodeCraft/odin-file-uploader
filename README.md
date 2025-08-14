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

`/home` - retrieves home page

`/home/files/new` - retrieves new file page

`/home/files/:fileId` - retrieves file details of file id _fileId_

`/home/folders/new` - retrieves new folder page

`/home/folders/:folderId` - retrieves folder details of folder id _folderId_

`/home/folders/:folderId/files` - retrieves files page for folder of id _fileId_

`/home/folders/:folderId/files/add` - retrieves add file to folder page for folder
of id _folderId_

#### `POST` requests

`/log-in` - authenticates a user with provided credentials

`/sign-up` - creates a user if crendentials are valid

`/home/files/new` - uploads a file

`/home/files/:fileId` - updates file details of file id _fileId_ if the user is the
author

`/home/folders/new` - creates a folder

`/home/folders/:folderId` - updates folder details of folder id _folderId_ if the
user is the author

`/home/folders/:folderId/files/add` - adds a file to folder id _folderId_

#### `DELETE` requests

`/home/files/:fileId/delete` - delete file details of file id _fileId_ if the user
is the author

`/home/folders/:folderId/delete` - delete foldere details of foldere id _folderId_
if the user is the author
