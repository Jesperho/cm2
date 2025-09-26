#Self-Assessment: User Authentication Routes
###Example 1: Implementing Signup and Login Functionality

Initially, backend did not have authentication endpoints set up.

```javascript
// userRouter.js
const express = require("express");
const { signupUser, loginUser } = require("../controllers/userControllers");
const router = express.Router();

router.post("/signup", signupUser);
router.post("/login", loginUser);

module.exports = router;
```

This allowed basic functionality such as:
POST http://localhost:4000/api/users/signup with user details
POST http://localhost:4000/api/users/login with email and password

However, there were improvements needed:

Input validation was missing in the original draft.
Passwords were not hashed before storing, which was insecure.
JWT tokens were not implemented, so there was no way to authenticate requests.

To address these issues, I implemented userControllers.js with validation, password hashing, and JWT token generation:

```javascript
// userControllers.js (signup example)
const signupUser = async (req, res) => {
  const { name, email, password, phone_number, gender, date_of_birth, membership_status } = req.body;

  try {
    if (!name || !email || !password || !phone_number || !gender || !date_of_birth || !membership_status) {
      throw Error("All fields must be filled");
    }
    if (!validator.isEmail(email)) throw Error("Email not valid");
    if (!validator.isStrongPassword(password)) throw Error("Password not strong enough");

    const exists = await User.findOne({ email });
    if (exists) throw Error("Email already in use");

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await User.create({ name, email, password: hash, phone_number, gender, date_of_birth, membership_status });

    const token = createToken(user._id);
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
```

Key Improvements:

Input Validation: Ensured all fields are provided and valid (email, password strength).
Security: Passwords are hashed using bcrypt before storing in the database.
JWT Authentication: Users receive a token upon signup/login, enabling authenticated requests to protected routes.

###Example 2: Integrating User Routes in app.js

Initially, the main app.js did not include user routes which caused /api/users endpoints to be inaccessible.

Solution: I imported userRouter.js and connected it under /api/users:



Lessons Learned:

Router Integration: Explicitly connecting routers in app.js is required to make endpoints accessible.

Middleware Order Matters: Adding express.json(), cors(), and morgan() before routers ensures requests are parsed, logged, and CORS-compliant.

Scalable Structure: Separating controllers, routes, and middleware improves readability and maintainability of the backend.


My contributuions:
userControllers.js
userRouter.js
app.js //userRouter part
Minor help in deploying backend
