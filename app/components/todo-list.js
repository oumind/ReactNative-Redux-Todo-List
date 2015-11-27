'use strict';

import React, {
  StyleSheet,
  Component,
  View,
  Text,
  ListView
} from 'react-native';
import CompleteToggle from './complete-toggle';
import AddTodoRow from './add-todo-row';

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      })
    };
    if (this.props.todos) {
      this.state.dataSource = this.state.dataSource.cloneWithRows(
        this.getTodosWithTemplate(this.props.todos)
      );
    }
  }
  getTodosWithTemplate(todos) {
    return todos.concat([{template: true}]);
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.todos !== this.props.todos) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(
          this.getTodosWithTemplate(nextProps.todos)
        )
      });
    }
  }
  renderRow = (todo) => {
    if (todo.template) {
      return this.renderTodoItemTemplate();
    } else {
      return this.renderTodoItem(todo);
    }
  }
  renderTodoItem(todo) {
    var {completeTodo, incompleteTodo} = this.props;
    return (
      <View key={todo.id} style={styles.row}>
        <CompleteToggle
          style={styles.toggle}
          checked={todo.completed}
          onChecked={() => completeTodo(todo.id)}
          onUnchecked={() => incompleteTodo(todo.id)} />
        <Text style={styles.text}>{todo.name}</Text>
      </View>
    )
  }
  renderTodoItemTemplate() {
    var {addTodo} = this.props
    return (
      <AddTodoRow
        addTodo={addTodo} />
    );
    return (
      <View key="template" style={[styles.row, styles.templateRow]}>
        <Text style={styles.text}>Das Template!!</Text>
      </View>
    );
  }
  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderRow} />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  row: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10
  },
  templateRow: {
    paddingLeft: 30
  },
  text: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10
  }
});

export default TodoList;
