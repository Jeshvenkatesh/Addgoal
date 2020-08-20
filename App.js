import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Button } from 'react-native';

import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

export default function App() {

  const [courseGoals, setcourseGoals] = useState([]);
  const [isAddMode, setisAddMode] = useState(false);

  const addGoalHandler = (goalArg) => {
    setcourseGoals(currentGoals => [...currentGoals, { key: Math.random().toString(), value: goalArg }]);
    setisAddMode(false);
  };
  const removeGoalHandler = (goalId) => {
       setcourseGoals(currentGoals => {
         return currentGoals.filter((goal)=> goal.key !== goalId)
       });
  };
  const cancelBtn =()=>{
    setisAddMode(false);
  }

  return (
    <View style={styles.screen}>
      <Button title="Add New Goal" onPress={()=> setisAddMode(true)}/>
      <GoalInput visible={isAddMode} onAddGoal={addGoalHandler} onCancel={cancelBtn}/>
      <FlatList
        keyExtractor={(item, index) => item.key}
        data={courseGoals}
        renderItem={itemData => (
          <GoalItem id={itemData.item.key} title={itemData.item.value} onDelete={removeGoalHandler}/>
        )}
      />
    </View>
  )
};

const styles = StyleSheet.create({
  screen: {
    padding: 50
  }
});

