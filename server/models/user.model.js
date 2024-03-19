const { Sequelize, DataTypes } = require("sequelize");

const config = {
  host: "localhost",
  dialect: "postgres",
};

const sequelize = new Sequelize("user_db", "postgres", "fahim", config);

const User = sequelize.define(
  "User",
  {
    // Define user attributes here
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.STRING, allowNull: false },
    personal_tasks: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    non_personal_tasks: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    work_frequency: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    timestamps: false,
    tableName: "user_info",
    // Other model options
  }
);

const Tasks = sequelize.define(
  "Tasks",
  {
    task_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    task_name: { type: DataTypes.STRING, allowNull: false },
    assigned_to: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "null", // Set default value to "not done"
    },
    assigned_by: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "null", // Set default value to "not done"
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "pending", // Set default value to "not done"
    },
  },
  {
    timestamps: true,
    tableName: "tasks",
  }
);

const TaskInfo = sequelize.define(
  "TaskInfo",
  {
    task_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    account_type: { type: DataTypes.STRING, allowNull: false },
    customer_name: { type: DataTypes.STRING, allowNull: false },
    customer_dob: { type: DataTypes.STRING, allowNull: false },
    customer_address: { type: DataTypes.STRING, allowNull: false },
    customer_phone: { type: DataTypes.STRING, allowNull: false },
    customer_occupation: { type: DataTypes.STRING, allowNull: false },

    assigned_to: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "null", // Set default value to "not done"
    },

    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "pending", // Set default value to "not done"
    },
  },
  {
    timestamps: true,
    tableName: "task_info",
  }
);

(async () => {
  try {
    await sequelize.sync();
    console.log("Database synchronized");
  } catch (error) {
    console.error("Error synchronizing database:", error);
  }
})();
module.exports = { User, sequelize, Tasks, TaskInfo };
