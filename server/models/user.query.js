const { User, Tasks } = require("./user.model");
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
      task_name: info.task_name,
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
      { where: { task_name: info.task_name } }
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
