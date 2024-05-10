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
        title: 'No task entered.',
        description: "Please enter a task before adding.",
        status: 'error',
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
    <Container maxW="container.md" p={4}>
      <VStack spacing={8}>
        <Heading size="lg">Todo App</Heading>
        <Flex as="nav">
          <Button mr={2} onClick={() => {}}>Home</Button>
          <Button onClick={() => {}}>About</Button>
        </Flex>
        <Box w="100%">
          <Input placeholder="Add a new task" value={input} onChange={(e) => setInput(e.target.value)} />
          <Button colorScheme="blue" onClick={handleAddTask} mt={2}>Add Task</Button>
        </Box>
        <List spacing={3} w="100%">
          {tasks.map(task => (
            <ListItem key={task.id} d="flex" justifyContent="space-between" alignItems="center" p={2} bg={task.isCompleted ? 'green.100' : 'gray.100'}>
              <Text as={task.isCompleted ? 's' : 'span'}>{task.text}</Text>
              <Flex>
                <Button size="sm" onClick={() => handleCompleteTask(task.id)} colorScheme={task.isCompleted ? 'pink' : 'green'}>
                  <FaCheckCircle />
                </Button>
                <Button size="sm" onClick={() => handleDeleteTask(task.id)} colorScheme="red" ml={2}>
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