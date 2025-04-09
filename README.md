---

# **Journaling App**

## **Description**
A feature-rich journaling app that allows users to create, save, and manage journal entries with integrated maps and real-time weather data. The app uses Firebase for authentication and Firestore for data storage. Key features include a rich text editor, image embedding, customizable settings, and a geolocation map that pins the location of each journal entry.

---

## **Technologies Used**
- **Frontend**: React, JavaScript, CSS.
- **Backend**: Firebase Authentication, Firestore.
- **Other**: Google Maps API, Weather API (for real-time weather data).
- **Libraries/Tools**: React-Leaflet (for map), React-Quill (for the rich text editor), React-Router-Dom (for the routes, togeder with the loader functionality) , React-Hook-Form (for the form implementation), Zod (form validation), CSS Modules.

---

## **Few of the things I've done**

- Utilized React-Router's loader functionality to fetch data during the loading process, preventing unnecessary re-renders.
- Organized data fetching by splitting it into separate functions and middleware within Redux to maintain a clean separation of concerns.
- Applied CSS modules for better style isolation.
- Made the Map component reusable, with its form conditionally rendered and changed based on the URL path.
- When you click on a journal entry, the ID is added to the URL, which is later used to retrieve the specific journal entry.
- Managed state using Redux Toolkit.
- Industry Standard file structure.

---

## **Features**
- **User Authentication**: Sign in and sign up using Firebase Authentication.
- **Journal Entries**: Create, read, and delete journal entries. Each entry is saved to Firestore.
- **Rich Text Editor**: Write entries with bold, italic, and other rich text formatting. You can also add and resize images via URLs.
- **Interactive Map**: Default location based on user’s geolocation. Click on the map to select a location and get real-time weather information for that area.
- **Location Pins**: View journal entries with location pins on the map. Click on an entry to view or delete the entry.
- **Settings**: Update your username.
- **Responsiveness**: Fully responsive design down to tablet size. Phone responsiveness is in progress.

---

## **Known Issues**
- Phone responsiveness is still a work-in-progress.
- Map may not load if geolocation permission is not granted by the user. Need to handle the error.

---

## **Future Improvements**
- Polish phone responsiveness.
- Add additional features like tagging or categorizing journal entries.

---
