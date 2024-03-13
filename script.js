require('dotenv').config();
const { exec } = require('child_process');
const cron = require('node-cron');
const LinkedinGen = require('linkedin-gen/src/LinkedinGen');
const linkedinGen = new LinkedinGen();



cron.schedule('* * * * *', () => {
    console.log('Cron exec:');
    linkedinGen.generate().then(cv => {
        const projectPath = process.env.PROJECT_PATH;
        const commands = `
            cp ${cv} ${projectPath}/CV.md &&
            cd ${projectPath} &&
            git pull &&
            git add . &&
            git commit -m'cv' &&
            git push origin main
        `;

        exec(commands, { cwd: './' }, (error, stdout, stderr) => {
        if (error) {
            console.error('error: ', error);
            return;
        }
        console.log('success:');
        //console.log(stdout);
        });
    });
});
