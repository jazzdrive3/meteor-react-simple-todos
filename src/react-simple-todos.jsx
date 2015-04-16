/**
  * @jsx React.DOM
  */

var TaskList = React.createClass({
    render: function() {
        return <ul>
                {this.props.tasks.map(function(task) {
                  return <li>{task.text}</li>;
                })}
               </ul>;
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

