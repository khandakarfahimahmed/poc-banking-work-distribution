const { User, Tasks, TaskInfo } = require("./user.model");
exports.postOne = async (info) => {
  try {
    const data = {
      name: info.name,
      email: info.email,
      password: info.password,
      role: info.role,
    };
    const user = await User.findOne({ where: { email: data.email } });
    if (user) {
      return "User already exists.";
    } else {
      const newUser = await User.create({
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role,
      });
      return newUser;
    }
  } catch (error) {
    console.log(error);
    throw new Error("Error adding new User to DB.");
  }
};

exports.findAlluser = async () => {
  try {
    const user = await User.findAll();

    return user;
  } catch (error) {
    console.log(error);
    throw new Error("Error finding User from DB.");
  }
};

///////////////////////Task table queries////////////////////////
exports.findOneUser = async (info) => {
  try {
    const user = await User.findOne({
      where: { email: info.email }, //, password: info.password
    });

    return user;
  } catch (error) {
    console.log(error);
    throw new Error("Error finding User from DB.");
  }
};

exports.findAllTasks = async () => {
  try {
    const tasks = await Tasks.findAll({});

    return tasks;
  } catch (error) {
    console.log(error);
    throw new Error("Error finding Tasks from DB.");
  }
};

exports.postTask = async (info) => {
  try {
    const task = await Tasks.create({
      task_type: info.task_type,
    });
    return task;
  } catch (error) {
    console.log(error);
    throw new Error("Error adding new Task to DB.");
  }
};

exports.updateTask = async (info) => {
  try {
    const task = await Tasks.update(
      { status: info.status },
      { where: { task_type: info.task_type } }
    );
    return task;
  } catch (error) {
    console.log(error);
    throw new Error("Error updating Task in DB.");
  }
};

///////////////////////Task-Info table queries////////////////////////
exports.postTaskInfo = async (info) => {
  try {
    const task = await TaskInfo.create({
      account_type: info.account_type,
      customer_name: info.customer_name,
      customer_dob: info.customer_dob,
      customer_address: info.customer_address,
      customer_phone: info.customer_phone,
      customer_occupation: info.customer_occupation,
    });
    return task;
  } catch (error) {
    console.log(error);
    throw new Error("Error adding new Task-Info to DB.");
  }
};

exports.getAllTaskInfo = async () => {
  try {
    const tasks = await TaskInfo.findAll({});

    return tasks;
  } catch (error) {
    console.log(error);
    throw new Error("Error finding Task-Info from DB.");
  }
};
////////algo//////
////////algo//////

async function assign_task(task_id, email) {
  try {
    await Tasks.update(
      { assigned_to: email, assigned_by: "admin", status: "reviewer" },
      { where: { task_id: task_id } }
    );
    console.log(`Task ${task_id} assigned to ${email} successfully.`);
  } catch (error) {
    console.error(`Error assigning task ${task_id} to ${email}:`, error);
  }
}

async function updateTaskInfo(task_id, email) {
  try {
    await TaskInfo.update(
      { status: "reviewer", assigned_to: email },
      { where: { task_id: task_id } }
    );
    console.log(
      `TaskInfo updated for task ${task_id} with assigned_to ${email}`
    );
  } catch (error) {
    console.error(`Error updating TaskInfo for task ${task_id}:`, error);
  }
}

const threshold = 4; // in hours

async function distributeTasks() {
  try {
    const employees = await User.findAll({
      where: { role: "reviewer", personal_tasks: 0 }, // Fetch only employees with no personal tasks
    });

    for (let i = 0; i < employees.length; i++) {
      const tasks = await Tasks.findAll({
        where: {
          assigned_to: "null",
          task_type: "personal",
          status: "pending",
        },
      });

      for (let j = 0; j < tasks.length; j++) {
        if (employees[i].personal_tasks < threshold) {
          await assign_task(tasks[j].task_id, employees[i].email);
          await updateTaskInfo(tasks[j].task_id, employees[i].email);
          employees[i].personal_tasks++; // Increment personal_tasks for the employee
        }
      }

      await employees[i].save(); // Save changes for the employee
    }

    console.log("Tasks distributed successfully.");
  } catch (error) {
    console.error("Error distributing tasks:", error);
  }
}

// Call the distributeTasks function
distributeTasks();
