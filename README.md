# 📘 React User Management App

A simple React app to **Create, Read, Update, and Delete (CRUD)** user entries with form validation, route-based navigation, toast notifications, and a searchable data table. The backend is simulated using **json-server**.

---

## 🗂️ Project Structure

```
src/
│
├── App.js               # Main entry with routing and core logic
├── components/
│   ├── Navbar.jsx       # Shared navigation bar
│   ├── Table.jsx        # Table view using react-data-table-component
│   └── Form.jsx         # Form for adding/updating users
└── db.json              # Simulated backend (via json-server)
```

---

## 🚀 Features

- ✅ Add new users with email and password  
- ✏️ Edit existing user details  
- ❌ Delete users  
- 🔍 Search users by email  
- 📋 View data in a paginated table  
- 🔄 Auto-fetch and re-render data  
- 🔔 Toast notifications for actions  
- 🔒 Basic form validation  

---

## ⚙️ Setup Instructions

### 1. Install Dependencies

```bash
npm install axios react-router-dom react-toastify react-data-table-component
```

### 2. Start `json-server`

Make sure your `db.json` looks like:

```json
{
  "user": []
}
```

Run:

```bash
npx json-server --watch db.json --port 3000
```

### 3. Start React App

```bash
npm run dev  # if using Vite
# or
npm start    # if using CRA
```

---

## 🧠 `App.js` – Main Logic

### 🔄 `handleFetch`

```js
const handleFetch = async () => {
  let res = await axios.get(url);
  setList(res.data);
};
```

### 💾 `handleSubmit`

```js
if (editIdx === "") {
  await axios.post(url, { ...user, id: String(Date.now()) });
  toast.success("User added successfully");
} else {
  await axios.put(`${url}/${editIdx}`, { ...user });
  toast.info("User updated successfully");
  setEditIdx("");
}
handleFetch();
setUser({});
navi("/table");
```

### ✏️ `handleEdit`

```js
const handleEdit = (id) => {
  let data = list.find(val => val.id === id);
  setUser(data);
  setEditIdx(id);
  navi("/");
};
```

### ❌ `handleDelete`

```js
await axios.delete(`${url}/${id}`);
toast.warn("User Deleted!!!");
handleFetch();
```

---

## 📄 `Form.jsx`

Validation logic in `App.js`:

```js
const validation = () => {
  let error = {};
  if (!user.email) error.email = "Email is required.";
  if (!user.password) error.password = "Password is required.";
  setError(error);
  return Object.keys(error).length === 0;
};
```

---

## 📊 `Table.jsx`

### 🔍 Filter by email

```js
let userData = list.filter(val =>
  val.email?.toLowerCase().includes(textfilter.toLowerCase())
);
```

### ✏️ & ❌ Action Buttons

```jsx
<button onClick={() => handleEdit(row.id)}>Edit</button>
<button onClick={() => handleDelete(row.id)}>Delete</button>
```

---

## 🔁 Routing (React Router)

```jsx
<Routes>
  <Route path="/" element={<Form ... />} />
  <Route path="/table" element={<Table ... />} />
</Routes>
```

---

## 🔔 Toast Notifications

```js
toast.success("User added successfully");
toast.info("User updated successfully");
toast.warn("User Deleted!!!");
```

---

## ✅ Tips

```js
setUser({});
setEditIdx("");
```

Use this for generating unique IDs:

```js
String(Date.now());
```

Always refresh data:

```js
handleFetch();
```