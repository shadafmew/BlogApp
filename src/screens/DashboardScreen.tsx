
import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, View, FlatList, Image, Modal, TextInput, Button, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';  // Import for the back arrow icon
import { Picker } from '@react-native-picker/picker';  // Dropdown picker

// Dummy Data for Blog Posts
const initialPosts = [
  {
    id: '1',
    title: 'Company',
    description: 'Integer porta scelerisque sagittis...',
    date: '2 DAY AGO',
    image: require('../images/company.png'),
  },
  {
    id: '2',
    title: 'Financial Plan',
    description: 'Non congue dolor scelerisque...',
    date: 'February 28, 2021',
    image: require('../images/financial_plan.png'),
  },
  {
    id: '3',
    title: 'Execution',
    description: 'Non aliquet in pulvinar pellentesque...',
    date: 'February 9, 2021',
    image: require('../images/execution.png'),
  },
  {
    id: '4',
    title: 'Money',
    description: 'Non aliquet in pulvinar pellentesque...',
    date: 'February 9, 2021',
    image: require('../images/money.png'),
  },
  {
    id: '5',
    title: 'Home',
    description: 'Non aliquet in pulvinar pellentesque...',
    date: 'February 9, 2021',
    image: require('../images/home.png'),
  },
  {
    id: '6',
    title: 'Friends',
    description: 'Non aliquet in pulvinar pellentesque...',
    date: 'February 9, 2021',
    image: require('../images/friends.png'),
  },
];

const { width, height } = Dimensions.get('window');

function DashboardScreen() {
  const [blogPosts, setBlogPosts] = useState(initialPosts);
  const [modalVisible, setModalVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [form, setForm] = useState({ title: '', description: '', date: '', image: null });
  const [theme, setTheme] = useState("Afterglow");
  const [scenario, setScenario] = useState("Default");

  // Handle post creation and update
  const handleCreateUpdatePost = () => {
    if (isEdit) {
      // Update existing post
      setBlogPosts(blogPosts.map((post) => (post.id === selectedPost.id ? { ...selectedPost, ...form } : post)));
    } else {
      // Create new post
      const newPost = {
        ...form,
        id: Date.now().toString(), // Unique ID
        image: require('../images/company.png'), // Set a default image
      };
      setBlogPosts([...blogPosts, newPost]);
    }
    resetForm();
    setModalVisible(false);
  };

  // Handle deleting a post
  const handleDeletePost = (id) => {
    setBlogPosts(blogPosts.filter((post) => post.id !== id));
  };

  // Reset the form
  const resetForm = () => {
    setForm({ title: '', description: '', date: '', image: null });
    setSelectedPost(null);
    setIsEdit(false);
  };

  // Handle editing a post
  const handleEditPost = (post) => {
    setSelectedPost(post);
    setForm(post);
    setIsEdit(true);
    setModalVisible(true);
  };

  // Rendering each blog post item
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.cardImage} />
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardDescription}>{item.description}</Text>
      <Text style={styles.cardDate}>{item.date}</Text>
      {/* Edit and Delete Buttons */}
      <View style={styles.cardActions}>
        <TouchableOpacity onPress={() => handleEditPost(item)}>
          <Text style={styles.editButton}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDeletePost(item.id)}>
          <Text style={styles.deleteButton}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Top Section with Back Arrow, Logo, and Avatar */}
      <View style={styles.topBar}>
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Image source={require('../images/logo.png')} style={styles.logo} />
        <View style={styles.searchSection}>
          <TouchableOpacity>
            <Ionicons name="search" size={24} color="gray" style={{ marginRight:20 }} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={require('../images/avatar.png')} style={styles.avatar} />
          </TouchableOpacity>
        </View>

      </View>

      {/* Dropdowns */}
      <View style={styles.dropdowns}>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={theme}
            style={styles.picker}
            onValueChange={(itemValue) => setTheme(itemValue)}
          >
            <Picker.Item label="Afterglow" value="Afterglow" />
            <Picker.Item label="Sunrise" value="Sunrise" />
          </Picker>
        </View>
        <Text style={styles.sceneriotxt}>Scenario</Text>
        <View style={styles.pickerContainer2}>
          <Picker
            selectedValue={scenario}
            style={styles.picker}
            onValueChange={(itemValue) => setScenario(itemValue)}
          >
            <Picker.Item label="Default" value="Default" style={{ fontSize: 14 }} />
            <Picker.Item label="Custom" value="Custom" style={{ fontSize: 14 }} />
          </Picker>
        </View>
      </View>

      {/* Blog Header and Buttons */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Blog</Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity onPress={() => { setModalVisible(true); resetForm(); }}>
            <Text style={styles.headerButton}>Add new</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { setModalVisible(true); resetForm(); }}>
            <Text style={styles.PreviewButton}>Preview</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Blog Post List */}
      <FlatList
        data={blogPosts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2} // Ensure numColumns doesn't change dynamically
        contentContainerStyle={styles.listContainer}
        key={2} // Provide a constant key to FlatList to avoid dynamic numColumns issues
      />

      {/* Modal for Create/Update Blog Post */}
      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>{isEdit ? 'Edit Post' : 'New Post'}</Text>
          <TextInput
            style={styles.input}
            placeholder="Title"
            value={form.title}
            onChangeText={(text) => setForm({ ...form, title: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Description"
            value={form.description}
            onChangeText={(text) => setForm({ ...form, description: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Date"
            value={form.date}
            onChangeText={(text) => setForm({ ...form, date: text })}
          />
          <Button title={isEdit ? 'Update Post' : 'Create Post'} onPress={handleCreateUpdatePost} />
          <Button title="Cancel" onPress={() => setModalVisible(false)} color="red" />
        </View>
      </Modal>
    </View>
  );
}

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#f8f8f8',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    alignItems: 'center',
    marginTop: 24,
  },
  logo: {
    width: width * 0.3,
    borderRadius: 20,
    height: height * 0.04,
    alignSelf: 'center',
marginLeft:26,

  },
  searchSection:{
   flexDirection:'row',
   alignItems:'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  dropdowns: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 10,
    alignItems: 'center',
  },
  pickerContainer: {
    width: '48%',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#cncc',
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
  },
  sceneriotxt: {
    marginLeft: 10,
    color: 'gray',
  },
  pickerContainer2: {
    width: '40%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
    fontSize: 20,
    marginRight: 10,
  },
  picker: {
    height: 40,
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 10,
    marginTop: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerButton: {
    fontSize: 16,
    color: 'blue',
    marginRight: 10,
  },
  PreviewButton: {
    fontSize: 16,
    color: 'white',
    backgroundColor: 'blue',
    paddingVertical: 4,
    paddingHorizontal: 6,
    borderRadius: 10,
  },
  listContainer: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 5,
    width: width / 2 - 20,  // Ensure proper layout for two-column display
  },
  cardImage: {
    width: width * 0.2,
    height: height * 0.1, alignSelf: 'center'
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 10,
  },
  cardDescription: {
    paddingHorizontal: 10,
    paddingBottom: 5,
    color: '#333',
  },
  cardDate: {
    paddingHorizontal: 10,
    paddingBottom: 10,
    color: '#999',
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  editButton: {
    color: 'blue',
  },
  deleteButton: {
    color: 'red',
  },
  modalContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
});
