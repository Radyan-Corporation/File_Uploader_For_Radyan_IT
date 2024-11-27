Here’s a **README.md** for your API that documents how to upload and delete files using the provided endpoints.  

---

# **File Upload and Delete API**

This API allows users to upload and delete files. Supported file types include images, videos, and documents, each stored in their respective directories.

---

## **Base URL**

```
http://localhost:5000/api
```

---

## **Endpoints**

### **1. Upload File**
Upload a file to the server.  
#### **POST** `/upload`
- **Description**: Uploads a general file.
- **Request Body**:
  - **Form-Data**:
    - `file`: The file to be uploaded.
- **Response**:
  ```json
  {
    "success": true,
    "file_url": "http://localhost:5000/uploads/general/<file_name>",
    "file_info": {
      "originalName": "example.pdf",
      "size": 102400,
      "mimetype": "application/pdf",
      "path": "uploads/general/1672327869203-example.pdf"
    }
  }
  ```

#### **POST** `/upload/photo`
- **Description**: Uploads an image file. Only image MIME types are allowed.
- **Request Body**:
  - **Form-Data**:
    - `file`: The image file to upload.
- **Response**:
  ```json
  {
    "success": true,
    "file_url": "http://localhost:5000/uploads/images/<file_name>",
    "file_info": {
      "originalName": "example.jpg",
      "size": 204800,
      "mimetype": "image/jpeg",
      "path": "uploads/images/1672327869203-example.jpg"
    }
  }
  ```

#### **POST** `/upload/video`
- **Description**: Uploads a video file. Only video MIME types are allowed.
- **Request Body**:
  - **Form-Data**:
    - `file`: The video file to upload.
- **Response**:
  ```json
  {
    "success": true,
    "file_url": "http://localhost:5000/uploads/videos/<file_name>",
    "file_info": {
      "originalName": "example.mp4",
      "size": 10240000,
      "mimetype": "video/mp4",
      "path": "uploads/videos/1672327869203-example.mp4"
    }
  }
  ```

#### **POST** `/upload/document`
- **Description**: Uploads a document file. Only supported document MIME types (e.g., PDF, DOCX, etc.) are allowed.
- **Request Body**:
  - **Form-Data**:
    - `file`: The document file to upload.
- **Response**:
  ```json
  {
    "success": true,
    "file_url": "http://localhost:5000/uploads/documents/<file_name>",
    "file_info": {
      "originalName": "example.pdf",
      "size": 512000,
      "mimetype": "application/pdf",
      "path": "uploads/documents/1672327869203-example.pdf"
    }
  }
  ```

---

### **2. Delete File**
Delete a file from the server.

#### **DELETE** `/files/:type/:filename`
- **Description**: Deletes a file of the specified type and filename.
- **Path Parameters**:
  - `type`: The type of file (e.g., `images`, `videos`, `documents`, `general`).
  - `filename`: The name of the file to delete (including the extension).
- **Example Request**:
  ```bash
  DELETE http://localhost:5000/api/files/videos/1672327869203-example.mp4
  ```
- **Response**:
  - **Success**:
    ```json
    {
      "success": true,
      "message": "File deleted successfully"
    }
    ```
  - **Error (file not found)**:
    ```json
    {
      "success": false,
      "error": "File not found or could not be deleted"
    }
    ```

---

## **Instructions**

### **Uploading Files**
1. Use tools like Postman, cURL, or any HTTP client library.
2. Choose the appropriate endpoint:
   - `/upload` for general files.
   - `/upload/photo` for image files.
   - `/upload/video` for video files.
   - `/upload/document` for document files.
3. In the request body, include a **Form-Data** field with the key `file` and the file as the value.

#### **Example Using cURL**
```bash
POST --- "file=@/path/to/file.jpg" http://localhost:5000/api/upload/photo
```

---

### **Deleting Files**
1. Determine the file type (`images`, `videos`, `documents`, or `general`) and the file name from the upload response.
2. Send a DELETE request to `/files/:type/:filename`.

#### **Example Using cURL**
```bash
DELETE --  http://localhost:5000/api/files/images/1672327869203-example.jpg
```

---

## **File Storage Paths**
Here are the storage directories where files are saved:
- **Images**: `uploads/images`
- **Videos**: `uploads/videos`
- **Documents**: `uploads/documents`
- **General Files**: `uploads/general`

Ensure these directories are accessible by your server.

---

## **File Validation**
- **Image Files**:
  - MIME types: `image/jpeg`, `image/png`, `image/gif`, etc.
- **Video Files**:
  - MIME types: `video/mp4`, `video/mpeg`, etc.
- **Document Files**:
  - MIME types: `application/pdf`, `application/msword`, `text/plain`, etc.
- **General Files**:
  - No specific validation (use `/upload`).

---

## **Error Handling**
- **File Not Uploaded**: Returns a `400` error.
- **Invalid File Type**: Returns a `400` error with a message specifying the allowed types.
- **File Not Found for Deletion**: Returns a `404` error.

---

## **Environment**
- **Server Port**: `5000` (default, configurable via `PORT` environment variable).

