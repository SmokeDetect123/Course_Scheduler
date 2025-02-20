<?php 
session_start(); 

// Check if user is logged in
if (!isset($_SESSION['username'])) {
    $_SESSION['msg'] = "You must log in first";
    header('location: login.php');
    exit(); // Make sure to exit after header redirection
}

// Logout user and destroy session
if (isset($_GET['logout'])) {
    session_destroy();
    unset($_SESSION['username']);
    unset($_SESSION['role']);
    header("location: login.php");
    exit(); // Make sure to exit after header redirection
}
?>
<!DOCTYPE html>
<html>
<head>
  <title>Home</title>
  <link rel="stylesheet" type="text/css" href="login.css">
</head>
<body>

<div class="header">
  <h2>Home Page</h2>
</div>

<div class="content">
  <!-- Welcome message -->
  <p>Welcome to my project page</p>

  <!-- Notification message -->
  <?php if (isset($_SESSION['success'])) : ?>
      <div class="error success">
        <h3>
          <?php 
            echo $_SESSION['success']; 
            unset($_SESSION['success']);
          ?>
        </h3>
      </div>
  <?php endif ?>

  <!-- Logged in user information -->
  <?php if (isset($_SESSION['username'])) : ?>
    <p>Welcome <strong><?php echo $_SESSION['username']; ?></strong></p>

    <!-- Role-specific content -->
    <?php if ($_SESSION['role'] == 'teacher') : ?>
      <p>You are logged in as a <strong>teacher</strong>.</p>
      <p><a href="teacher_dashboard.html">Go to Teacher Dashboard</a></p>
    <?php elseif ($_SESSION['role'] == 'student') : ?>
      <p>You are logged in as a <strong>student</strong>.</p>
      <p><a href="student.html">Go to Student Dashboard</a></p>
    <?php endif ?>

    <!-- Logout link -->
    <p><a href="index.php?logout='1'" style="color: red;">Logout</a></p>
  <?php endif ?>
</div>

</body>
</html>
