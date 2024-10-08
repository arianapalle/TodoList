import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';


const Checkbox = ({ isChecked, onToggle }) => (
  <TouchableHighlight onPress={onToggle} style={styles.checkboxContainer}>
    <View style={[styles.checkbox, isChecked && styles.checkboxChecked]}>
      {isChecked && <Text style={styles.checkboxTick}>✓</Text>}
    </View>
  </TouchableHighlight>
);

export default function App() {
  const [taskInput, setTaskInput] = useState('');
  const [tasks, setTasks] = useState([]);
  const [editText, setEditText] = useState(''); 

  const addTask = () => {
    if (taskInput.trim() !== '') {
      setTasks([...tasks, { id: Date.now().toString(), text: taskInput, isCompleted: false, isEditing: false }]);
      setTaskInput('');
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const saveTask = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, text: editText, isEditing: false } : task));
    setEditText(''); 
  };

  const toggleCompleteTask = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, isCompleted: !task.isCompleted, isEditing: false } : task));
  };

  const startEditingTask = (id, currentText, isCompleted) => {
    if (isCompleted) {
      alert('Task is already completed and cannot be edited.');
    } else {
      setTasks(tasks.map(task => task.id === id ? { ...task, isEditing: true } : task));
      setEditText(currentText); 
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.taskItem}>
      <Checkbox isChecked={item.isCompleted} onToggle={() => toggleCompleteTask(item.id)} />
      {item.isEditing ? (
        <TextInput
          style={styles.taskText}
          value={editText}
          onChangeText={setEditText} 
        />
      ) : (
        <TouchableOpacity onPress={() => toggleCompleteTask(item.id)}>
          <Text style={[styles.taskText, item.isCompleted && styles.completedTask]}>
            {item.text} {/* Show checkmark if completed */}
          </Text>
        </TouchableOpacity>
      )}
      {item.isEditing ? (
        <TouchableOpacity style={styles.editButton} onPress={() => saveTask(item.id)}>
          <Icon name="save" size={20} color="#0F3050" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.editButton} onPress={() => startEditingTask(item.id, item.text, item.isCompleted)}>
          <Icon name="edit" size={20} color="#0F3050" />
        </TouchableOpacity>
      )}
      <TouchableOpacity style={styles.deleteButton} onPress={() => deleteTask(item.id)}>
        <Icon name="trash" size={20} color="#0F3050" />
      </TouchableOpacity>

    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>To-Do List</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a new task..."
          value={taskInput}
          onChangeText={setTaskInput}
        />
        <TouchableOpacity style={styles.addBtn} onPress={addTask}>
          <Text style={styles.btnText}>Add Task</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={styles.tasksList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B2C4D4',
  },

  title: {
    fontSize: 38,
    fontWeight: 'bold',
    paddingTop: 65,
    marginBottom: 30,
    paddingHorizontal: 20,
    paddingBottom: 10,
    textAlign: 'left',
    color: '#fff',
    backgroundColor: '#394F64',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },

  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingHorizontal: 20,
  },

  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#394F64',
    padding: 13,
    marginRight: 10,
    borderRadius: 15,
    backgroundColor: '#fff',
  },

  addBtn: {
    backgroundColor: '#394F64',
    padding: 10,
    borderRadius: 15,
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
  },

  btnText: {
    color: '#fff',
  },

  tasksList: {
    marginTop: 20,
    paddingHorizontal: 20,
    borderRadius: 15,
  },

  taskItem: {
    position: 'relative', 
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 15,
    marginBottom: 13,
  },

  taskText: {
    flex: 1,
    fontSize: 18,
    color: '#333',
  },

  completedTask: {
    textDecorationLine: 'line-through',
    color: '#999',
  },

  iconButton: {
    position: 'absolute',
    right: 0, 
    marginLeft: 15, 
    padding: 0,
    borderRadius: 5,
  },

  deleteButton: {
    position: 'absolute',
    right: 14, 
    padding: 3,
    borderRadius: 5,
  },

  editButton: {
    position: 'absolute',
    right: 50, 
    padding: 3,
    borderRadius: 5,
  },

  

  checkboxContainer: {
    marginRight: 10,
  },

  checkbox: {
    width: 20,
    height: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },

  checkboxChecked: {
    backgroundColor: '#4CAF50',
    borderRadius: 10,
  },

  checkboxTick: {
    color: '#fff',
    fontSize: 16,
  },
});

