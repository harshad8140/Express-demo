const express = require('express')
const router = express.Router()
const Joi = require('joi')

const courses = [
    { id: 1, name: 'Node' },
    { id: 2, name: 'React' },
    { id: 3, name: 'java' },
]

router.get('/', (req, res) => res.send(courses))

router.post('/', function (req, res) {

    const { error } = validateCourse(req.body)

    if (error) return res.status(400).send(error.details[0].message)

    const course = {
        id: parseInt(courses[courses.length - 1].id) + 1,
        name: req.body.name
    }
    courses.push(course)
    res.send(course)
})

router.put('/:id', function (req, res) {

    const course = courses.find(e => { return e.id == parseInt(req.params.id) })

    if (!course) return res.status(404).send("Course is not found..!")

    const { error } = validateCourse(req.body)
    console.log("error :: ", error);
    if (error) return res.status(400).send(error.details[0].message)

    course.name = req.body.name
    res.send(course);
})


router.delete('/:id', function (req, res) {

    const course = courses.find(e => { return e.id == parseInt(req.params.id) })

    if (!course) return res.status(404).send("Course is not found..!")

    courses.splice(courses.indexOf(course), 1)
    res.send(course)

});


function validateCourse(course) {

    const schema = {
        name: Joi.string().min(3).required()
    }

    return Joi.validate(course, schema)

}

module.exports = router