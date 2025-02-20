<?php
session_start();

// Initializing variables
$username = "";
$email    = "";
$role     = ""; // Role to differentiate between student and teacher
$errors = array(); 

// Connect to the database
$db = mysqli_connect('localhost', 'root', '', 'course');

// REGISTER USER
if (isset($_POST['reg_user'])) {
    // Receive all input values from the form
    $username = mysqli_real_escape_string($db, $_POST['username']);
    $email = mysqli_real_escape_string($db, $_POST['email']);
    $password_1 = mysqli_real_escape_string($db, $_POST['password_1']);
    $password_2 = mysqli_real_escape_string($db, $_POST['password_2']);
    $role = mysqli_real_escape_string($db, $_POST['role']); // Role input (teacher/student)

    // Form validation: ensure that the form is correctly filled
    if (empty($username)) { array_push($errors, "Username is required"); }
    if (empty($email)) { array_push($errors, "Email is required"); }
    if (empty($password_1)) { array_push($errors, "Password is required"); }
    if ($password_1 != $password_2) {
        array_push($errors, "The two passwords do not match");
    }

    // Check the appropriate table based on role
    if ($role === 'teacher') {
        $user_check_query = "SELECT * FROM teachers WHERE username='$username' OR email='$email' LIMIT 1";
    } else {
        $user_check_query = "SELECT * FROM course WHERE username='$username' OR email='$email' LIMIT 1"; // Assuming 'students' is the table name for students
    }

    $result = mysqli_query($db, $user_check_query);
    $user = mysqli_fetch_assoc($result);
    
    if ($user) { // If user exists
        if ($user['username'] === $username) {
            array_push($errors, "Username already exists");
        }

        if ($user['email'] === $email) {
            array_push($errors, "Email already exists");
        }
    }

    // Finally, register user if there are no errors in the form
    if (count($errors) == 0) {
        $password = md5($password_1); // Encrypt the password before saving in the database

        // Insert into appropriate table based on role
        if ($role === 'teacher') {
            $query = "INSERT INTO teachers (username, email, password) VALUES('$username', '$email', '$password')";
        } else {
            $query = "INSERT INTO course (username, email, password) VALUES('$username', '$email', '$password')";
        }

        mysqli_query($db, $query);
        $_SESSION['username'] = $username;
        $_SESSION['role'] = $role;
        $_SESSION['success'] = "You are now logged in";
        header('location: index.php');
        exit(); // Ensure script stops executing after redirection
    }
}

// LOGIN USER
if (isset($_POST['login_user'])) {
    $username = mysqli_real_escape_string($db, $_POST['username']);
    $password = mysqli_real_escape_string($db, $_POST['password']);
    $role = mysqli_real_escape_string($db, $_POST['role']); // Role input for login

    if (empty($username)) {
        array_push($errors, "Username is required");
    }
    if (empty($password)) {
        array_push($errors, "Password is required");
    }

    if (count($errors) == 0) {
        $password = md5($password);

        // Fetch from appropriate table based on role
        if ($role === 'teacher') {
            $query = "SELECT * FROM teachers WHERE username='$username' AND password='$password'";
        } else {
            $query = "SELECT * FROM course WHERE username='$username' AND password='$password'"; // Assuming 'students' is the table name for students
        }

        $results = mysqli_query($db, $query);

        if (mysqli_num_rows($results) == 1) {
            $_SESSION['username'] = $username;
            $_SESSION['role'] = $role;
            $_SESSION['success'] = "You are now logged in";
            header('location: index.php');
            exit(); // Ensure script stops executing after redirection
        } else {
            array_push($errors, "Wrong username/password combination");
        }
    }
}
?>
