import { useState } from 'react';
import { Box, Button, Container, Flex, Heading, Input, List, ListItem, Text, useToast, VStack } from '@chakra-ui/react';
import { FaTrash, FaCheckCircle } from 'react-icons/fa';

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const toast = useToast();

  const handleAddTask = () => {
    if (input.trim() === '') {
      toast({
        title: 'No task entered',
        status: 'warning',
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setTasks([...tasks, { id: Date.now(), text: input, isCompleted: false }]);
    setInput('');
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleCompleteTask = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, isCompleted: !task.isCompleted } : task));
  };

  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={8}>
        <Heading>Todo App</Heading>
        <Flex as="form" onSubmit={(e) => e.preventDefault()} width="100%">
          <Input
            placeholder="Add a new task..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            mr={2}
          />
          <Button onClick={handleAddTask} colorScheme="blue">Add</Button>
        </Flex>
        <List width="100%">
          {tasks.map(task => (
            <ListItem key={task.id} display="flex" justifyContent="space-between" alignItems="center" p={2} boxShadow="md" borderRadius="md">
              <Text as={task.isCompleted ? 's' : undefined}>{task.text}</Text>
              <Flex>
                <Button onClick={() => handleCompleteTask(task.id)} colorScheme={task.isCompleted ? "gray" : "green"} size="sm" mr={2}>
                  <FaCheckCircle />
                </Button>
                <Button onClick={() => handleDeleteTask(task.id)} colorScheme="red" size="sm">
                  <FaTrash />
                </Button>
              </Flex>
            </ListItem>
          ))}
        </List>
      </VStack>
    </Container>
  );
};

export default Index;