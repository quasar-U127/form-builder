const express = require("express")
const Form = require("./models/Form")
const User = require("./models/User")
const Template = require("./models/Template")
const router = express.Router()

router.post("/admin/create", async (req, res) => {
    console.log(req.body)
    const template = new Template(
        {
            templateId: req.body.templateId,
            templateFields: JSON.stringify(req.body.templateFields)
        }
    )
    await template.save()
    res.send(template)
})


async function get_template(req, res) {
    try {
        const template = await Template.findOne({ templateId: req.params.id })
        res.send(template)
    } catch {
        res.status(404)
        res.send({ error: "Template doesn't exist!" })
    }
}
router.get("/admin/:id", async (req, res) => get_template(req, res))



router.get("/templateId", async (req, res) => {
    try {
        const template = await Template.find({}).select("templateId")
        res.send(template)
    } catch {
        res.status(404)
        res.send({ error: "Template doesn't exist!" })
    }
})
router.get("/templates", async (req, res) => {
    try {
        const template = await Template.find({})
        res.send(template)
    } catch {
        res.status(404)
        res.send({ error: "Template doesn't exist!" })
    }
})

router.get("/template/:id", async (req, res) => get_template(req, res))

// router.post("/form", async (req, res) => {
//     const form = new Form(
//         {
//             formId: req.body.id,
//             formType: req.body.type,
//             formData: req.body.data,
//             createdAt: req.body.date
//         }
//     )
//     await form.save()
//     res.send(form)
// })
module.exports = router