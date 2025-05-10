# HAMS - Hospital Administration Management System

HAMS is a full-stack web application designed to manage hospital operations efficiently. It includes user roles like Admin, Doctor, and Patient with features tailored to each.
---

## Tech Stack

### Frontend

- TypeScript
- HTML/CSS
- Jest

---
## Getting Started

### Frontend Setup

```bash
cd HAMS-System
npm install
npx http-server
# or if defined in scripts
npm start
```

### Running Tests

# Frontend
cd HAMS-System
npm test
```

---


## Project Structure

### Frontend `src/`

```
App.tsx
Components/
  ├── AdminView/
  ├── DoctorView/
  └── PatientView/
Css/
Models/
Services/
assets/
main.tsx
setupTest.ts
vite-env.d.ts
```

### Frontend `tests/`

```
DoctorView/
PatientView/
Services/
```

---

## Features

- Doctor profile and availability management
- Patient appointment booking and history
- Admin user management
- Calendar view for appointments
- Authentication and role-based access

---
## Development Notes

- `jest.setup.ts` is configured for frontend global test setup.

---

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/feature-name`)
3. Commit your changes (`git commit -m 'Add feature'`)
4. Push to the branch (`git push origin feature/feature-name`)
5. Open a Pull Request

---
