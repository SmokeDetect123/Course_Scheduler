<?php include('server.php') ?>
<!DOCTYPE html>
<html>
<head>
  <title>Login</title>
  <link rel="stylesheet" type="text/css" href="login.css">
</head>
<body>
  <div class="header">
    <h2>Login</h2>
  </div>
  
  <form method="post" action="login.php">
    <?php include('errors.php'); ?>
    
    <div class="input-group">
      <label>Username</label>
      <input type="text" name="username" value="<?php echo isset($username) ? $username : ''; ?>" required>
    </div>

    <div class="input-group">
      <label>Password</label>
      <input type="password" name="password" required>
    </div>

    <!-- Role selection (Teacher/Student) -->
    <div class="input-group">
      <label>Login as:</label>
      <select name="role">
        <option value="student">Student</option>
        <option value="teacher">Teacher</option>
      </select>
    </div>

    <div class="input-group">
      <button type="submit" class="btn" name="login_user">Login</button>
    </div>
    
    <p>
      Not yet a member? <a href="register.php">Sign up</a>
    </p>
  </form>
</body>
</html>
