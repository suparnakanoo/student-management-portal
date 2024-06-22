const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config()


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const studentSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  studentID: String,
  course: String,
  email: String,
  phone: String
});

const Student = mongoose.model('Student', studentSchema);

app.post('/students', async (req, res) => {
  const student = new Student(req.body);
  try {
    await student.save();
    res.status(201).send(student);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get('/students', async (req, res) => {
  const { search } = req.query;
  // if (!search) {
  //   return res.json([]);
  // }

  // console.log(`Searching for students with query: ${search}`);

  try {
    let students;

    if (!search || search.toLowerCase() === 'all') {
      // If no search query or search is 'All', fetch all students
      students = await Student.find();
    } else {
      // Otherwise, perform the search based on the provided query
      const searchRegex = new RegExp(search, 'i');
      students = await Student.find({
        $or: [
          { firstName: { $regex: searchRegex } },
          { lastName: { $regex: searchRegex } },
          { studentID: { $regex: searchRegex } },
          { course: { $regex: searchRegex } },
          { email: { $regex: searchRegex } },
          { phone: { $regex: searchRegex } }
        ]
      });
    }
    res.json(students);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).send('Server error');
  }
});

app.patch('/students/:id', async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!student) return res.status(404).send();
    res.send(student);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.delete('/students/:id', async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) return res.status(404).send();
    res.send(student);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
