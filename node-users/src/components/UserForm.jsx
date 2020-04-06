import React from "react";

const UserForm = () => {
  return (
    <div>
      <form>
        <label>
          Name:
          <input name="name" placeholder="Name" />
        </label>
        <label>
          Bio:
          <input name="bio" placeholder="Bio" />
        </label>
        <button>Add User</button>
      </form>
    </div>
  );
};

export default UserForm;
