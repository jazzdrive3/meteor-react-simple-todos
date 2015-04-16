/**
  * @jsx React.DOM
  */


var TaskItem = React.createClass({
    handleDeleteClick: function(event) {
        Tasks.remove(this.props.task._id);
    },

    handleCheckboxChange: function(event) {
        Tasks.update(this.props.task._id, {$set: {checked: ! this.props.task.checked}});
    },

    render: function() {
        var checkedClass = '';
        if (this.props.task.checked === true) {
          checkedClass = "checked";
        }

        return <li className={checkedClass}>
                  <button className="delete" onClick={this.handleDeleteClick}>&times;</button>
                  <input type="checkbox" checked={this.props.task.checked} onChange={this.handleCheckboxChange} />
                  <span className="text">{this.props.task.text}</span>
               </li>
    }
});

var TaskList = React.createClass({
    render: function() {
        return <ul>
                {this.props.tasks.map(function(task) {
                  return <TaskItem task={task} key={task._id} />;
                })}
               </ul>
    }
});

var TaskApp = React.createClass({
    mixins: [ReactMeteor.Mixin],

    getMeteorState: function() {
        return {
          tasks: Tasks.find()
        };
    },

    handleSubmit: function(event) {
        var text = event.target.text.value;

        Tasks.insert({
          text: text,
          createdAt: new Date()
        });

        event.target.text.value = '';
        return event.preventDefault();
    },

    render: function() {
        return <div>
                  <header>
                    <h1>Todo List</h1>
                    <form className="new-task" onSubmit={this.handleSubmit}>
                      <input type="text" name="text" placeholder="Type to add new tasks" />
                    </form>
                  </header>
                  <TaskList tasks={this.state.tasks}/>
               </div>
    }
});

if (Meteor.isClient) {
    Meteor.startup(function() {
        Tracker.autorun(function () {
          React.render(<TaskApp />, document.getElementById("taskApp"));
        });
    });
}

