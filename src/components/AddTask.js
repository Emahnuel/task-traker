import { useState } from "react";

const AddTask = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [day, setDay] = useState("");
  const [reminder, setReminder] = useState(false);
  const onSubmit = (e) => {
    e.preventDefault();
    if (!title) {
      alert("Please enter a task title.");
    }

    onAdd({ title, day, reminder });
    setTitle("");
    setDay("");
    setReminder("false");
  };

  return (
    <>
      <div className="row">
        <small className="mb-3">
          Asterisk (<span className="text-danger">*</span>) next to a form control's
          label indicates that such field is <strong>"required"</strong>
        </small>
      </div>
      <form className="add-form" onSubmit={onSubmit}>
        <div className="row">
          <div className="col-12">
            <label className="form-label">
              <span className="text-danger">*</span> Title
            </label>
            <input
              type="text"
              placeholder="Add task title"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="col-12">
            <label className="form-label">
              <span className="text-danger">*</span> Day & TIme
            </label>
            <input
              type="text"
              placeholder="Add day & time"
              className="form-control"
              value={day}
              onChange={(e) => setDay(e.target.value)}
            />
          </div>

          <div className="col-12">
            <label className="form-label">
              Set Reminder
              <input
                type="checkbox"
                className="form-control-check"
                checked={reminder}
                value={reminder}
                onChange={(e) => setReminder(e.currentTarget.checked)}
              />
            </label>
          </div>

          <div className="text-center mt-2">
            <input className="btn btn-block" type="submit" value="Submit" />
          </div>
        </div>
      </form>
    </>
  );
};

export default AddTask;
