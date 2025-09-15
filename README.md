# 🎨 MuseumSearch  

## 📖 Project Description  
This app was developed with **React Native** and the **Expo Framework**.  
It enables users to browse artworks from the collection of the **Art Institute of Chicago**.  

The application is designed for mobile devices and offers:  
- ✅ An intuitive user interface  
- 🔎 A search function with filters  
- 🖼️ A detailed view of artworks  

---

## 📱 App Flow  

### 🏠 Home Screen (`HomeScreen`)  
- Displays a **welcome message**, **museum logo**, and **search bar**  
- Includes a **filter button** (opens animated filter panel)  
- Filters:  
  - Creation period (year from/to)  
  - Country of origin  
  - Material (e.g., *“Oil on canvas”*)  
- Search is triggered with the **Search** button  

### 📂 Results Screen (`ResultsScreen`)  
- Shows up to **30 artworks** (or all, if *View all* is selected)  
- Data retrieved directly from the **Art Institute of Chicago API**  
- Each result displays:  
  - Thumbnail  
  - Title  
  - Artist  
  - Year  
- Tap on result → opens **Detail Screen**  

### ℹ️ Detail Screen (`DetailScreen`)  
Displays comprehensive information:  
- Title  
- Artist  
- Year  
- Country of origin (if available)  
- Material  
- Dimensions  
- Source reference (if available)  

🖼️ High-resolution image embedded  
👉 Tap image → opens **Image Viewer** with fullscreen + zoom  

---

## 🎨 Design  
- Inspired by the **official Art Institute of Chicago website**  
- **Color palette:** dark background + white text, accent red `#b70335`  
- Consistent **typography and layout**  
- **Mobile-first**, responsive design  

---

## ⚙️ Libraries & Components  
- `@react-navigation/native` – navigation system  
- `expo-blur` – background blur effects  
- `expo-linear-gradient` – gradient overlays  
- Custom **React Native components** for layout and UI  

---

## 🔗 API Integration  
- Data fetched from the **Art Institute of Chicago API**  
- Only essential fields requested:  
  - `title`, `image_id`, `date_start`, `artist_title`  
  - `place_of_origin`, `medium_display`  
- Optimized for **performance and clarity**  

---

## ✅ Summary  
This app provides a structured and user-friendly way to:  
- 🔎 Search artworks  
- 🎛️ Filter results  
- 🖼️ Explore details in a visually clear interface  

The project emphasizes:  
- 👤 **User experience**  
- ⚡ **Performance**  
- 🎨 **Design consistency** aligned with the Art Institute’s branding  

---

## 📝 Notes  
- This repository contains the project as submitted for **academic evaluation**  
- Includes both **source code** and packaged files (`.apk`, `.zip`)  
- Developed for **educational purposes** — *not intended for production use*  
