import express from 'express';
import Hello from "./Hello.js";
import Lab5 from "./Lab5/index.js";
import PathParameters from './Lab5/PathParameters.js';
import cors from "cors";
import db from "./Kambaz/Database/index.js";
import EnrollmentsRoutes from "./Kambaz/Enrollments/routes.js";
import UserRoutes from "./Kambaz/Users/routes.js";
import CourseRoutes from "./Kambaz/Courses/routes.js";
import ModulesRoutes from "./Kambaz/Modules/routes.js"; 
import AssignmentsRoutes from "./Kambaz/Assignments/routes.js";
import "dotenv/config";
import session from "express-session";

const app = express();

// CORS must come FIRST and be configured correctly
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL || "http://localhost:3000",
  })
);

// Session configuration
const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kambaz",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false, // false for local development
    sameSite: 'lax', // 'lax' for local development
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
};

if (process.env.SERVER_ENV === "production") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    domain: process.env.SERVER_URL,
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000
  };
}

app.use(session(sessionOptions));
app.use(express.json());

// Routes
UserRoutes(app, db);
CourseRoutes(app, db);
ModulesRoutes(app, db); 
AssignmentsRoutes(app, db);
EnrollmentsRoutes(app, db);
Lab5(app);
Hello(app);
PathParameters(app);

const port = process.env.PORT || 4000;
app.listen(port);
console.log(`Server running on port ${port}`);