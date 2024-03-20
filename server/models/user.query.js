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

function assign_task(task_name, email) {
  // const
  return Tasks.update(
    { assigned_to: email, assigned_by: "admin", status: "not done" },
    { where: { task_name: task_name } }
  );
}

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
const threshold = 2; // in hours

async function distributeTasks() {
  try {
    const employees = await User.findAll({
      where: { role: ["reviewer"] },
    });
    const tasks = await Tasks.findAll({});

    for (let i = 0; i < employees.length; i++) {}
  } catch (error) {
    console.log(error);
  }
}

// Call the distributeTasks function
distributeTasks();
