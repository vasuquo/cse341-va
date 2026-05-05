const dns = require('node:dns/promises')
dns.setServers(['8.8.8.8', '1.1.1.1']) 
const fs = require('fs').promises
const express = require('express')
const cors = require('cors')
const dbConn = require('./database/')
const env = require('dotenv').config()

const app = express()
app.use(cors()) 
app.use(express.json())

const port = process.env.PORT
const host = process.env.HOST

app.get('/', (req, res) => {
    res.send('Hello There. Gland to meet You!!!')
})

app.get('/professional', async (req, res) => {
    try {
          const mydata = await dbConn()
          const base64Image = await fs.readFile(mydata.base64Image, { encoding: 'base64' });
         
         res.json({            
                professionalName: mydata.professionalName,
                base64Image,                
                nameLink: {
                    firstName: mydata.nameLink.firstName,
                    url: mydata.nameLink.url
                },
                primaryDescription: mydata.primaryDescription,
                workDescription1: mydata.workDescription1,
                workDescription2: mydata.workDescription2,
                linkTitleText: mydata.linkTitleText,
                linkedInLink: {
                    text: mydata.linkedInLink.text,
                    link: mydata.linkedInLink.link
                },
                githubLink: {
                    text: mydata.githubLink.text,
                    link: mydata.githubLink.link
                }            
         })
    } catch (error) {
        res.status(500).send('Error Occured: ', error);
        console.error('Error Occured: ', error)
    }
})
app.listen(port, () => {
  console.log(`app listening on ${host}:${port}`)
})